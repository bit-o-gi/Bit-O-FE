'use client'

import { getCoupleInfo, useCoupleInfoStore } from '@/entities/couple'
import { userApi, useUserInfoStore } from '@/entities/userInfo'
import { NavigationBar, ToastManager } from '@/shared/ui'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const LOGGEDOUT_ROUTES = ['/login', '/onboarding']
const LOGGEDIN_ROUTES = ['/onboarding']
const COUPLE_ROUTES = ['/calendar', '/dday', '/setting']
const SINGLE_ROUTES = ['/connect', '/connect/create-couple', '/connect/insert-code']

interface LayoutProps {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { userInfo, setUserInfo, resetUserInfo } = useUserInfoStore()
  const { coupleInfo, setCoupleInfo, resetCoupleInfo } = useCoupleInfoStore()

  /** Navigation Bar가 보일 주요 메인 페이지 */
  const pagesWithNav = ['/calendar', '/dday', '/setting']

  const showNav = pagesWithNav.some((path) => {
    return pathname === path
  })

  useEffect(() => {
    //앱 최초 진입 시 로그인 정보 확인
    const fetchUserData = async () => {
      try {
        const user = await userApi()
        setUserInfo(user)
        const couple = await getCoupleInfo()
        setCoupleInfo(couple)
      } catch {
        resetUserInfo()
        resetCoupleInfo()
      }
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    if (!userInfo && !LOGGEDOUT_ROUTES.includes(pathname)) router.replace('/login')
    if (userInfo && coupleInfo && ![...LOGGEDIN_ROUTES, ...COUPLE_ROUTES].includes(pathname))
      router.replace('/calendar')
    if (userInfo && !coupleInfo && ![...LOGGEDIN_ROUTES, ...SINGLE_ROUTES].includes(pathname))
      router.replace('/connect')
  }, [router, pathname, userInfo, coupleInfo])

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
