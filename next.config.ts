import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Clerk requires this for middleware
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

export default nextConfig
