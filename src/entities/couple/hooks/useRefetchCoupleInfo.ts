import { useState } from 'react'
import { getCoupleInfo } from '../api/coupleApi'
import { useCoupleInfoStore } from '../model/coupleInfoStore'

export const useRefetchCoupleInfo = () => {
  const { setCoupleInfo } = useCoupleInfoStore()
  const [isLoading, setIsLoading] = useState(false)

  const refetch = async () => {
    setIsLoading(true)
    const couple = await getCoupleInfo()
    setCoupleInfo(couple)
    setIsLoading(false)
  }

  return { refetch, isLoading }
}
