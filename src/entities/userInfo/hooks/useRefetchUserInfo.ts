import { useState } from 'react'
import { useUserInfoStore } from '../model/userInfoStore'
import { userApi } from '../api/userApi'

export const useRefetchUserInfo = () => {
  const { setUserInfo } = useUserInfoStore()
  const [isLoading, setIsLoading] = useState(false)

  const refetch = async () => {
    setIsLoading(true)
    const user = await userApi()
    setUserInfo(user)
    setIsLoading(false)
  }

  return { refetch, isLoading }
}
