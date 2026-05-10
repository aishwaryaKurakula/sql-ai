import React, { useState } from 'react'

export const QueryResult = ({ result, onCopy }) => {
  const [showExplanation, setShowExplanation] = useState(true)

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#888' }}>
          {result.cached ? '⚡ from cache' : '✨ generated'}
        </span>

        <button
          onClick={() => onCopy(result.sql || '')}
          style={{
            fontSize: 11,
            padding: '3px 10px',
            cursor: 'pointer',
            background: 'transparent',
            color: 'var(--vscode-button-background)',
            border: '1px solid var(--vscode-button-background)',
            borderRadius: 4
          }}
        >
          Copy SQL
        </button>
      </div>

      <pre
        style={{
          background: 'var(--vscode-editor-background)',
          color: 'var(--vscode-editor-foreground)',
          padding: 12,
          borderRadius: 4,
          fontSize: 12,
          overflowX: 'auto',
          margin: 0,
          border: '1px solid var(--vscode-panel-border)'
        }}
      >
        <code>{result.sql || ''}</code>
      </pre>

      <button
        onClick={toggleExplanation}
        style={{
          textAlign: 'left',
          background: 'none',
          border: 'none',
          color: '#888',
          fontSize: 11,
          cursor: 'pointer',
          padding: 0
        }}
      >
        {showExplanation ? '▼' : '▶'} Explanation
      </button>

      {showExplanation && (
        <p
          style={{
            fontSize: 12,
            color: 'var(--vscode-foreground)',
            margin: 0,
            lineHeight: 1.6
          }}
        >
          {result.explanation || ''}
        </p>
      )}

      {result.performanceHints?.length > 0 && (
        <div
          style={{
            background: '#2a1f00',
            border: '1px solid #665500',
            borderRadius: 4,
            padding: 10
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: '#ffcc00',
              margin: '0 0 6px',
              fontWeight: 600
            }}
          >
            Performance hints
          </p>

          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {result.performanceHints.map((hint) => (
              <li
                key={hint}
                style={{
                  fontSize: 11,
                  color: '#ffcc88',
                  marginBottom: 4
                }}
              >
                {hint}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}