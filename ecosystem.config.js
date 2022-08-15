module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "npm",
      args: "start",
      cwd: "portfolio",
      env: {
        NODE_ENV: "production",
        PORT: 14000,
      },
    },
    {
      name: "cms",
      script: "yarn",
      args: "start",
      cwd: "cms",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
