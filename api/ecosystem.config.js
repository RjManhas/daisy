module.exports = {
  apps: [
    {
      name: "api",
      script: "npm run start",
      cwd: "./",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
