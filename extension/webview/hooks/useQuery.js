import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useQuery = () => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async (request) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const token = localStorage.getItem('sqlai_token') || ''

      const res = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(request)
      })

      if (!res.ok) {
        let message = 'Something went wrong'

        try {
          const err = await res.json()
          if (err?.message) message = err.message
        } catch {}

        throw new Error(message)
      }

      const data = await res.json()
      setResult(data)
      return data

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return null

    } finally {
      setLoading(false)
    }
  }

  return { result, loading, error, generate }
}