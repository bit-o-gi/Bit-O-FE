'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  title: string
  hasBack?: boolean
  actions?: {
    src: string
    alt: string
    action: () => void
  }[]
}

/**
 * 기본 헤더 컴포넌트
 * 옵션 : 뒤로가기 버튼, 다음 커스텀 버튼
 */
export const BaseHeader = ({ title, hasBack, actions }: HeaderProps) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }
  return (
    <div className="flex px-[1.5rem] py-[1rem] sticky top-0 left-0 right-0 bg-white items-center">
      {/** 뒤로가기  */}
      {hasBack && (
        <Image
          className="rotate-180 absolute left-[1rem] cursor-pointer"
          alt="back arrow"
          src="/images/icon/arrow.png"
          width={30}
          height={30}
          onClick={handleBackClick}
        />
      )}
      <p className="text-[1rem] font-semibold text-center flex-grow">{title}</p>

      {actions &&
        actions.length > 0 &&
        actions.map(({ src, alt, action }, idx) => (
          <Image
            key={idx}
            className="cursor-pointer absolute right-[1rem]"
            alt={alt}
            src={src}
            onClick={action}
          />
        ))}
    </div>
  )
}
