import React, { useState, useEffect } from 'react'

export const QueryInput = ({ onSubmit, loading, defaultDialect }) => {
  const [prompt, setPrompt] = useState('')
  const [dialect, setDialect] = useState(defaultDialect || 'postgresql')

  // Sync if defaultDialect changes
  useEffect(() => {
    if (defaultDialect) {
      setDialect(defaultDialect)
    }
  }, [defaultDialect])

  const handleSubmit = () => {
    if (!prompt.trim() || loading) return
    onSubmit(prompt.trim(), dialect)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Show me the top 5 customers by total order value last month"
        rows={4}
        style={{
          width: '100%',
          resize: 'vertical',
          fontSize: 13,
          background: 'var(--vscode-input-background)',
          color: 'var(--vscode-input-foreground)',
          border: '1px solid var(--vscode-input-border)',
          borderRadius: 4,
          padding: 8,
          boxSizing: 'border-box'
        }}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select
          value={dialect}
          onChange={(e) => setDialect(e.target.value)}
          style={{
            flex: 1,
            fontSize: 12,
            padding: '4px 6px',
            background: 'var(--vscode-dropdown-background)',
            color: 'var(--vscode-dropdown-foreground)',
            border: '1px solid var(--vscode-dropdown-border)',
            borderRadius: 4
          }}
        >
          <option value="postgresql">PostgreSQL</option>
          <option value="mysql">MySQL</option>
          <option value="sqlite">SQLite</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          style={{
            flex: 2,
            padding: '6px 12px',
            fontSize: 13,
            cursor: loading ? 'not-allowed' : 'pointer',
            background: loading
              ? '#555'
              : 'var(--vscode-button-background)',
            color: 'var(--vscode-button-foreground)',
            border: 'none',
            borderRadius: 4
          }}
        >
          {loading ? 'Generating...' : 'Generate SQL  ⌘↵'}
        </button>
      </div>
    </div>
  )
}