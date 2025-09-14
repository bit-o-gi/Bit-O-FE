'use client'

import LoginButton from '@/features/oauth/ui/LoginBtn'
import { ACCESS_TOKEN_KEY } from '@/shared/config'
import { localStorageUtil } from '@/shared/lib'
import { BaseHeader } from '@/shared/ui'
import { useLogout } from '@/entities/userInfo/hooks/useLogout'
import { useEffect, useState } from 'react'

export function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { logout } = useLogout()

  useEffect(() => {
    const accessToken = localStorageUtil.get(ACCESS_TOKEN_KEY)
    setIsLoggedIn(Boolean(accessToken))
  }, [])

  return (
    <>
      <BaseHeader title="설정" />
      <div className="px-4 flex flex-col items-start">
        {!isLoggedIn && (
          <div>
            <LoginButton />
          </div>
        )} {
          <div className="flex flex-col gap-4">
            <div className="text-lg">유저 프로필</div>
            <button 
              onClick={logout}
              className="text-left text-lg font-normal text-black hover:text-red-600 transition-colors duration-200"
            >
              로그아웃
            </button>
          </div>
        }
      </div>
    </>
  )
}
