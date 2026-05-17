const { Router } = require('express')
const prisma = require('../db/prisma')

const {
  verifyJWT
} = require('../middleware/auth')

const router = Router()

// GET /history — last 50 queries
router.get(
  '/',
  verifyJWT,

  async (req, res) => {
    const history =
      await prisma.queryHistory.findMany({
        where: {
          userId: req.user.id
        },

        orderBy: {
          createdAt: 'desc'
        },

        take: 50
      })

    res.json(history)
  }
)

// DELETE /history/:id
router.delete(
  '/:id',
  verifyJWT,

  async (req, res) => {
    const item =
      await prisma.queryHistory.findUnique({
        where: {
          id: req.params.id
        }
      })

    if (
      !item ||
      item.userId !== req.user.id
    ) {
      res.status(404).json({
        error: 'Not found'
      })

      return
    }

    await prisma.queryHistory.delete({
      where: {
        id: req.params.id
      }
    })

    res.json({
      success: true
    })
  }
)

module.exports = router