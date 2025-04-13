'use client'

import { getCoupleInfo } from '@/entities/couple'
import { userApi } from '@/entities/userInfo'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function MainPage() {
  const router = useRouter()

  const checkLoggedInUser = async () => {
    const user = await userApi()
    if (user) {
      const couple = await getCoupleInfo()
      if (couple) {
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
  }, [])
  return null
}
