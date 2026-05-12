const {
  buildCacheKey,
  getCache,
  setCache
} = require('../src/services/cache')

describe('cache key generation', () => {
  it('same inputs produce same key', () => {
    const a = buildCacheKey(
      'show all users',
      'postgresql',
      'users(id, name)'
    )

    const b = buildCacheKey(
      'show all users',
      'postgresql',
      'users(id, name)'
    )

    expect(a).toBe(b)
  })

  it('different prompts produce different keys', () => {
    const a = buildCacheKey(
      'show all users',
      'postgresql'
    )

    const b = buildCacheKey(
      'show all orders',
      'postgresql'
    )

    expect(a).not.toBe(b)
  })

  it('different dialects produce different keys', () => {
    const a = buildCacheKey(
      'show all users',
      'postgresql'
    )

    const b = buildCacheKey(
      'show all users',
      'mysql'
    )

    expect(a).not.toBe(b)
  })

  it('key is prefixed with sqlai:', () => {
    const key = buildCacheKey(
      'test',
      'postgresql'
    )

    expect(
      key.startsWith('sqlai:')
    ).toBe(true)
  })
})

describe('cache get/set', () => {
  it('returns null for missing key', async () => {
    const result = await getCache(
      'sqlai:nonexistent-key-xyz'
    )

    expect(result).toBeNull()
  })

  it('stores and retrieves a value', async () => {
    const key = buildCacheKey(
      'test prompt',
      'sqlite'
    )

    const value = {
      sql: 'SELECT 1',
      explanation: 'test',
      performanceHints: []
    }

    await setCache(key, value)

    const result = await getCache(key)

    expect(result).toEqual(value)
  })
})