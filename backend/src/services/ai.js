const Anthropic = require('@anthropic-ai/sdk')

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const SYSTEM_PROMPT = `You are an expert SQL assistant. Given a natural language prompt and optional schema, generate a correct SQL query.

Respond in this EXACT format — nothing else:
SQL:
<your sql query here>

EXPLANATION:
<plain english explanation of what the query does, 2-3 sentences>

HINTS:
<performance hint 1, or "none" if no hints>
<performance hint 2 if applicable>`

const generateSQL = async (request) => {
  const userMessage = `
Dialect: ${request.dialect}
${request.schema ? `Schema:\n${request.schema}\n` : ''}
Request: ${request.prompt}
  `.trim()

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: userMessage
      }
    ]
  })

  const raw = message.content[0].text

  return parseAIResponse(raw)
}

const parseAIResponse = (raw) => {
  const sqlMatch = raw.match(/SQL:\s*([\s\S]*?)(?=EXPLANATION:|$)/i)

  const explanationMatch = raw.match(
    /EXPLANATION:\s*([\s\S]*?)(?=HINTS:|$)/i
  )

  const hintsMatch = raw.match(/HINTS:\s*([\s\S]*?)$/i)

  const sql = sqlMatch?.[1]?.trim() || raw.trim()

  const explanation = explanationMatch?.[1]?.trim() || ''

  const hintsRaw = hintsMatch?.[1]?.trim() || ''

  const performanceHints = hintsRaw
    .split('\n')
    .map((h) => h.trim())
    .filter((h) => h && h.toLowerCase() !== 'none')

  return {
    sql,
    explanation,
    performanceHints
  }
}

module.exports = {
  generateSQL
}