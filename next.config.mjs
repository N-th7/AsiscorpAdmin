/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.100.40.73",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
