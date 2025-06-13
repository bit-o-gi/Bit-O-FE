'use client'

import { REFRESH_TOKEN_KEY, ROUTES } from '@/shared/config'
import { getCookie, useNavigater } from '@/shared/lib'
import { useRouter } from 'next/navigation'

const UseLoginOauth = () => {
  const router = useRouter()
  const { navigateToKakaoAuth } = useNavigater()

  const loginController = () => {
    const refreshToken = getCookie(REFRESH_TOKEN_KEY)
    if (refreshToken) {
      router.replace(ROUTES.ONBOARDING)
    } else {
      navigateToKakaoAuth()
    }
  }
  return { loginController }
}

export default UseLoginOauth
