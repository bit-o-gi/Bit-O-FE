import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
}
export default withPWA({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
})(nextConfig)

module.exports = {
  experimental: {
    appDir: true, // App Router 사용
  },
}
