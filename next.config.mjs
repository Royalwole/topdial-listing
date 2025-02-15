/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Remove appDir as it's no longer needed in Next.js 14+
  },
  images: {
    domains: ['images.clerk.dev']
  }
};

export default nextConfig;
