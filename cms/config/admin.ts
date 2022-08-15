export default ({ env }) => ({
  url: env("ADMIN_URL", "http://localhost:1337/admin"),
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
});
