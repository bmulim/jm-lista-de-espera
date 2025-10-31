module.exports = {
  apps: [
    {
      name: "lista-de-espera",
      script: "./dist-server/server.js",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Logging
      log_file: "./logs/combined.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      // Auto restart
      watch: false,
      ignore_watch: ["node_modules", "logs", "data"],

      // Memory management
      max_memory_restart: "500M",

      // Health monitoring
      min_uptime: "10s",
      max_restarts: 10,

      // Advanced features
      merge_logs: true,
      autorestart: true,

      // Environment specific
      node_args: "--max-old-space-size=1024",
    },
  ],
};
