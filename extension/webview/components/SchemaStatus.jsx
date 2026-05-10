import React from 'react'

const colours = {
  postgresql: '#336791',
  mysql: '#00758f',
  sqlite: '#003b57'
}

export const SchemaStatus = ({ dialect }) => {
  if (!dialect) {
    return (
      <div style={{ fontSize: 11, color: '#888', padding: '4px 0' }}>
        No DATABASE_URL detected in .env
      </div>
    )
  }

  const color = colours[dialect] || '#888'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          display: 'inline-block'
        }}
      />
      <span style={{ color: '#aaa' }}>
        Detected: <strong>{dialect}</strong>
      </span>
    </div>
  )
}