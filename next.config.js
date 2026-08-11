/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://car-rental-server-phi-rosy.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;