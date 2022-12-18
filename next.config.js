/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['scontent-eze1-1.xx.fbcdn.net']
  },
  experimental: {
    appDir: true
  },
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

module.exports = nextConfig
