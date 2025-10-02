import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  eslint: {
    // 빌드 시 ESLint 에러로 실패하지 않도록 무시
    ignoreDuringBuilds: true,
  },
  appDir: true,
}

const pwaConfig = withPWA({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
})

export default pwaConfig(nextConfig)
