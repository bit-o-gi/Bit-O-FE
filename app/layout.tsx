import type { Metadata, Viewport } from 'next'
import 'react-datepicker/dist/react-datepicker.css'
import './globals.css'
import Providers from '../src/app/providers'
import { Layout } from '@/shared/ui'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'BitO',
  description: '커플앱',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/images/logo/icon_32.png', sizes: '32x32' },
    { rel: 'icon', url: '/images/logo/icon_48.png', sizes: '48x48' },
    { rel: 'icon', url: '/images/logo/icon_72.png', sizes: '72x72' },
    { rel: 'icon', url: '/images/logo/icon_96.png', sizes: '96x96' }, // iOS devices
    { rel: 'icon', url: '/images/logo/icon_128.png', sizes: '128x128' },
    { rel: 'apple-touch-icon', url: '/images/logo/icon_180.png', sizes: '180x180' },
    { rel: 'icon', url: '/images/logo/icon_192.png', sizes: '192x192' }, // Android icon
    { rel: 'icon', url: '/images/logo/icon_256.png', sizes: '256x256' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        ></Script>
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
