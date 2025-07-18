'use client'

import { ACCESS_TOKEN_KEY, ROUTES } from '@/shared/config'
import { localStorageUtil } from '@/shared/lib'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useOauthLoginCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('token')
    if (accessToken) {
      localStorageUtil.set(ACCESS_TOKEN_KEY, accessToken)
      router.replace(ROUTES.ONBOARDING)
    }
  }, [])
}
