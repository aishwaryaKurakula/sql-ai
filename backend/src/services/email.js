const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@sqlai.dev'

const renderEmailTemplate = (type, props) => {
  const email = props?.email || ''
  const used = props?.used
  const limit = props?.limit

  if (type === 'usage-alert') {
    const percentage = Math.round((used / limit) * 100)
    const remaining = limit - used

    return `
      <div style="background:#0a0a0a; color:#f0f0f0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; padding:40px 0;">
        <div style="max-width:560px; margin:0 auto; background:#111; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.3);">
          <div style="background:#00ff88; padding:32px 40px; text-align:center;">
            <div style="font-size:28px; font-weight:800; color:#0a0a0a; margin-bottom:6px;">SQL AI</div>
            <div style="font-size:14px; color:#0a0a0a; opacity:0.9;">Usage Alert</div>
          </div>
          <div style="padding:40px;">
            <div style="font-size:20px; font-weight:800; margin-bottom:12px;">You\u2019ve used ${percentage}% of your daily quota \u26a0\ufe0f</div>
            <div style="font-size:15px; color:#cbd5e1; line-height:1.6; margin-bottom:24px;">Hey <strong>${email}</strong>, you\u2019re running low on queries for today.</div>

            <div style="background:#0b1220; border:1px solid #1f2a44; border-radius:8px; padding:20px; margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div style="font-size:13px; color:#00ff88; font-weight:600;">Queries used today</div>
                <div style="font-size:16px; font-weight:800; color:#00ff88;">${used} / ${limit}</div>
              </div>
              <div style="background:#1f2a44; border-radius:999px; height:10px; overflow:hidden; margin-bottom:8px;">
                <div style="background:#00ff88; height:100%; width:${percentage}%; border-radius:999px;"></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:12px; color:#cbd5e1; opacity:0.9;">${remaining} queries remaining</div>
                <div style="font-size:12px; color:#00ff88; font-weight:700;">${percentage}% used</div>
              </div>
            </div>

            <div style="background:#0f172a; border:1px solid #00ff88; border-radius:8px; padding:16px 20px; margin-bottom:16px;">
              <div style="font-size:13px; font-weight:800; color:#00ff88; margin-bottom:8px;">\uD83D\uDCA1 Make your queries go further</div>
              <div style="font-size:13px; color:#cbd5e1; line-height:1.6;">Cached queries are free and don\u2019t count toward your limit. Repeat the same prompt (same prompt + schema) to get instant results at zero cost.</div>
            </div>

            <div style="text-align:center; padding:12px; background:#f9fafb; border-radius:8px;">
              <div style="font-size:13px; color:#475569; margin:0;">\uD83D\uDD04 Your quota resets at <strong>midnight UTC</strong> every day.</div>
            </div>
          </div>

          <div style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:24px 40px; text-align:center;">
            <div style="font-size:12px; color:#9ca3af; margin:0 0 4px;">Built with \u2764\ufe0f by Aishwarya Kurakula</div>
            <div style="font-size:12px; color:#9ca3af; margin:0;">You received this because you have a SQL AI account registered to ${email}.</div>
          </div>
        </div>
      </div>
    `
  }

  // Welcome
  return `
    <div style="background:#0a0a0a; color:#f0f0f0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; padding:40px 0;">
      <div style="max-width:560px; margin:0 auto; background:#111; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.3);">
        <div style="background:#00ff88; padding:32px 40px; text-align:center;">
          <div style="font-size:28px; font-weight:800; color:#0a0a0a; margin-bottom:6px;">SQL AI</div>
          <div style="font-size:14px; color:#0a0a0a; opacity:0.9;">Plain English \u2192 SQL in seconds</div>
        </div>
        <div style="padding:40px;">
          <div style="font-size:22px; font-weight:800; margin-bottom:12px; color:#f0f0f0;">Welcome aboard \uD83D\uDC4B</div>
          <div style="font-size:15px; color:#cbd5e1; line-height:1.6; margin-bottom:24px;">You\u2019re all set, <strong>${email}</strong>. SQL AI is now ready inside your VS Code.</div>

          <div style="background:#1e1e2e; border-radius:8px; padding:16px 20px; margin-bottom:20px;">
            <div style="font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.05em; margin:0 0 8px;">Try this</div>
            <div style="font-size:14px; color:#00ff88; font-family:monospace; margin:0; line-height:1.5;">"Show me the top 5 customers by total order value in the last 30 days"</div>
          </div>

          <div style="background:#0f172a; border:1px solid #00ff88; border-radius:8px; padding:16px 20px;">
            <div style="font-size:13px; color:#00ff88; margin:0 0 6px; line-height:1.5; font-weight:700;">\uD83C\uDFDA Free plan</div>
            <div style="font-size:13px; color:#cbd5e1; line-height:1.6; margin:0;">10 queries per minute \u00b7 100 queries per day</div>
            <div style="font-size:13px; color:#cbd5e1; line-height:1.6; margin-top:8px;">\u26A1 Cached queries are free and served instantly.</div>
          </div>
        </div>

        <div style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:24px 40px; text-align:center;">
          <div style="font-size:12px; color:#9ca3af; margin:0 0 4px;">Built with \u2764\ufe0f by Aishwarya Kurakula</div>
          <div style="font-size:12px; color:#9ca3af; margin:0;">You received this because you signed up at SQL AI.</div>
        </div>
      </div>
    </div>
  `
}

const sendWelcomeEmail = async (to) => {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: 'Welcome to SQL AI',
      html: renderEmailTemplate('welcome', { email: to })
    })
  } catch (err) {
    console.error('Welcome email failed:', err)
  }
}

const sendUsageAlertEmail = async (to, used, limit) => {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `SQL AI - you\u2019ve used ${Math.round((used / limit) * 100)}% of your daily quota`,
      html: renderEmailTemplate('usage-alert', { email: to, used, limit })
    })
  } catch (err) {
    console.error('Usage alert email failed:', err)
  }
}

module.exports = { sendWelcomeEmail, sendUsageAlertEmail }