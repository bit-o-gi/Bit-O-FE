import { useState } from 'react'
import { getUserInfo } from '../api/userApi'
import useUserInfoStore from '@/store/userInfoStore'

export const useRefetchUserInfo = () => {
  const { setUserInfo } = useUserInfoStore()
  const [isLoading, setIsLoading] = useState(false)

  const refetch = async () => {
    setIsLoading(true)
    const user = await getUserInfo()
    setUserInfo(user)
    setIsLoading(false)
  }

  return { refetch, isLoading }
}
