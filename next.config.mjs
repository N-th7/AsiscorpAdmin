/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL || "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || "localhost",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || "",
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATH || "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
