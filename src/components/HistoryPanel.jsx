import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function HistoryPanel() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/history')
        setHistory(res.data.slice(0, 5))
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) return null

  if (history.length === 0) return null

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.label}>RECENT QUERIES</span>
        <Link to="/history" style={styles.viewAll}>VIEW ALL →</Link>
      </div>

      <div style={styles.list}>
        {history.map((item, i) => (
          <div key={item.id || i} style={styles.item}>
            <span style={styles.index}>#{String(i + 1).padStart(2, '0')}</span>
            <p style={styles.prompt}>{item.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    border: '1px solid #1a1a1a',
    marginTop: '48px',
    background: '#111',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    borderBottom: '1px solid #1a1a1a',
  },
  label: {
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: '#555',
    fontFamily: "'DM Mono', monospace",
  },
  viewAll: {
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: '#00ff88',
    textDecoration: 'none',
    fontFamily: "'DM Mono', monospace",
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    padding: '16px 20px',
    borderBottom: '1px solid #1a1a1a',
  },
  index: {
    color: '#333',
    fontSize: '11px',
    flexShrink: 0,
    paddingTop: '2px',
    fontFamily: "'DM Mono', monospace",
  },
  prompt: {
    color: '#888',
    fontSize: '13px',
    lineHeight: 1.5,
    fontFamily: "'DM Mono', monospace",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}