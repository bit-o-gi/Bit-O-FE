'use client'

import { useNavigater } from '@/shared/lib'

const UseLoginOauth = () => {
  const { navigateOnboarding, navigateToKakaoAuth } = useNavigater()

  const loginController = () => {
    const cookies = document.cookie
    const refreshToken = cookies.split('refresh_token=')[1]
    if (refreshToken) {
      navigateOnboarding()
    } else {
      navigateToKakaoAuth()
    }
  }
  return { loginController }
}

export default UseLoginOauth
