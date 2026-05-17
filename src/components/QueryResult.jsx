import { useState } from 'react'

export default function QueryResult({ result }) {
  const [copied, setCopied] = useState(false)

  if (!result) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(result.sql || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.label}>GENERATED SQL</span>
        <button onClick={handleCopy} style={styles.copyBtn}>
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>

      <pre style={styles.code}>{result.sql}</pre>

      {result.explanation && (
        <div style={styles.explanation}>
          <p style={styles.explanationLabel}>EXPLANATION</p>
          <p style={styles.explanationText}>{result.explanation}</p>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    border: '1px solid #222',
    background: '#111',
    marginTop: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #1a1a1a',
  },
  label: {
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: '#555',
    fontFamily: "'DM Mono', monospace",
  },
  copyBtn: {
    background: 'none',
    border: '1px solid #222',
    color: '#00ff88',
    padding: '6px 14px',
    fontSize: '10px',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    fontFamily: "'DM Mono', monospace",
  },
  code: {
    padding: '24px',
    fontSize: '13px',
    lineHeight: 1.8,
    color: '#00ff88',
    overflowX: 'auto',
    margin: 0,
    fontFamily: "'DM Mono', monospace",
  },
  explanation: {
    borderTop: '1px solid #1a1a1a',
    padding: '20px 24px',
  },
  explanationLabel: {
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: '#555',
    marginBottom: '8px',
    fontFamily: "'DM Mono', monospace",
  },
  explanationText: {
    fontSize: '13px',
    color: '#888',
    lineHeight: 1.7,
    fontFamily: "'DM Mono', monospace",
  },
}