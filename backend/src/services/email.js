const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@sqlai.dev';

const sendWelcomeEmail = async (to) => {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: 'Welcome to SQL AI',
      html: `<h1>Welcome to SQL AI!</h1><p>Thanks for signing up with ${to}</p>`
    });
  } catch (err) {
    console.error('Welcome email failed:', err);
  }
};

const sendUsageAlertEmail = async (to, used, limit) => {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `SQL AI - you've used ${Math.round((used / limit) * 100)}% of your daily quota`,
      html: `<h1>Usage Alert</h1><p>You have used ${used} of ${limit} queries.</p>`
    });
  } catch (err) {
    console.error('Usage alert email failed:', err);
  }
};

module.exports = { sendWelcomeEmail, sendUsageAlertEmail };