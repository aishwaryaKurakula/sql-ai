import React from 'react'

export const WelcomeEmail = ({ email }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Welcome to SQL AI</title>
      </head>

      <body style={styles.body}>
        <div style={styles.container}>
          
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.logo}>SQL AI</h1>
            <p style={styles.tagline}>
              Plain English → SQL in seconds
            </p>
          </div>

          {/* Main content */}
          <div style={styles.content}>
            <h2 style={styles.heading}>
              Welcome aboard 👋
            </h2>

            <p style={styles.text}>
              You're all set, <strong>{email}</strong>. SQL AI is now ready
              inside your VS Code.
            </p>

            <div style={styles.steps}>
              <p style={styles.stepsTitle}>
                Get started in 3 steps:
              </p>

              <div style={styles.step}>
                <span style={styles.stepNumber}>1</span>

                <span style={styles.stepText}>
                  Open VS Code and click the SQL AI icon in the activity bar
                </span>
              </div>

              <div style={styles.step}>
                <span style={styles.stepNumber}>2</span>

                <span style={styles.stepText}>
                  Select your database dialect (PostgreSQL, MySQL, or SQLite)
                </span>
              </div>

              <div style={styles.step}>
                <span style={styles.stepNumber}>3</span>

                <span style={styles.stepText}>
                  Type what you want in plain English and hit Generate
                </span>
              </div>
            </div>

            {/* Example query */}
            <div style={styles.exampleBox}>
              <p style={styles.exampleLabel}>
                Try this:
              </p>

              <p style={styles.exampleQuery}>
                "Show me the top 5 customers by total order value in the last
                30 days"
              </p>
            </div>

            {/* Plan info */}
            <div style={styles.planBox}>
              <p style={styles.planText}>
                🎯 <strong>Free plan:</strong> 10 queries per minute · 100
                queries per day
              </p>

              <p style={styles.planText}>
                ⚡ <strong>Cached queries</strong> are free and served instantly
                — identical prompts don't count toward your limit
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Built with ❤️ by Aishwarya Kurakula
            </p>

            <p style={styles.footerText}>
              You received this because you signed up at SQL AI.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

const styles = {
  body: {
    backgroundColor: '#0a0a0a',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: '40px 0'
  },


  container: {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#111111',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
  },


  header: {
    backgroundColor: '#0e7a54',
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
    color: '#bfdbfe',
    fontSize: '14px',
    margin: 0
  },

  content: {
    padding: '40px'
  },

  heading: {
    fontSize: '22px',
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

  steps: {
    marginBottom: '24px'
  },

  stepsTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 12px'
  },

  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '10px'
  },

  stepNumber: {
    backgroundColor: '#1a56db',
    color: '#ffffff',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    flexShrink: 0,
    lineHeight: '22px',
    textAlign: 'center'
  },

  stepText: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.5',
    paddingTop: '2px'
  },

  exampleBox: {
    backgroundColor: '#1e1e2e',
    borderRadius: '8px',
    padding: '16px 20px',
    marginBottom: '20px'
  },

  exampleLabel: {
    fontSize: '11px',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 8px'
  },

  exampleQuery: {
    fontSize: '14px',
    color: '#a5f3fc',
    fontFamily: 'monospace',
    margin: 0,
    lineHeight: '1.5'
  },

  planBox: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
    padding: '16px 20px'
  },

  planText: {
    fontSize: '13px',
    color: '#166534',
    margin: '0 0 6px',
    lineHeight: '1.5'
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

export default WelcomeEmail
