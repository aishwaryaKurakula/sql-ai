const { Router } = require('express')
const { z } = require('zod')

const { validate } = require('../middleware/validate')

const {
  verifyJWT
} = require('../middleware/auth')

const {
  arcjetMiddleware
} = require('../middleware/arcjet')

const {
  generateSQL
} = require('../services/ai')

const {
  buildCacheKey,
  getCache,
  setCache
} = require('../services/cache')

const {
  sendUsageAlertEmail
} = require('../services/email')

const prisma = require('../db/prisma')

const router = Router()

const querySchema = z.object({
  prompt: z.string().min(3).max(1000),

  dialect: z.enum([
    'postgresql',
    'mysql',
    'sqlite'
  ]),

  schema: z.string().max(5000).optional()
})

const DAILY_LIMIT = 100
const ALERT_THRESHOLD = 0.8

router.post(
  '/query',

  verifyJWT,

  arcjetMiddleware,

  validate(querySchema),

  async (req, res) => {
    const {
      prompt,
      dialect,
      schema
    } = req.body

    const userId = req.user.id

    // 1. Check cache first
    const cacheKey = buildCacheKey(
      prompt,
      dialect,
      schema
    )

    const cached =
      await getCache(cacheKey)

    if (cached) {
      // Save cached query to history
      await prisma.queryHistory.create({
        data: {
          userId,
          prompt,
          sql: cached.sql,
          dialect,
          cached: true
        }
      })

      res.json({
        ...cached,
        cached: true
      })

      return
    }

    // 2. Check daily usage
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    const usageLog =
      await prisma.usageLog.upsert({
        where: {
          userId_date: {
            userId,
            date: today
          }
        },

        update: {
          count: {
            increment: 1
          }
        },

        create: {
          userId,
          date: today,
          count: 1
        }
      })

    if (usageLog.count > DAILY_LIMIT) {
      res.status(429).json({
        error: 'Daily limit reached',

        message: `You have reached your ${DAILY_LIMIT} query/day limit.`
      })

      return
    }

    // 3. Usage alert at 80%
    if (
      usageLog.count ===
      Math.floor(
        DAILY_LIMIT * ALERT_THRESHOLD
      )
    ) {
      const user =
        await prisma.user.findUnique({
          where: {
            id: userId
          }
        })

      if (user) {
        sendUsageAlertEmail(
          user.email,
          usageLog.count,
          DAILY_LIMIT
        )
      }
    }

    // 4. Generate SQL
    const aiResult =
      await generateSQL({
        prompt,
        dialect,
        schema
      })

    // 5. Cache result
    await setCache(
      cacheKey,
      aiResult
    )

    // 6. Save query history
    await prisma.queryHistory.create({
      data: {
        userId,
        prompt,
        sql: aiResult.sql,
        dialect,
        cached: false
      }
    })

    const result = {
      ...aiResult,
      cached: false
    }

    res.json(result)
  }
)

module.exports = router