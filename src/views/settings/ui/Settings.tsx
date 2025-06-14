'use client'

import LoginButton from '@/features/oauth/ui/LoginBtn'
import { ACCESS_TOKEN_KEY } from '@/shared/config'
import { localStorageUtil } from '@/shared/lib'
import { BaseHeader } from '@/shared/ui'
import { useEffect, useState } from 'react'

export function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
        )}
        {isLoggedIn && <div>유저 프로필</div>}
      </div>
    </>
  )
}
