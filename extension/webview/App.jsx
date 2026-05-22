
import React, { useState } from 'react'
import { useQuery } from './hooks/useQuery'
import { useHistory } from './hooks/useHistory'
import { QueryInput } from './components/QueryInput'
import { ResultTable as QueryResult } from './components/ResultTable'
import { HistoryPanel } from './components/HistoryPanel'
import { SchemaStatus } from './components/SchemaStatus'

const vscode = typeof acquireVsCodeApi !== 'undefined'
  ? acquireVsCodeApi()
  : { postMessage: () => {} }

export const App = () => {
  const [tab, setTab] = useState('query')
  const [dialect, setDialect] = useState(null)

  const { result, loading, error, generate } = useQuery()
  const { history, addToHistory, clearHistory } = useHistory()

  const handleSubmit = async (prompt, selectedDialect) => {
    setDialect(selectedDialect)

    const data = await generate({ prompt, dialect: selectedDialect })

    if (data) {
      addToHistory({
        id: Date.now().toString(),
        prompt,
        sql: data.sql,
        dialect: selectedDialect,
        createdAt: new Date().toISOString()
      })

      // optional UX improvement
      setTab('query')
    }
  }

  const handleCopy = (sql) => {
    vscode.postMessage({ type: 'copy', text: sql })
  }

  const handleSelectHistory = (item) => {
    setDialect(item.dialect)
    setTab('query')

    // optional: send message to backend/UI if needed later
    vscode.postMessage({
      type: 'loadHistory',
      data: item
    })
  }

  const tabStyle = (active) => ({
    flex: 1,
    padding: '6px 0',
    fontSize: 12,
    cursor: 'pointer',
    background: active ? 'var(--vscode-tab-activeBackground)' : 'transparent',
    color: active ? 'var(--vscode-tab-activeForeground)' : '#888',
    border: 'none',
    borderBottom: active
      ? '1px solid var(--vscode-focusBorder)'
      : '1px solid transparent'
  })

  return (
    <div style={{
      padding: 12,
      fontFamily: 'var(--vscode-font-family)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 14 }}>SQL AI</strong>
        <SchemaStatus dialect={dialect} />
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--vscode-panel-border)' }}>
        <button style={tabStyle(tab === 'query')} onClick={() => setTab('query')}>
          Query
        </button>

        <button style={tabStyle(tab === 'history')} onClick={() => setTab('history')}>
          History
        </button>
      </div>

      {tab === 'query' && (
        <>
          <QueryInput
            onSubmit={handleSubmit}
            loading={loading}
            defaultDialect={dialect}
          />

          {error && (
            <p style={{ fontSize: 12, color: 'var(--vscode-errorForeground)' }}>
              {error}
            </p>
          )}

          {result && (
            <QueryResult result={result} onCopy={handleCopy} />
          )}
        </>
      )}

      {tab === 'history' && (
        <HistoryPanel
          history={history}
          onSelect={handleSelectHistory}
          onClear={clearHistory}
        />
      )}
    </div>
  )
}