'use client'

import { ROUTES } from '@/shared/config'
import { TextButton } from '@/shared/ui'
import { useRouter } from 'next/navigation'

export const LoginButton = () => {
  const router = useRouter()

  const goToLogin = () => {
    router.push(ROUTES.LOGIN)
  }

  return (
    <TextButton
      className="text-deepbrown text-2xl font-thin"
      title="로그인하기"
      onClick={goToLogin}
    />
  )
}
