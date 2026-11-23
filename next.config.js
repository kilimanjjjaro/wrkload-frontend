/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'wrkload.vercel.app' },
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ]
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  }
}

module.exports = nextConfig
