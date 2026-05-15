module.exports = {
  apps: [
    {
      name: 'sqlai-backend',
      script: 'dist/index.js',
      cwd: '/app/backend',

      // Cluster mode — 2 workers to use both CPU cores
      instances: 2,
      exec_mode: 'cluster',

      // Auto-restart on crash
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',

      // Restart if it crashes more than 10 times in 30 seconds
      max_restarts: 10,
      min_uptime: '30s',

      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },

      // Log rotation
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/var/log/sqlai/error.log',
      out_file: '/var/log/sqlai/out.log',
      merge_logs: true
    }
  ]
}