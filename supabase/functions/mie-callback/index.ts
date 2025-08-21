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
    console.log('Received MIE callback')

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse form data from callback
    const formData = await req.formData()
    const kmieUser = formData.get('kmieUser') as string
    const kmiePass = formData.get('kmiePass') as string
    const kmieSys = formData.get('kmieSys') as string
    const kmieXml = formData.get('kmieXml') as string

    console.log('Callback data received:', { kmieUser, kmieSys, xmlLength: kmieXml?.length })

    // Validate callback credentials
    const expectedUser = Deno.env.get('MIE_CALLBACK_USERNAME')
    const expectedPass = Deno.env.get('MIE_CALLBACK_PASSWORD')

    if (!expectedUser || !expectedPass) {
      throw new Error('Callback credentials not configured')
    }

    if (kmieUser !== expectedUser || kmiePass !== expectedPass) {
      console.error('Invalid callback credentials')
      return new Response('Unauthorized', { status: 401 })
    }

    if (!kmieXml) {
      throw new Error('No XML data received in callback')
    }

    console.log('Parsing callback XML:', kmieXml)

    // Parse XML to extract inquiry key and remote key
    const inqKeyMatch = kmieXml.match(/<inq_key>(.*?)<\/inq_key>/s)
    const inqRmtKeyMatch = kmieXml.match(/<inq_rmtkey>(.*?)<\/inq_rmtkey>/s)

    if (!inqKeyMatch || !inqRmtKeyMatch) {
      throw new Error('Required keys not found in callback XML')
    }

    const inquiryKey = inqKeyMatch[1]
    const remoteRequestId = inqRmtKeyMatch[1]

    console.log('Extracted keys:', { inquiryKey, remoteRequestId })

    // Find the verification request
    const { data: requestData, error: requestError } = await supabaseClient
      .from('verification_requests')
      .select('*')
      .eq('remote_request_id', remoteRequestId)
      .single()

    if (requestError || !requestData) {
      throw new Error(`Request not found for remote ID: ${remoteRequestId}`)
    }

    // Parse credential blocks
    const credentialPattern = /<crd_credential>(.*?)<\/crd_credential>/gs
    let credentialMatch
    const results = []

    while ((credentialMatch = credentialPattern.exec(kmieXml)) !== null) {
      const credentialXml = credentialMatch[1]
      console.log('Processing credential block:', credentialXml)

      // Extract credential details
      const typeMatch = credentialXml.match(/<crd_type>(.*?)<\/crd_type>/s)
      const resultCodeMatch = credentialXml.match(/<crd_resultcode>(.*?)<\/crd_resultcode>/s)
      const resultDescMatch = credentialXml.match(/<crd_resultdesc>(.*?)<\/crd_resultdesc>/s)
      const supplierMatch = credentialXml.match(/<crd_supplier>(.*?)<\/crd_supplier>/s)
      const riskMatch = credentialXml.match(/<crd_risk>(.*?)<\/crd_risk>/s)

      let pdfUrl = null

      // Check for PDF file
      const fileMatch = credentialXml.match(/<crd_file>(.*?)<\/crd_file>/s)
      if (fileMatch) {
        const fileXml = fileMatch[1]
        const documentMatch = fileXml.match(/<document>(.*?)<\/document>/s)
        
        if (documentMatch) {
          console.log('Processing PDF document...')
          
          try {
            // Decode base64 PDF
            const base64Data = documentMatch[1].trim()
            const pdfBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))

            // Generate filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
            const filename = `verification_${remoteRequestId}_${typeMatch?.[1] || 'unknown'}_${timestamp}.pdf`

            // Upload to Supabase storage
            const { data: uploadData, error: uploadError } = await supabaseClient.storage
              .from('verification-pdfs')
              .upload(filename, pdfBuffer, {
                contentType: 'application/pdf',
                upsert: false
              })

            if (uploadError) {
              console.error('PDF upload failed:', uploadError)
            } else {
              // Get public URL
              const { data: urlData } = supabaseClient.storage
                .from('verification-pdfs')
                .getPublicUrl(filename)
              
              pdfUrl = urlData.publicUrl
              console.log('PDF uploaded successfully:', pdfUrl)
            }
          } catch (pdfError) {
            console.error('Error processing PDF:', pdfError)
          }
        }
      }

      // Prepare result data
      const resultData = {
        request_id: requestData.id,
        verification_type: typeMatch?.[1] || 'unknown',
        result_code: resultCodeMatch?.[1] || null,
        result_description: resultDescMatch?.[1] || null,
        supplier: supplierMatch?.[1] || null,
        risk_level: riskMatch?.[1] || null,
        extended_info: {
          inquiry_key: inquiryKey,
          raw_credential: credentialXml
        },
        pdf_report_url: pdfUrl
      }

      results.push(resultData)
    }

    console.log(`Parsed ${results.length} credential results`)

    // Insert results into database
    if (results.length > 0) {
      const { error: resultsError } = await supabaseClient
        .from('verification_results')
        .insert(results)

      if (resultsError) {
        console.error('Error inserting results:', resultsError)
        throw new Error(`Failed to save results: ${resultsError.message}`)
      }
    }

    // Update request status to completed
    const { error: updateError } = await supabaseClient
      .from('verification_requests')
      .update({ status: 'completed' })
      .eq('id', requestData.id)

    if (updateError) {
      console.error('Error updating request status:', updateError)
    }

    console.log('Callback processed successfully')

    // Return required XML response
    return new Response(`<?xml version="1.0" standalone="yes"?>
<xml>
  <kmie_status>0</kmie_status>
  <kmie_statusdesc>Success</kmie_statusdesc>
</xml>`, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/xml' 
      }
    })

  } catch (error) {
    console.error('Callback processing failed:', error.message)
    
    // Return error XML response
    return new Response(`<?xml version="1.0" standalone="yes"?>
<xml>
  <kmie_status>1</kmie_status>
  <kmie_statusdesc>Error: ${error.message}</kmie_statusdesc>
</xml>`, {
      status: 400,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/xml' 
      }
    })
  }
})