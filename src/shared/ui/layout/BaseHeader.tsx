'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface HeaderProps {
  title: string
  backIcon?: boolean
  nextIcon?: ReactNode
}

/**
 * 기본 헤더 컴포넌트
 * 옵션 : 뒤로가기 버튼, 다음 커스텀 버튼
 */
export const BaseHeader = ({ title, backIcon, nextIcon }: HeaderProps) => {
  const router = useRouter()

  const handleBackIcon = () => {
    router.back()
  }
  return (
    <div className="flex px-[1.5rem] py-[1rem] sticky top-0 left-0 right-0 bg-white items-center">
      {/** 뒤로가기  */}
      {backIcon && (
        <Image
          className="rotate-180 absolute left-[1rem] cursor-pointer"
          alt="couble_right"
          src="/images/icon/arrow.png"
          width={30}
          height={30}
          onClick={handleBackIcon}
        />
      )}
      <p className="text-[1rem] font-semibold text-center flex-grow">{title}</p>

      {nextIcon && nextIcon}
    </div>
  )
}
