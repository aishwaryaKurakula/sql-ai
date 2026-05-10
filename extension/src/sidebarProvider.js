const vscode = require('vscode')
const path = require('path')
const fs = require('fs')

class SidebarProvider {
  static viewType = 'sqlai.sidebar'

  constructor(extensionUri) {
    this._extensionUri = extensionUri
    this._view = undefined
  }

  resolveWebviewView(webviewView, _context, _token) {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview')
      ]
    }

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)

    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.type) {
        case 'error':
          vscode.window.showErrorMessage(message.text)
          break

        case 'copy':
          vscode.env.clipboard.writeText(message.text)
          vscode.window.showInformationMessage('Query copied to clipboard')
          break
      }
    })
  }

  _getHtmlForWebview(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'dist',
        'webview',
        'main.js'
      )
    )

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'dist',
        'webview',
        'main.css'
      )
    )

    const nonce = getNonce()

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none';
    style-src ${webview.cspSource} 'unsafe-inline';
    script-src 'nonce-${nonce}';"
  />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link href="${styleUri}" rel="stylesheet" />

  <title>SQL AI</title>
</head>

<body>
  <div id="root"></div>

  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>
`
  }
}

function getNonce() {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 32; i++) {
    text += possible.charAt(
      Math.floor(Math.random() * possible.length)
    )
  }

  return text
}

module.exports = {
  SidebarProvider
}