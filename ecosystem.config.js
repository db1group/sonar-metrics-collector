module.exports = {
  apps: [
    {
      name: 'engineering-metrics-collector',
      script: 'dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5100,
      },
    },
  ],
};
