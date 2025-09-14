'use client'

import { useLogout } from '@/entities/userInfo/hooks/useLogout'
import { useToast } from '@/shared/lib'
import { useState } from 'react'

interface LogoutButtonProps {
  className?: string
  children?: React.ReactNode
}

export function LogoutButton({ className = '', children }: LogoutButtonProps) {
  const { logout } = useLogout()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      await logout()
      // 로그아웃 성공 토스트 메시지 제거
    } catch (error) {
      toast.shortError('로그아웃 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? '로그아웃 중...' : (children || '로그아웃')}
    </button>
  )
}
