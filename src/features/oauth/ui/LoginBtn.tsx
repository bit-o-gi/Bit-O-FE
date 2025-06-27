'use client'

import { ROUTES } from '@/shared/config'
import { TextButton } from '@/shared/ui'
import { useRouter } from 'next/navigation'

export default function LoginButton() {
  const router = useRouter()
  return (
    <TextButton
      className="text-deepbrown text-2xl font-thin"
      title="로그인하기"
      onClick={() => router.push(ROUTES.LOGIN)}
    />
  )
}
