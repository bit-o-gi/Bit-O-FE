'use client'

import { ROUTES } from '@/shared/config'
import { NavigationBar, ToastManager } from '@/shared/ui'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  const currentPathname = usePathname()

  /** Navigation Bar가 보일 주요 메인 페이지 */
  const pagesWithNav = [ROUTES.CALENDAR, ROUTES.DDAY, ROUTES.SETTING]
  const showNav = pagesWithNav.includes(currentPathname)

  return (
    <div className="flex w-full h-full bg-gray-100">
      <div className="mx-auto h-auto w-full min-w-[280px] max-w-[33.75rem] relative">
        {/* <div className="flex min-h-[100vh] w-full flex-col items-stretch justify-start bg-white"> */}
        <ToastManager />
        <div className="flex min-h-[100vh] h-full w-full flex-col items-stretch justify-start bg-white z-0">
          {children}
        </div>
        {showNav && <NavigationBar />}
      </div>
    </div>
  )
}
