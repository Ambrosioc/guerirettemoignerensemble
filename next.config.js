/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'images.pexels.com',
      '127.0.0.1',
      'localhost'
    ],
  },
}

module.exports = nextConfig 