const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const prisma = require('../db/prisma')
const { validate } = require('../middleware/validate')
const { sendWelcomeEmail } = require('../services/email')

const router = Router()

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

router.post('/register', validate(registerSchema), async (req, res) => {
  const { email, password } = req.body
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    res.status(409).json({ error: 'Email already registered' })
    return
  }
  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({ data: { email, password: hashed } })
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  sendWelcomeEmail(email)
  res.status(201).json({ token })
})

router.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token })
})

module.exports = router