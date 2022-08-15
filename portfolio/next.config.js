/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  webpack: (config, { dev }) => {
    return {
      ...config,
    };
  },
};

module.exports = nextConfig;
