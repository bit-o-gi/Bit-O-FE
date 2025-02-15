import type { Metadata, Viewport } from 'next'
import 'react-datepicker/dist/react-datepicker.css'
import './globals.css'
import Providers from '../src/app/providers'
import { Layout } from '@/shared/ui'
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
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
