'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'

interface HeaderProps {
  title: string
  hasBack?: boolean
  actions?: {
    icon: ReactElement
    title: string
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
        <button title="뒤로 이동" onClick={handleBackClick}>
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}
      <p className="text-xl font-semibold text-center flex-grow">{title}</p>

      <div className="flex absolute right-5 gap-x-2">
        {actions &&
          actions.length > 0 &&
          actions.map(({ icon, title, action }, idx) => (
            <button key={idx} title={title} onClick={action}>
              {icon}
            </button>
          ))}
      </div>
    </div>
  )
}
