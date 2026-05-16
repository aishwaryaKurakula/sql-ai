import { Resend } from 'resend'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'

import WelcomeEmail from '../../emails/Welcome'
import { UsageAlertEmail } from '../../emails/UsageAlert'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM =
  process.env.RESEND_FROM_EMAIL || 'noreply@sqlai.dev'

export const sendWelcomeEmail = async (to) => {
  try {
    const html = renderToStaticMarkup(
      React.createElement(WelcomeEmail, {
        email: to
      })
    )

    await resend.emails.send({
      from: FROM,
      to,
      subject: 'Welcome to SQL AI 👋',
      html
    })
  } catch (err) {
    console.error('Welcome email failed:', err)
  }
}

export const sendUsageAlertEmail = async (
  to,
  used,
  limit
) => {
  try {
    const html = renderToStaticMarkup(
      React.createElement(UsageAlertEmail, {
        email: to,
        used,
        limit
      })
    )

    await resend.emails.send({
      from: FROM,
      to,
      subject: `SQL AI — you've used ${Math.round(
        (used / limit) * 100
      )}% of your daily quota`,
      html
    })
  } catch (err) {
    console.error('Usage alert email failed:', err)
  }
}