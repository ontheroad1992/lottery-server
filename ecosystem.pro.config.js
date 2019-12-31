module.exports = {
  apps: [
    {
      name: 'nest-server',
      script: 'npm run start',
      // cwd: '/www/wwwroot/cms-server',
      // 启动实例
      instances: 1,
      // 是否自动重启
      autorestart: true,
      // 是否监听文件的变动
      watch: true,
      // 监听时忽略某些文件
      ignore_watch: ['node_modules', 'logs', 'pm2_logs'],
      // 超过指定内存则重启
      max_memory_restart: '1G',
      // 环境变量
      error_file: './pm2_logs/error.log',
      out_file: './pm2_logs/out_file.log',
      log_file: './pm2_logs/combined.log',
      time: true,
      // 最大错误重启次数
      max_restarts: 5,
      // 崩溃重启的间隔时间
      restart_delay: 4000
    }
  ]
}
