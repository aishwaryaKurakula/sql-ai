const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')
const path = require('path')

module.exports = defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/webview',
    rollupOptions: {
      input: path.resolve(__dirname, 'webview/main.jsx'),
      output: {
        entryFileNames: 'main.js',
        assetFileNames: 'main.css'
      }
    }
  }
})