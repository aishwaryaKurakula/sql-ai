import { useState } from 'react'

export default function QueryInput({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    onSubmit(prompt)
  }

  return (
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
      <div style={styles.footer}>
        <span style={styles.hint}>⌘ + Enter to run</span>
        <button type="submit" style={styles.btn} disabled={loading}>
          {loading ? 'GENERATING...' : 'GENERATE SQL →'}
        </button>
      </div>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
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
  footer: {
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
    fontFamily: "'DM Mono', monospace",
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
}