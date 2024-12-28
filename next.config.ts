import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
}
export default withPWA({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
})(nextConfig)