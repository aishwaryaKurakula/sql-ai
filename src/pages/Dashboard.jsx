import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await api.post('/query', { prompt })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result?.sql || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <span style={styles.logo}>SQL_AI</span>
        <div style={styles.navLinks}>
          <Link to="/history" style={styles.navLink}>HISTORY</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <p style={styles.heroTag}>// natural language → sql</p>
        <h1 style={styles.heroTitle}>What do you want<br />to query?</h1>
      </div>

      {/* Input */}
      <div style={styles.inputSection}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={styles.textarea}
            placeholder="e.g. Show me all users who signed up in the last 30 days..."
            rows={4}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.metaKey) handleSubmit(e)
            }}
          />
          <div style={styles.formFooter}>
            <span style={styles.hint}>⌘ + Enter to run</span>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'GENERATING...' : 'GENERATE SQL →'}
            </button>
          </div>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {/* Result */}
      {result && (
        <div style={styles.resultSection}>
          <div style={styles.resultHeader}>
            <span style={styles.resultLabel}>GENERATED SQL</span>
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
      )}

      {/* Loading skeleton */}
      {loading && (
        <div style={styles.resultSection}>
          <div style={styles.skeleton} />
          <div style={{ ...styles.skeleton, width: '70%', marginTop: '12px' }} />
          <div style={{ ...styles.skeleton, width: '85%', marginTop: '12px' }} />
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f0f0f0',
    fontFamily: "'DM Mono', monospace",
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 48px',
    borderBottom: '1px solid #1a1a1a',
  },
  logo: {
    fontSize: '13px',
    letterSpacing: '0.2em',
    color: '#00ff88',
    fontFamily: "'DM Mono', monospace",
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navLink: {
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: '#555',
    textDecoration: 'none',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #222',
    color: '#555',
    padding: '8px 16px',
    fontSize: '11px',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    fontFamily: "'DM Mono', monospace",
  },
  hero: {
    padding: '80px 48px 48px',
    maxWidth: '800px',
  },
  heroTag: {
    color: '#00ff88',
    fontSize: '12px',
    marginBottom: '16px',
    letterSpacing: '0.05em',
  },
  heroTitle: {
    fontSize: '56px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: '#f0f0f0',
  },
  inputSection: {
    padding: '0 48px',
    maxWidth: '800px',
    marginTop: '48px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '0' },
  textarea: {
    width: '100%',
    background: '#111',
    border: '1px solid #222',
    borderBottom: 'none',
    color: '#f0f0f0',
    padding: '20px',
    fontSize: '15px',
    resize: 'none',
    outline: 'none',
    fontFamily: "'DM Mono', monospace",
    lineHeight: 1.6,
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#111',
    border: '1px solid #222',
    padding: '12px 20px',
  },
  hint: {
    fontSize: '11px',
    color: '#333',
  },
  btn: {
    background: '#00ff88',
    color: '#0a0a0a',
    border: 'none',
    padding: '10px 24px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    fontFamily: "'DM Mono', monospace",
  },
  error: {
    margin: '24px 48px 0',
    background: '#1a0000',
    border: '1px solid #ff3b3b',
    color: '#ff3b3b',
    padding: '16px',
    fontSize: '13px',
    maxWidth: '800px',
  },
  resultSection: {
    margin: '48px 48px 0',
    maxWidth: '800px',
    border: '1px solid #222',
    background: '#111',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #1a1a1a',
  },
  resultLabel: {
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: '#555',
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
  },
  explanationText: {
    fontSize: '13px',
    color: '#888',
    lineHeight: 1.7,
  },
  skeleton: {
    height: '16px',
    background: '#1a1a1a',
    width: '100%',
    animation: 'pulse 1.5s infinite',
  },
}