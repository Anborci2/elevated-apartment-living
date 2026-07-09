import { Resend } from 'resend'

// -------------------------------------------------------
// Requires resend_api_key and Lead_Email env vars.
// NOTE: these names are intentionally non-standard to match
// the exact variable names configured in Alan's Vercel.
// -------------------------------------------------------

export async function POST(req: Request) {
  const apiKey = process.env.resend_api_key
  const LEAD_EMAIL = process.env.Lead_Email ?? ''

  console.log('Env check — RESEND_API_KEY present:', !!apiKey, '| LEAD_EMAIL:', LEAD_EMAIL)

  if (!apiKey || !LEAD_EMAIL) {
    return Response.json({ success: false, error: 'Email credentials not configured' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const data = await req.json()
  const { firstName, lastName, email, phone, bedrooms, timeline, budget, neighborhoods, leaseLength, notes } = data

  const { data: sendResult, error } = await resend.emails.send({
    from: 'Elevated Website <onboarding@resend.dev>',
    to: LEAD_EMAIL,
    replyTo: email,
    subject: `New lead: ${firstName} ${lastName}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px;background:#0D1B2A;color:#F5F0E8;">
        <h1 style="font-size:22px;color:#C9A96E;margin-bottom:4px;">New Apartment Inquiry</h1>
        <p style="color:#A8A29E;font-size:12px;margin-bottom:28px;">Submitted via elevatedapartmentlocating.com</p>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', `${firstName} ${lastName}`)}
          ${row('Email', `<a href="mailto:${email}" style="color:#C9A96E;">${email}</a>`)}
          ${row('Phone', `<a href="tel:${phone}" style="color:#C9A96E;">${phone}</a>`)}
          ${row('Bedrooms', bedrooms?.join(', '))}
          ${row('Timeline', timeline)}
          ${row('Budget', budget)}
          ${row('Neighborhoods', neighborhoods?.join(', '))}
          ${row('Lease Length', leaseLength)}
          ${notes ? row('Notes', notes) : ''}
        </table>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }

  console.log('Email sent:', sendResult?.id)
  return Response.json({ success: true })
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(201,169,110,0.2);color:#A8A29E;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;width:38%;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(201,169,110,0.2);font-size:14px;">${value || '—'}</td>
    </tr>`
}
