import { useState } from 'react'
import { coupleApi } from '../api/coupleApi'
import { useCoupleInfoStore } from '../model/coupleInfoStore'

export const useRefetchCoupleInfo = () => {
  const { setCoupleInfo } = useCoupleInfoStore()
  const [isLoading, setIsLoading] = useState(false)

  const refetch = async () => {
    setIsLoading(true)
    const couple = await coupleApi.getCoupleInfo()
    setCoupleInfo(couple)
    setIsLoading(false)
  }

  return { refetch, isLoading }
}
