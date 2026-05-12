const arcjet = require('@arcjet/node').default

const {
  tokenBucket,
  shield,
  detectBot
} = require('@arcjet/node')

const aj = arcjet({
  key: process.env.ARCJET_KEY,

  characteristics: ['userId'],

  rules: [
    // Block common attack patterns
    shield({
      mode: 'LIVE'
    }),

    // Block bots (allow curl for testing)
    detectBot({
      mode: 'LIVE',
      allow: ['CURL']
    }),

    // 10 requests per minute
    tokenBucket({
      mode: 'LIVE',
      refillRate: 10,
      interval: 60,
      capacity: 10
    })
  ]
})

const arcjetMiddleware = async (req, res, next) => {
  const userId =
    req.user?.id || req.ip || 'anonymous'

  const decision = await aj.protect(req, {
    userId,
    requested: 1
  })

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message:
          'You have exceeded 10 requests per minute. Please wait before trying again.'
      })

      return
    }

    if (decision.reason.isBot()) {
      res.status(403).json({
        error: 'Bot detected'
      })

      return
    }

    res.status(403).json({
      error: 'Forbidden'
    })

    return
  }

  next()
}

module.exports = {
  arcjetMiddleware
}