// 'use client'

import { ACCESS_TOKEN_KEY } from '@/shared/config'
import { useToast, localStorageUtil } from '@/shared/lib'

export function useRequireAuth() {
  const toast = useToast()

  const requireAuth = (callback: () => void): (() => void) => {
    const accessToken = localStorageUtil.get(ACCESS_TOKEN_KEY)

    return () => {
      if (accessToken) callback()
      else toast.shortWarning('로그인이 필요한 기능입니다.')
    }
  }

  return requireAuth
}
