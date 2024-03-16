module.exports = {
  apps: [
    {
      name: 'simple-crud-test-rest-api-expressjs',
      script: 'index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME,
        PORT: process.env.PORT,
      },
    },
  ],
};
