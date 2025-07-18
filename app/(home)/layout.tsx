import { HomeRouter } from '@/app/route-guards'
import { HomeLayout } from '@/views/home'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HomeRouter />
      <HomeLayout>{children}</HomeLayout>
    </>
  )
}
