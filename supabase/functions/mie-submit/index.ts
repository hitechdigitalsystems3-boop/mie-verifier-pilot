
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mapping of verification types to MIE item codes
const VERIFICATION_TYPE_MAPPING: Record<string, string> = {
  'CREDIT': 'CREDIT',
  'CRIMINAL': 'CIT',
  'EMPLOYMENT': 'EMPLOY',
  'EDUCATION': 'EDUC',
  'IDENTITY': 'ID',
  'DIRECTORSHIP': 'DIR',
  'BANKRUPTCY': 'SEQUEST',
  'PROPERTY': 'PROP'
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { 
      clientKey, 
      firstName, 
      surname, 
      idNumber, 
      dateOfBirth, 
      verificationTypes, 
      additionalNotes 
    } = await req.json()

    console.log('Processing verification request for:', firstName, surname)

    // Generate unique remote request ID
    const remoteRequestId = `REQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Insert request into database
    const { data: requestData, error: insertError } = await supabaseClient
      .from('verification_requests')
      .insert({
        client_key: clientKey,
        first_name: firstName,
        surname: surname,
        id_number: idNumber,
        date_of_birth: dateOfBirth,
        verification_types: verificationTypes,
        additional_notes: additionalNotes,
        remote_request_id: remoteRequestId,
        status: 'processing'
      })
      .select()
      .single()

    if (insertError) {
      throw new Error(`Database error: ${insertError.message}`)
    }

    // Get MIE credentials
    const username = Deno.env.get('MIE_USERNAME')
    const password = Deno.env.get('MIE_PASSWORD')

    if (!username || !password) {
      throw new Error('MIE credentials not configured')
    }

    // Build authentication token XML - pass as escaped string
    const tokenXml = `&lt;xml&gt;&lt;Token&gt;&lt;UserName&gt;${username}&lt;/UserName&gt;&lt;Password&gt;${password}&lt;/Password&gt;&lt;Source&gt;SMARTWEB&lt;/Source&gt;&lt;/Token&gt;&lt;/xml&gt;`

    // Build item list
    const itemListXml = verificationTypes.map((type: string, index: number) => {
      const itemCode = VERIFICATION_TYPE_MAPPING[type] || type
      return `
        <Item>
          <RemoteItemKey>${remoteRequestId}_${index}</RemoteItemKey>
          <ItemTypeCode>${itemCode}</ItemTypeCode>
          <Indemnity>true</Indemnity>
          <ItemInputGroupList/>
        </Item>`
    }).join('')

    // Build verification request XML - pass as escaped string
    const requestXml = `&lt;xml&gt;&lt;Request&gt;&lt;ClientKey&gt;${clientKey}&lt;/ClientKey&gt;&lt;AgentKey&gt;${clientKey}&lt;/AgentKey&gt;&lt;AgentClient&gt;${clientKey}&lt;/AgentClient&gt;&lt;RemoteRequest&gt;${remoteRequestId}&lt;/RemoteRequest&gt;&lt;FirstNames&gt;${firstName}&lt;/FirstNames&gt;&lt;Surname&gt;${surname}&lt;/Surname&gt;&lt;IdNumber&gt;${idNumber}&lt;/IdNumber&gt;&lt;DateOfBirth&gt;${dateOfBirth}&lt;/DateOfBirth&gt;&lt;Source&gt;SMARTWEB&lt;/Source&gt;&lt;EntityKind&gt;PERSON&lt;/EntityKind&gt;&lt;ItemList&gt;${itemListXml}&lt;/ItemList&gt;&lt;/Request&gt;&lt;/xml&gt;`

    // Build SOAP envelope for ksoPutRequest
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ksoPutRequest xmlns="http://www.kroll.co.za/">
      <aLogonXml>${tokenXml}</aLogonXml>
      <aRequestXml>${requestXml}</aRequestXml>
    </ksoPutRequest>
  </soap:Body>
</soap:Envelope>`

    console.log('Submitting verification request to MIE...')
    console.log('SOAP envelope:', soapEnvelope)

    // Send SOAP request to QA endpoint
    const response = await fetch('https://qa.mie.co.za/internal/services/epcvrequest/epcvrequest.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.kroll.co.za/ksoPutRequest'
      },
      body: soapEnvelope
    })

    const responseText = await response.text()
    console.log('MIE API Response:', responseText)

    // Check for SOAP fault
    if (responseText.includes('<soap:Fault>')) {
      const faultMatch = responseText.match(/<faultstring>(.*?)<\/faultstring>/s)
      const faultString = faultMatch ? faultMatch[1] : 'Unknown SOAP error'
      
      // Update request status to failed
      await supabaseClient
        .from('verification_requests')
        .update({ status: 'failed' })
        .eq('id', requestData.id)

      throw new Error(`SOAP Fault: ${faultString}`)
    }

    // Check if response is empty or malformed
    if (!responseText || responseText.trim() === '') {
      await supabaseClient
        .from('verification_requests')
        .update({ status: 'failed' })
        .eq('id', requestData.id)

      throw new Error('Empty response from MIE API')
    }

    console.log('Verification request submitted successfully')

    return new Response(JSON.stringify({
      success: true,
      message: 'Verification request submitted successfully',
      requestId: requestData.id,
      remoteRequestId: remoteRequestId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Verification submission failed:', error.message)
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
