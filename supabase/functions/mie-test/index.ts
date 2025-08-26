import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Testing MIE API connection...')

    const username = Deno.env.get('MIE_USERNAME')
    const password = Deno.env.get('MIE_PASSWORD')

    if (!username || !password) {
      throw new Error('MIE credentials not configured')
    }

    // Build authentication token XML - pass as escaped string
    const tokenXml = `&lt;xml&gt;&lt;Token&gt;&lt;UserName&gt;${username}&lt;/UserName&gt;&lt;Password&gt;${password}&lt;/Password&gt;&lt;Source&gt;SMARTWEB&lt;/Source&gt;&lt;/Token&gt;&lt;/xml&gt;`
    
    console.log('Token XML:', tokenXml)

    // Build SOAP envelope for ksoGetItemTypes
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ksoGetItemTypes xmlns="http://www.kroll.co.za/">
      <aLogonXml>${tokenXml}</aLogonXml>
    </ksoGetItemTypes>
  </soap:Body>
</soap:Envelope>`

    console.log('Complete SOAP envelope:', soapEnvelope)
    console.log('Sending SOAP request to MIE...')

    // Send SOAP request to PRODUCTION endpoint
    const response = await fetch('https://mie.co.za/internal/services/epcvrequest/epcvrequest.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.kroll.co.za/ksoGetItemTypes'
      },
      body: soapEnvelope
    })

    const responseText = await response.text()
    console.log('MIE API Response:', responseText)

    // Check for SOAP fault
    if (responseText.includes('<soap:Fault>')) {
      const faultMatch = responseText.match(/<faultstring>(.*?)<\/faultstring>/s)
      const faultString = faultMatch ? faultMatch[1] : 'Unknown SOAP error'
      throw new Error(`SOAP Fault: ${faultString}`)
    }

    // Check if response is empty or malformed
    if (!responseText || responseText.trim() === '') {
      throw new Error('Empty response from MIE API')
    }

    // Parse success response
    if (responseText.includes('ksoGetItemTypesResult')) {
      return new Response(JSON.stringify({
        success: true,
        message: 'MIE API connection successful',
        itemTypes: responseText
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    throw new Error('Unexpected response format from MIE API')

  } catch (error) {
    console.error('MIE API test failed:', error.message)
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})