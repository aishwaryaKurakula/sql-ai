const request = require('supertest')

const app = require('../src/index')

const prisma = require('../src/db/prisma')

let token

beforeAll(async () => {
  await prisma.user.deleteMany()

  const res = await request(app)
    .post('/auth/register')
    .send({
      email: 'querytest@example.com',
      password: 'password123'
    })

  token = res.body.token
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('POST /query', () => {
  it('rejects unauthenticated requests', async () => {
    const res = await request(app)
      .post('/query')
      .send({
        prompt: 'show all users',
        dialect: 'postgresql'
      })

    expect(res.status).toBe(401)
  })

  it('rejects empty prompt', async () => {
    const res = await request(app)
      .post('/query')
      .set(
        'Authorization',
        `Bearer ${token}`
      )
      .send({
        prompt: '',
        dialect: 'postgresql'
      })

    expect(res.status).toBe(400)
  })

  it('rejects invalid dialect', async () => {
    const res = await request(app)
      .post('/query')
      .set(
        'Authorization',
        `Bearer ${token}`
      )
      .send({
        prompt: 'show all users',
        dialect: 'oracle'
      })

    expect(res.status).toBe(400)
  })

  it('returns sql and explanation for valid request', async () => {
    const res = await request(app)
      .post('/query')
      .set(
        'Authorization',
        `Bearer ${token}`
      )
      .send({
        prompt: 'show all users',
        dialect: 'postgresql'
      })

    expect(res.status).toBe(200)

    expect(res.body.sql).toBeDefined()

    expect(
      res.body.explanation
    ).toBeDefined()

    expect(
      typeof res.body.cached
    ).toBe('boolean')
  })
})