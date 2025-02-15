'use client'

import { NavigationBar } from '@/shared/ui'
import { usePathname } from 'next/navigation'

import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname()

  /** Navigation Bar가 보일 주요 메인 페이지 */
  const pagesWithNav = ['/calendar', '/dday', '/setting']

  const showNav = pagesWithNav.some((path) => {
    return pathname === path
  })

  return (
    <div className="flex w-full h-full bg-gray-100">
      <div className="mx-auto h-auto w-full min-w-[280px] max-w-[33.75rem]">
        {/* <div className="flex min-h-[100vh] w-full flex-col items-stretch justify-start bg-white"> */}
        <div className="flex min-h-[100vh] h-full w-full flex-col items-stretch justify-start bg-white">
          {children}
        </div>
        {showNav && <NavigationBar />}
      </div>
    </div>
  )
}
