import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendConfirmationViaSendGrid(
  toEmail: string,
  toName: string,
  htmlContent: string,
  subject: string,
) {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: toEmail, name: toName }] }],
      from: { email: 'asapdotdrop@gmail.com', name: 'Kartik' },
      reply_to: { email: 'asapdotdrop@gmail.com' },
      subject,
      content: [{ type: 'text/html', value: htmlContent }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`SendGrid error ${res.status}: ${err}`)
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, projectType, budget, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Lead email to Kartik via Resend
    await resend.emails.send({
      from: 'Build with Kartik <onboarding@resend.dev>',
      to: 'asapdotdrop@gmail.com',
      replyTo: email,
      subject: `New inquiry from ${name} — ${projectType || 'General'}`,
      html: `
        <div style="font-family: monospace; background: #050505; color: #ffffff; padding: 40px; border-radius: 12px; max-width: 600px;">
          <h1 style="font-size: 2rem; margin: 0 0 8px; color: #ff3c00;">New Project Inquiry</h1>
          <p style="color: #555555; margin: 0 0 32px; font-size: 0.85rem; letter-spacing: 0.1em;">BUILD WITH KARTIK — CONTACT FORM</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 14px 0; color: #555555; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; width: 120px;">Name</td>
              <td style="padding: 14px 0; color: #ffffff; font-size: 1rem;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 14px 0; color: #555555; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;">Email</td>
              <td style="padding: 14px 0;"><a href="mailto:${email}" style="color: #ff3c00; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 14px 0; color: #555555; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;">Phone</td>
              <td style="padding: 14px 0;"><a href="tel:${phone}" style="color: #ff3c00; text-decoration: none;">${phone}</a></td>
            </tr>
            ` : ''}
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 14px 0; color: #555555; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;">Project</td>
              <td style="padding: 14px 0; color: #ffffff;">${projectType || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 14px 0; color: #555555; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;">Budget</td>
              <td style="padding: 14px 0; color: #ffffff;">${budget || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; color: #555555; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; vertical-align: top;">Message</td>
              <td style="padding: 14px 0; color: #aaaaaa; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1a1a1a;">
            <a href="mailto:${email}?subject=Re: Your inquiry — Build with Kartik"
               style="display: inline-block; background: #ff3c00; color: #ffffff; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;">
              Reply to ${name} →
            </a>
          </div>
        </div>
      `,
    })

    // Confirmation email to visitor via Brevo (HTTP API — works from Vercel/AWS)
    try {
      const confirmHtml = `
        <div style="font-family: monospace; background: #050505; color: #ffffff; padding: 40px; border-radius: 12px; max-width: 600px;">
          <h1 style="font-size: 2.5rem; margin: 0 0 4px; color: #ffffff; letter-spacing: 0.05em;">BUILD WITH</h1>
          <h1 style="font-size: 2.5rem; margin: 0 0 32px; color: #ff3c00; letter-spacing: 0.05em;">KARTIK.</h1>

          <p style="color: #aaaaaa; font-size: 1rem; line-height: 1.7; margin: 0 0 16px;">
            Hey ${name.split(' ')[0]},
          </p>
          <p style="color: #aaaaaa; font-size: 1rem; line-height: 1.7; margin: 0 0 16px;">
            Thanks for reaching out — I've received your message and will get back to you within <span style="color: #ffffff;">24–48 hours</span>.
          </p>
          <p style="color: #aaaaaa; font-size: 1rem; line-height: 1.7; margin: 0 0 32px;">
            In the meantime, feel free to check out some of my recent work.
          </p>

          <div style="border-top: 1px solid #1a1a1a; padding-top: 24px; margin-bottom: 32px;">
            <p style="color: #555555; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 16px;">Recent Projects</p>
            ${[
              ['MAISON STORE', 'Luxury E-commerce', 'https://maison-store-gamma.vercel.app/'],
              ['IRON HOUSE', 'Boutique Gym', 'https://iron-house-dusky.vercel.app/'],
              ['NEXUS AI', 'SaaS Platform', 'https://nexus-saas-mu-coral.vercel.app/'],
            ].map(([pname, type, url]) => `
              <a href="${url}" style="display: block; padding: 12px 0; border-bottom: 1px solid #1a1a1a; text-decoration: none;">
                <span style="color: #ffffff; font-size: 0.9rem;">${pname}</span>
                <span style="color: #555555; font-size: 0.7rem; letter-spacing: 0.1em; margin-left: 12px;">${type} ↗</span>
              </a>
            `).join('')}
          </div>

          <p style="color: #555555; font-size: 0.85rem; margin: 0;">
            — Kartik<br/>
            <a href="mailto:asapdotdrop@gmail.com" style="color: #ff3c00; text-decoration: none;">asapdotdrop@gmail.com</a>
          </p>
        </div>
      `

      await sendConfirmationViaSendGrid(
        email,
        name,
        confirmHtml,
        `Got your message, ${name.split(' ')[0]} — I'll be in touch soon`,
      )
    } catch (confirmErr) {
      const errMsg = confirmErr instanceof Error ? confirmErr.message : String(confirmErr)
      return NextResponse.json({ success: true, confirmError: errMsg })
    }

    return NextResponse.json({ success: true, confirmError: null })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
