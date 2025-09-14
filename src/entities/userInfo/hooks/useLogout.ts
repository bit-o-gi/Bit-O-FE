'use client'

import { useRouter } from 'next/navigation'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROUTES } from '@/shared/config'
import { cookiesUtil, localStorageUtil } from '@/shared/lib'
import { logoutApi } from '../api/logoutApi'
import useUserInfoStore from '../model/userInfoStore'
import { useCoupleInfoStore } from '@/entities/couple'

export const useLogout = () => {
  const router = useRouter()
  const { resetUserInfo } = useUserInfoStore()
  const { resetCoupleInfo } = useCoupleInfoStore()

  const logout = () => {
    try {
      localStorageUtil.remove(ACCESS_TOKEN_KEY)
      cookiesUtil.remove(REFRESH_TOKEN_KEY)
      
      resetUserInfo()
      resetCoupleInfo()
      
      window.location.replace(ROUTES.CALENDAR)
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error)
      window.location.replace(ROUTES.CALENDAR)
    }
  }

  return { logout }
}
