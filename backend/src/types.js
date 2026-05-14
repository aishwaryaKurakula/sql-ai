// Request body for AI query generation
const QueryRequest = {
  prompt: '',
  dialect: 'postgresql', // 'mysql' or 'sqlite'
  schema: undefined
}

// Response returned by AI service
const AIResponse = {
  sql: '',
  explanation: '',
  performanceHints: []
}

// Final query result with cache info
const QueryResult = {
  sql: '',
  explanation: '',
  performanceHints: [],
  cached: false
}

// Authenticated user payload
const UserPayload = {
  id: '',
  email: ''
}

module.exports = {
  QueryRequest,
  AIResponse,
  QueryResult,
  UserPayload
}