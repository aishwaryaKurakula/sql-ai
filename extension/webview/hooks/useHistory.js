import { useState, useEffect } from 'react'

const HISTORY_KEY = 'sqlai_history'
const MAX_HISTORY = 50

export const useHistory = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (err) {
      console.warn('Failed to load history:', err)
      localStorage.removeItem(HISTORY_KEY)
    }
  }, [])

  const addToHistory = (item) => {
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, MAX_HISTORY)

      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
      } catch (err) {
        console.warn('Failed to save history:', err)
      }

      return updated
    })
  }

  const clearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_KEY)
    } catch (err) {
      console.warn('Failed to clear history:', err)
    }
    setHistory([])
  }

  return { history, addToHistory, clearHistory }
}