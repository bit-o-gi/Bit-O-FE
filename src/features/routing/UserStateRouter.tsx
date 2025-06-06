'use client'

import { useCoupleInfoStore, useRefetchCoupleInfo } from '@/entities/couple'
import { useRefetchUserInfo } from '@/entities/userInfo/hooks/useRefetchUserInfo'
import { useNavigater } from '@/shared/lib'
import useUserInfoStore from '@/store/userInfoStore'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const LOGGEDOUT_ROUTES = ['/login', '/onboarding']
const LOGGEDIN_ROUTES = ['/onboarding']
const COUPLE_ROUTES = ['/calendar', '/dday', '/setting']
const SINGLE_ROUTES = ['/connect', '/connect/create-couple', '/connect/insert-code']

export function UserStateRouter() {
  const currentPathname = usePathname()
  const { navigateLogin, navigateCalendar, navigateConnect } = useNavigater()

  const { refetch: refetchUser } = useRefetchUserInfo()
  const { refetch: refetchCouple } = useRefetchCoupleInfo()

  const { userInfo } = useUserInfoStore()
  const { coupleInfo } = useCoupleInfoStore()

  const [isRefetched, setIsRefetched] = useState<boolean>(false)

  useEffect(() => {
    if (!isRefetched) return

    if (!userInfo && !LOGGEDOUT_ROUTES.some((route) => currentPathname.startsWith(route))) {
      navigateLogin({ replace: true })
    }
    if (
      userInfo &&
      coupleInfo &&
      ![...LOGGEDIN_ROUTES, ...COUPLE_ROUTES].some((route) => currentPathname.startsWith(route))
    ) {
      navigateCalendar({ replace: true })
    }
    if (
      userInfo &&
      !coupleInfo &&
      ![...LOGGEDIN_ROUTES, ...SINGLE_ROUTES].some((route) => currentPathname.startsWith(route))
    ) {
      navigateConnect({ replace: true })
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
