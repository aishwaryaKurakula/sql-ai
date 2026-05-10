import React from 'react'

export const ResultTable = ({ rows }) => {
  if (!rows?.length) {
    return (
      <p style={{ fontSize: 12, color: '#888' }}>
        No rows returned.
      </p>
    )
  }

  const columns = Array.from(
    new Set(rows.flatMap((row) => Object.keys(row || {})))
  )

  return (
    <div style={{ overflowX: 'auto', marginTop: 8 }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 12
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'left',
                  padding: '4px 8px',
                  borderBottom: '1px solid var(--vscode-panel-border)',
                  color: '#aaa',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background:
                  i % 2 === 0
                    ? 'transparent'
                    : 'rgba(255,255,255,0.03)'
              }}
            >
              {columns.map((col) => (
                <td
                  key={col}
                  style={{
                    padding: '4px 8px',
                    color: 'var(--vscode-foreground)',
                    verticalAlign: 'top'
                  }}
                >
                  {row?.[col] !== null && row?.[col] !== undefined
                    ? String(row[col])
                    : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}