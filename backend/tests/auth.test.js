const request = require('supertest')

const app = require('../src/index')

const prisma = require('../src/db/prisma')

beforeEach(async () => {
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('POST /auth/register', () => {
  it('creates a user and returns a JWT', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })

    expect(res.status).toBe(201)

    expect(res.body.token).toBeDefined()
  })

  it('rejects duplicate email', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })

    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })

    expect(res.status).toBe(409)
  })
})

describe('POST /auth/login', () => {
  it('returns JWT on valid credentials', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })

    expect(res.status).toBe(200)

    expect(res.body.token).toBeDefined()
  })

  it('rejects wrong password', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      })

    expect(res.status).toBe(401)
  })
})