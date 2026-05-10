const queryRequest = {
  prompt: '',
  dialect: 'postgresql', // or 'mysql' | 'sqlite'
  schema: ''
}

const queryResult = {
  sql: '',
  explanation: '',
  performanceHints: [],
  cached: false
}

const historyItem = {
  id: '',
  prompt: '',
  sql: '',
  dialect: 'postgresql',
  createdAt: new Date().toISOString()
}