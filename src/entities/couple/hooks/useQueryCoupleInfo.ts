import { useQuery, useQueryClient } from '@tanstack/react-query'
import { localStorageUtil } from '@/shared/lib'
import { ACCESS_TOKEN_KEY } from '@/shared/config'
import { coupleApi } from '../api/coupleApi'

const COUPLE_INFO_QUERYKEY = ['couple-info'] as const

export const useQueryCoupleInfo = () => {
  const queryClient = useQueryClient()
  const accessToken = localStorageUtil.get(ACCESS_TOKEN_KEY)

  return {
    invalidate: () => queryClient.invalidateQueries({ queryKey: COUPLE_INFO_QUERYKEY }),
    ...useQuery({
      queryKey: COUPLE_INFO_QUERYKEY,
      queryFn: coupleApi.getCoupleInfo,
      enabled: !!accessToken,
    }),
  }
}
