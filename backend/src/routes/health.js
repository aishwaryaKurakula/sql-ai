const { Router } = require('express')

const prisma = require('../db/prisma')

const router = Router()

router.get('/', async (_req, res) => {
  try {
    // Ping the DB to confirm it's reachable
    await prisma.$queryRaw`SELECT 1`

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    })
  } catch {
    res.status(503).json({
      status: 'error',
      message: 'Database unreachable'
    })
  }
})

module.exports = router