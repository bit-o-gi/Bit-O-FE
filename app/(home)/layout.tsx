import { HomeLayout } from '@/views/home'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HomeLayout>{children}</HomeLayout>
}
