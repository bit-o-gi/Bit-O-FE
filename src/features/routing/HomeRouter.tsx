'use client'

import { LOGIN_SUCCESS, ROUTES } from '@/shared/config'
import { getSessionStorage, removeSessionStorage } from '@/shared/lib'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function HomeRouter() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 로그인 성공하고 되돌아올 때 캘린더 화면으로 이동
    const isLoginSuccess = getSessionStorage(LOGIN_SUCCESS) === 'true'
    const isCalanderPage = pathname === ROUTES.CALENDAR
    if (isLoginSuccess && !isCalanderPage) {
      router.replace(ROUTES.CALENDAR)
    }
    removeSessionStorage(LOGIN_SUCCESS)
  }, [router, pathname])

  return null
}
