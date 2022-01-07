const baseConfig = {
  cwd: './',
  script: './app',
  log_date_format: 'YYYY-MM-DD HH:mm Z',
  instances: 1,
  merge_logs: true,
  autorestart: false,
  exec_interpreter: 'node',
  exec_mode: 'cluster',
  watch: false,
  max_memory_restart: '300M'
}
module.exports = {
  apps: [
    {
      ...baseConfig,
      error_file: './logs/test_err.log',
      out_file: './logs/test_out.log',
      name: 'talkline-front-end-server-dev',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]

  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '150.158.101.92',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:hn-failte/koa-base.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
}
