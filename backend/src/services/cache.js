const { Redis } = require('@upstash/redis')
const crypto = require('crypto')

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

const TTL_SECONDS = 60 * 60 * 24 // 24 hours

// Hash prompt + dialect + schema into a short cache key
const buildCacheKey = (prompt, dialect, schema) => {
  const raw = `${prompt}:${dialect}:${schema || ''}`

  return (
    'sqlai:' +
    crypto
      .createHash('sha256')
      .update(raw)
      .digest('hex')
      .slice(0, 32)
  )
}

const getCache = async (key) => {
  try {
    const data = await redis.get(key)
    return data || null
  } catch {
    // Never fail a request because of cache
    return null
  }
}

const setCache = async (key, value) => {
  try {
    await redis.set(key, value, { ex: TTL_SECONDS })
  } catch {
    // Silent fail — cache is best-effort
  }
}

module.exports = {
  redis,
  buildCacheKey,
  getCache,
  setCache
}