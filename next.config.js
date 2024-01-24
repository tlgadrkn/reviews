/** @type {import('next').NextConfig} */

const url = new URL(process.env.CMS_URL);
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port,
      },
    ],
  },
};

module.exports = nextConfig;
