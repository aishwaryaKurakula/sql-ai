const vscode = require('vscode')
const { SidebarProvider } = require('./sidebarProvider')

function activate(context) {
  const sidebarProvider = new SidebarProvider(context.extensionUri)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SidebarProvider.viewType,
      sidebarProvider,
      {
        webviewOptions: {
          retainContextWhenHidden: true
        }
      }
    )
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'sqlai.openSidebar',
      () => {
        vscode.commands.executeCommand('sqlai.sidebar.focus')
      }
    )
  )
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}