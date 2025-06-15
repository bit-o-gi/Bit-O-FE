'use client'

import { useCoupleInfoStore, useRefetchCoupleInfo } from '@/entities/couple'
import { useRefetchUserInfo } from '@/entities/userInfo/hooks/useRefetchUserInfo'
import { ROUTES } from '@/shared/config'
import useUserInfoStore from '@/entities/userInfo/model/userInfoStore'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LOGGEDOUT_ROUTES = [ROUTES.LOGIN, ROUTES.ONBOARDING]
const LOGGEDIN_ROUTES = [ROUTES.ONBOARDING]
const COUPLE_ROUTES = [ROUTES.CALENDAR, ROUTES.DDAY, ROUTES.SETTING]
const SINGLE_ROUTES = [ROUTES.CONNECT, ROUTES.CONNECT_CREATE_COUPLE, ROUTES.CONNECT_INSERT_CODE]

export function UserStateRouter() {
  const router = useRouter()
  const currentPathname = usePathname()

  const { refetch: refetchUser } = useRefetchUserInfo()
  const { refetch: refetchCouple } = useRefetchCoupleInfo()

  const { userInfo } = useUserInfoStore()
  const { coupleInfo } = useCoupleInfoStore()

  const [isRefetched, setIsRefetched] = useState<boolean>(false)

  useEffect(() => {
    if (!isRefetched) return

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
  }, [currentPathname, userInfo, coupleInfo, isRefetched])

  useEffect(() => {
    //앱 최초 진입 또는 새로고침 시 로그인 정보 확인
    const fetchUserData = async () => {
      await refetchUser()
      await refetchCouple()
      setIsRefetched(true)
    }
    fetchUserData()
  }, [])

  return null
}
