import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/history')
        setHistory(res.data)
      } catch (err) {
        setError('Failed to load history')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>SQL_AI</Link>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>DASHBOARD</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
        </div>
      </nav>

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.tag}>// query history</p>
        <h1 style={styles.title}>Past Queries</h1>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {loading && (
          <div style={styles.loadingWrap}>
            {[1,2,3].map(i => (
              <div key={i} style={styles.skeletonCard}>
                <div style={styles.skeleton} />
                <div style={{ ...styles.skeleton, width: '60%', marginTop: '12px' }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        {!loading && !error && history.length === 0 && (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No queries yet.</p>
            <Link to="/" style={styles.emptyLink}>Run your first query →</Link>
          </div>
        )}

        {!loading && history.map((item, i) => (
          <div
            key={item.id || i}
            style={styles.card}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardLeft}>
                <span style={styles.cardIndex}>#{String(i + 1).padStart(2, '0')}</span>
                <p style={styles.cardPrompt}>{item.prompt}</p>
              </div>
              <div style={styles.cardRight}>
                <span style={styles.cardDate}>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <span style={styles.chevron}>{expanded === i ? '▲' : '▼'}</span>
              </div>
            </div>

            {expanded === i && (
              <div style={styles.cardBody}>
                <p style={styles.sqlLabel}>SQL</p>
                <pre style={styles.sql}>{item.sql}</pre>
                {item.explanation && (
                  <>
                    <p style={styles.sqlLabel} >EXPLANATION</p>
                    <p style={styles.explanation}>{item.explanation}</p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
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
    textDecoration: 'none',
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
  header: {
    padding: '64px 48px 40px',
  },
  tag: {
    color: '#00ff88',
    fontSize: '12px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '48px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    letterSpacing: '-0.03em',
  },
  content: {
    padding: '0 48px 80px',
    maxWidth: '900px',
  },
  loadingWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  skeletonCard: {
    border: '1px solid #1a1a1a',
    padding: '24px',
  },
  skeleton: {
    height: '14px',
    background: '#1a1a1a',
    width: '100%',
  },
  error: {
    background: '#1a0000',
    border: '1px solid #ff3b3b',
    color: '#ff3b3b',
    padding: '16px',
    fontSize: '13px',
  },
  empty: {
    padding: '80px 0',
    textAlign: 'center',
  },
  emptyText: {
    color: '#333',
    marginBottom: '16px',
    fontSize: '15px',
  },
  emptyLink: {
    color: '#00ff88',
    fontSize: '13px',
    textDecoration: 'none',
  },
  card: {
    border: '1px solid #1a1a1a',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px 24px',
  },
  cardLeft: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardIndex: {
    color: '#333',
    fontSize: '11px',
    paddingTop: '2px',
    flexShrink: 0,
  },
  cardPrompt: {
    color: '#f0f0f0',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  cardRight: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: '24px',
  },
  cardDate: {
    color: '#333',
    fontSize: '11px',
  },
  chevron: {
    color: '#555',
    fontSize: '10px',
  },
  cardBody: {
    borderTop: '1px solid #1a1a1a',
    padding: '20px 24px',
  },
  sqlLabel: {
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: '#555',
    marginBottom: '12px',
    marginTop: '16px',
  },
  sql: {
    color: '#00ff88',
    fontSize: '13px',
    lineHeight: 1.8,
    overflowX: 'auto',
  },
  explanation: {
    color: '#888',
    fontSize: '13px',
    lineHeight: 1.7,
  },
}