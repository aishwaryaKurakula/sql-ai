const vscode = require("vscode")
const fs = require("fs")

class SidebarProvider {
  static viewType = "sqlai.sidebar"
  constructor(extensionUri) {
    this._extensionUri = extensionUri
    this._view = undefined
  }
  resolveWebviewView(webviewView, _context, _token) {
    this._view = webviewView
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, "dist", "webview"),
        vscode.Uri.joinPath(this._extensionUri, "dist", "webview", "assets")
      ]
    }
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.type) {
        case "error":
          vscode.window.showErrorMessage(message.text)
          break
        case "copy":
          vscode.env.clipboard.writeText(message.text)
          vscode.window.showInformationMessage("Query copied to clipboard")
          break
      }
    })
  }
  _getHtmlForWebview(webview) {
    const indexPath = vscode.Uri.joinPath(
      this._extensionUri, "dist", "webview", "index.html"
    )
    let html = fs.readFileSync(indexPath.fsPath, "utf8")
    html = html.replace(
      /(src|href)="([^"]+)"/g,
      (match, attr, value) => {
        if (value.startsWith("/") || value.startsWith("./") || value.startsWith("assets/")) {
          const assetPath = value.startsWith("/") ? value.slice(1) : value
          const uri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "dist", "webview", assetPath)
          )
          return `${attr}="${uri}"`
        }
        return match
      }
    )
    const nonce = getNonce()
    html = html.replace(/<script/g, `<script nonce="${nonce}"`)
    const config = vscode.workspace.getConfiguration('sqlai')
    const apiUrl = config.get('apiUrl', 'http://localhost:3000')

    // Allow the configured API origin for webview fetch/XHR.
    // Example: http://localhost:3000 => connect-src http://localhost:3000
    const origin = (() => {
      try {
        return new URL(apiUrl).origin
      } catch (_) {
        return null
      }
    })()

    const connectSrc = [
      // allow basic http(s) in case someone uses relative/alternate hosts
      'http:',
      'https:'
    ]

    if (origin) connectSrc.push(origin)

    html = html.replace(
      "<head>",
      `<head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource} 'unsafe-inline' 'self'; script-src 'nonce-${nonce}'; connect-src ${connectSrc.join(' ')} ws: wss:; font-src ${webview.cspSource} data: https:;">`
    )
    return html
  }
}

function getNonce() {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

module.exports = { SidebarProvider }

