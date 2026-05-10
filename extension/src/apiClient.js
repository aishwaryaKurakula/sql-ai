const vscode = require('vscode')

const getApiUrl = () => {
  const config = vscode.workspace.getConfiguration('sqlai')
  return config.get('apiUrl', 'http://localhost:3000')
}

async function generateQuery(request, token) {
  try {
    const url = `${getApiUrl()}/query`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      let errorMessage = `Request failed: ${response.status}`

      try {
        const error = await response.json()
        if (error.message) {
          errorMessage = error.message
        }
      } catch (_) {}

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data

  } catch (err) {
    console.error('generateQuery error:', err)
    throw err
  }
}

module.exports = {
  generateQuery
}