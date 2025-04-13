'use client'

import { useCoupleInfoStore } from '@/entities/couple'
import { useUserInfoStore } from '@/entities/userInfo'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function MainPage() {
  const { userInfo } = useUserInfoStore()
  const { coupleInfo } = useCoupleInfoStore()
  const router = useRouter()

  const checkLoggedInUser = async () => {
    if (userInfo) {
      if (coupleInfo) {
        router.replace('/calendar')
      } else {
        router.replace('/connect')
      }
    } else {
      router.replace('/login')
    }
  }

  useEffect(() => {
    checkLoggedInUser()
  }, [userInfo, coupleInfo])
  return null
}
