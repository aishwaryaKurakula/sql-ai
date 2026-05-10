import React from 'react'

export const HistoryPanel = ({ history, onSelect, onClear }) => {
  if (!history?.length) {
    return (
      <p style={{ fontSize: 12, color: '#888' }}>
        No history yet.
      </p>
    )
  }

  const formatPrompt = (text) =>
    text.length > 60 ? text.slice(0, 60) + '…' : text

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8
        }}
      >
        <span style={{ fontSize: 11, color: '#888' }}>
          {history.length} queries
        </span>

        <button
          onClick={onClear}
          style={{
            fontSize: 11,
            color: '#888',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Clear all
        </button>
      </div>

      {history.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '8px 10px',
            marginBottom: 6,
            cursor: 'pointer',
            background: 'var(--vscode-editor-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 4
          }}
        >
          <p
            style={{
              margin: '0 0 4px',
              fontSize: 12,
              color: 'var(--vscode-foreground)'
            }}
          >
            {formatPrompt(item.prompt)}
          </p>

          <span style={{ fontSize: 10, color: '#888' }}>
            {item.dialect} ·{' '}
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </button>
      ))}
    </div>
  )
}