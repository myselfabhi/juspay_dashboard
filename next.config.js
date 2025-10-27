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
    // Disable image optimization for static assets
    unoptimized: true,
    // Allow all domains
    domains: [],
  },
  // Ensure static files are properly served
  trailingSlash: false,
  // Optimize static file serving
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure public directory is included
  assetPrefix: '',
}

module.exports = nextConfig
