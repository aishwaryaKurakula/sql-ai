require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const healthRouter = require('./routes/health')
const authRouter = require('./routes/auth')
const queryRouter = require('./routes/query')
const historyRouter = require('./routes/history')

const app = express()

const PORT = process.env.PORT || 3000

// Security headers
app.use(helmet())

// CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['vscode-webview://*']
        : '*'
  })
)

// Request logging
app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? 'combined'
      : 'dev'
  )
)

// Body parsing
app.use(
  express.json({
    limit: '10kb'
  })
)

// Routes
app.use(healthRouter)
app.use(authRouter)
app.use(queryRouter)
app.use(historyRouter)

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack)

  res.status(500).json({
    error: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(
    `SQL AI backend running on port ${PORT}`
  )
})

module.exports = app