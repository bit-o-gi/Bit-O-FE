'use client'

import { REFRESH_TOKEN_KEY, ROUTES } from '@/shared/config'
import { cookiesUtil, useNavigater } from '@/shared/lib'
import { useRouter } from 'next/navigation'

export const useOauthLogin = () => {
  const router = useRouter()
  const { navigateToKakaoAuth } = useNavigater()

  const handleKakaoLogin = () => {
    const refreshToken = cookiesUtil.get(REFRESH_TOKEN_KEY)
    if (refreshToken) {
      router.replace(ROUTES.ONBOARDING)
    } else {
      navigateToKakaoAuth()
    }
  }
  return { handleKakaoLogin }
}
