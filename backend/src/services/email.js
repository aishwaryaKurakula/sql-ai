const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM =
  process.env.RESEND_FROM_EMAIL || 'noreply@sqlai.dev'

const sendWelcomeEmail = async (to) => {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: 'Welcome to SQL AI',
      html: `
        <h2>Welcome to SQL AI 👋</h2>
        <p>You're all set. Open VS Code, click the SQL AI icon in the sidebar, and start typing in plain English.</p>
        <p>You get <strong>10 queries per minute</strong> on the free plan.</p>
        <p>Happy querying,<br/>The SQL AI team</p>
      `
    })
  } catch (err) {
    // Email failure should never break the API
    console.error('Welcome email failed:', err)
  }
}

const sendUsageAlertEmail = async (to, used, limit) => {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `SQL AI — you've used ${Math.round(
        (used / limit) * 100
      )}% of your quota`,
      html: `
        <h2>Heads up ⚠️</h2>
        <p>You've used <strong>${used} of ${limit}</strong> queries today.</p>
        <p>Cached queries don't count toward your limit — identical prompts are served instantly and free.</p>
        <p>The SQL AI team</p>
      `
    })
  } catch (err) {
    console.error('Usage alert email failed:', err)
  }
}

module.exports = {
  sendWelcomeEmail,
  sendUsageAlertEmail
}