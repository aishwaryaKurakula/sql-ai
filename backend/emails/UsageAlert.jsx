import React from 'react'

export const UsageAlertEmail = ({
  email,
  used,
  limit
}) => {
  const percentage = Math.round((used / limit) * 100)
  const remaining = limit - used

  return (
    <html>
      <head>
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>SQL AI — Usage Alert</title>
      </head>

      <body style={styles.body}>
        <div style={styles.container}>
          
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.logo}>SQL AI</h1>

            <p style={styles.tagline}>
              Usage Alert
            </p>
          </div>

          {/* Main content */}
          <div style={styles.content}>
            <h2 style={styles.heading}>
              You've used {percentage}% of your daily quota ⚠️
            </h2>

            <p style={styles.text}>
              Hey <strong>{email}</strong>, heads up — you're running low on
              queries for today.
            </p>

            {/* Usage bar */}
            <div style={styles.usageBox}>
              <div style={styles.usageRow}>
                <span style={styles.usageLabel}>
                  Queries used today
                </span>

                <span style={styles.usageCount}>
                  {used} / {limit}
                </span>
              </div>

              {/* Progress bar */}
              <div style={styles.progressTrack}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${percentage}%`
                  }}
                />
              </div>

              <div style={styles.usageRow}>
                <span style={styles.remainingText}>
                  {remaining} queries remaining
                </span>

                <span style={styles.percentText}>
                  {percentage}% used
                </span>
              </div>
            </div>

            {/* Tip box */}
            <div style={styles.tipBox}>
              <p style={styles.tipTitle}>
                💡 Make your queries go further
              </p>

              <p style={styles.tipText}>
                <strong>Cached queries are completely free</strong> and don't
                count toward your limit. If you ask the same question twice
                (same prompt + same schema), the second response is served
                instantly from cache at zero cost.
              </p>
            </div>

            {/* Reset info */}
            <div style={styles.resetBox}>
              <p style={styles.resetText}>
                🔄 Your quota resets at <strong>midnight UTC</strong> every
                day.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Built with ❤️ by Aishwarya Kurakula
            </p>

            <p style={styles.footerText}>
              You received this because you have a SQL AI account registered to{" "}
              {email}.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

const styles = {
  body: {
    backgroundColor: '#f4f4f5',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: '40px 0'
  },

  container: {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },

  header: {
    backgroundColor: '#d97706',
    padding: '32px 40px',
    textAlign: 'center'
  },

  logo: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 6px'
  },

  tagline: {
    color: '#fde68a',
    fontSize: '14px',
    margin: 0
  },

  content: {
    padding: '40px'
  },

  heading: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 12px'
  },

  text: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: '1.6',
    margin: '0 0 24px'
  },

  usageBox: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px'
  },

  usageRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },

  usageLabel: {
    fontSize: '13px',
    color: '#92400e',
    fontWeight: 500
  },

  usageCount: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#92400e'
  },

  progressTrack: {
    backgroundColor: '#fde68a',
    borderRadius: '999px',
    height: '10px',
    marginBottom: '8px',
    overflow: 'hidden'
  },

  progressFill: {
    backgroundColor: '#d97706',
    height: '100%',
    borderRadius: '999px'
  },

  remainingText: {
    fontSize: '12px',
    color: '#b45309'
  },

  percentText: {
    fontSize: '12px',
    color: '#b45309',
    fontWeight: 600
  },

  tipBox: {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    padding: '16px 20px',
    marginBottom: '16px'
  },

  tipTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e40af',
    margin: '0 0 8px'
  },

  tipText: {
    fontSize: '13px',
    color: '#1e40af',
    lineHeight: '1.6',
    margin: 0
  },

  resetBox: {
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },

  resetText: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },

  footer: {
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
    padding: '24px 40px',
    textAlign: 'center'
  },

  footerText: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '0 0 4px'
  }
}

export default UsageAlertEmail