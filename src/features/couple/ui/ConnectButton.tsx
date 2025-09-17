'use client'

import { ROUTES } from '@/shared/config'
import { TextButton } from '@/shared/ui'
import { useRouter } from 'next/navigation'

export const ConnectButton = () => {
  const router = useRouter()

  const goToConnect = () => {
    router.push(ROUTES.CONNECT)
  }

  return (
    <TextButton
      className="text-deepbrown text-2xl font-thin"
      title="커플 연결하기"
      onClick={goToConnect}
    />
  )
}
