'use client'

import { useQueryCoupleInfo } from '@/entities/couple/hooks/useQueryCoupleInfo'
import { useQueryUserInfo } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LOGGEDOUT_ROUTES = [ROUTES.LOGIN, ROUTES.ONBOARDING]
const LOGGEDIN_ROUTES = [ROUTES.ONBOARDING]
const COUPLE_ROUTES = [ROUTES.CALENDAR, ROUTES.DDAY, ROUTES.SETTINGS]
const SINGLE_ROUTES = [ROUTES.CONNECT, ROUTES.CONNECT_CREATE_COUPLE, ROUTES.CONNECT_INSERT_CODE]

export function UserStateRouter() {
  const router = useRouter()
  const currentPathname = usePathname()

  const { data: userInfo } = useQueryUserInfo()
  const { data: coupleInfo } = useQueryCoupleInfo()

  useEffect(() => {
    if (!userInfo && !LOGGEDOUT_ROUTES.some((route) => currentPathname.startsWith(route))) {
      router.replace(ROUTES.LOGIN)
      return
    }
    if (
      userInfo &&
      coupleInfo &&
      ![...LOGGEDIN_ROUTES, ...COUPLE_ROUTES].some((route) => currentPathname.startsWith(route))
    ) {
      router.replace(ROUTES.CALENDAR)
      return
    }
    if (
      userInfo &&
      !coupleInfo &&
      ![...LOGGEDIN_ROUTES, ...SINGLE_ROUTES].some((route) => currentPathname.startsWith(route))
    ) {
      router.replace(ROUTES.CONNECT)
      return
    }
  }, [currentPathname, userInfo, coupleInfo])

  return null
}
