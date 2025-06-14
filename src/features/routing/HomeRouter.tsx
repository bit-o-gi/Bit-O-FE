'use client'

import { LOGIN_SUCCESS, ROUTES } from '@/shared/config'
import { sessionStorageUtil } from '@/shared/lib'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function HomeRouter() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 로그인 성공하고 되돌아올 때 캘린더 화면으로 이동
    const isLoginSuccess = sessionStorageUtil.get(LOGIN_SUCCESS) === 'true'
    const isCalanderPage = pathname === ROUTES.CALENDAR
    if (isLoginSuccess && !isCalanderPage) {
      router.replace(ROUTES.CALENDAR)
    }
    sessionStorageUtil.remove(LOGIN_SUCCESS)
  }, [router, pathname])

  return null
}
