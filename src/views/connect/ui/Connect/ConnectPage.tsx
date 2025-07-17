'use client'

import { BaseButton } from '@/shared/ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function ConnectPage() {
  const router = useRouter()

  const handleCreateCoupleButtonClick = () => {
    router.push('/connect/create-couple')
  }
  const handleInsertCodeButtonClick = () => {
    router.push('/connect/insert-code')
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image height={192} width={192} src="/images/logo/icon_192.png" alt="logo" />
      <p className="mt-16 text-lg">BitO 시작하기</p>
      <div className="mt-8 px-12 w-full">
        <BaseButton
          title="커플 생성하기"
          className="bg-brown text-white"
          onClick={handleCreateCoupleButtonClick}
        />
      </div>
      <div className="mt-2 px-12 w-full">
        <BaseButton
          title="코드 입력하기"
          className="border border-brown"
          onClick={handleInsertCodeButtonClick}
        />
      </div>
    </div>
  )
}
