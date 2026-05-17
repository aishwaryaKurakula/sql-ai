import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>SQL_AI</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>DASHBOARD</Link>
        <Link to="/history" style={styles.link}>HISTORY</Link>
        <button onClick={handleLogout} style={styles.btn}>LOGOUT</button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 48px',
    borderBottom: '1px solid #1a1a1a',
    background: '#0a0a0a',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '13px',
    letterSpacing: '0.2em',
    color: '#00ff88',
    textDecoration: 'none',
    fontFamily: "'DM Mono', monospace",
  },
  links: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  link: {
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: '#555',
    textDecoration: 'none',
    fontFamily: "'DM Mono', monospace",
  },
  btn: {
    background: 'none',
    border: '1px solid #222',
    color: '#555',
    padding: '8px 16px',
    fontSize: '11px',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    fontFamily: "'DM Mono', monospace",
  },
}