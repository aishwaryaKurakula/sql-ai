import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/register', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.tag}>SQL_AI</div>
        <h1 style={styles.title}>Create account</h1>
        <p style={styles.sub}>Start querying in plain English</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
              placeholder="you@example.com"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'CREATING...' : 'CREATE ACCOUNT →'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  box: {
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #222',
    padding: '48px',
    background: '#111',
  },
  tag: {
    fontSize: '11px',
    color: '#00ff88',
    letterSpacing: '0.2em',
    marginBottom: '32px',
    fontFamily: "'DM Mono', monospace",
  },
  title: {
    fontSize: '32px',
    color: '#f0f0f0',
    marginBottom: '8px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
  },
  sub: {
    color: '#555',
    marginBottom: '40px',
    fontSize: '13px',
  },
  error: {
    background: '#1a0000',
    border: '1px solid #ff3b3b',
    color: '#ff3b3b',
    padding: '12px',
    marginBottom: '24px',
    fontSize: '13px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: {
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: '#555',
    fontFamily: "'DM Mono', monospace",
  },
  input: {
    background: '#0a0a0a',
    border: '1px solid #222',
    color: '#f0f0f0',
    padding: '12px 16px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: "'DM Mono', monospace",
  },
  btn: {
    background: '#00ff88',
    color: '#0a0a0a',
    border: 'none',
    padding: '14px',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    marginTop: '8px',
    fontFamily: "'DM Mono', monospace",
  },
  footer: { marginTop: '32px', color: '#555', fontSize: '13px', textAlign: 'center' },
  link: { color: '#00ff88' },
}