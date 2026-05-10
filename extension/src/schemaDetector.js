import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

export type DetectedDialect = 'postgresql' | 'mysql' | 'sqlite' | null

export const detectDialect = async (): Promise<DetectedDialect> => {
  const folders = vscode.workspace.workspaceFolders
  if (!folders) return null

  const root = folders[0].uri.fsPath
  const envPath = path.join(root, '.env')

  if (!fs.existsSync(envPath)) return null

  const content = fs.readFileSync(envPath, 'utf-8')

  if (content.includes('postgresql') || content.includes('postgres')) {
    return 'postgresql'
  }
  if (content.includes('mysql')) return 'mysql'
  if (content.includes('sqlite')) return 'sqlite'

  return null
}

export const getDbUrl = async (): Promise<string | null> => {
  const folders = vscode.workspace.workspaceFolders
  if (!folders) return null

  const root = folders[0].uri.fsPath
  const envPath = path.join(root, '.env')

  if (!fs.existsSync(envPath)) return null

  const content = fs.readFileSync(envPath, 'utf-8')
  const match = content.match(/DATABASE_URL=(.+)/)
  return match ? match[1].trim() : null
}