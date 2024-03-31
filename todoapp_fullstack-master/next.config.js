/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
module.exports = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
module.exports = nextConfig;

