import { useState } from 'react'
import { userApi } from '../api/userApi'
import { useUserInfoStore } from '../model/userInfoStore'

export const useRefetchUserInfo = () => {
  const { setUserInfo } = useUserInfoStore()
  const [isLoading, setIsLoading] = useState(false)

  const refetch = async () => {
    setIsLoading(true)
    const user = await userApi.getUserInfo()
    setUserInfo(user)
    setIsLoading(false)
  }

  return { refetch, isLoading }
}
