import { useState } from 'react'
import api from '../api'

export default function useQuery() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const runQuery = async (prompt) => {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await api.post('/query', { prompt })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError('')
  }

  return { loading, error, result, runQuery, reset }
}