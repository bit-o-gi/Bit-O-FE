import { HomeRouter } from '@/features/routing/HomeRouter'

export function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HomeRouter />
      {children}
    </>
  )
}
