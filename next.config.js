/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  // Ensure static files are properly served
  trailingSlash: false,
  // Optimize static file serving
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
