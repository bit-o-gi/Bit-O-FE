'use client'

import { ROUTES } from '@/shared/config'
import { useNavigater } from '@/shared/lib'
import { useRouter } from 'next/navigation'

const UseLoginOauth = () => {
  const router = useRouter()
  const { navigateToKakaoAuth } = useNavigater()

  const loginController = () => {
    const cookies = document.cookie
    const refreshToken = cookies.split('refresh_token=')[1]
    if (refreshToken) {
      router.push(ROUTES.ONBOARDING)
    } else {
      navigateToKakaoAuth()
    }
  }
  return { loginController }
}

export default UseLoginOauth
