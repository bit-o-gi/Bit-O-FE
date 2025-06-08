'use client'

import LoginButton from '@/features/oauth/ui/LoginBtn'
import { BaseHeader } from '@/shared/ui'

export function SettingsPage() {
  return (
    <>
      <BaseHeader title="설정" />
      <div className="px-4 flex flex-col items-start">
        <div>
          <LoginButton />
        </div>
      </div>
    </>
  )
}
