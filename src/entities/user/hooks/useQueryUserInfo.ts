import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../api/userApi'
import { localStorageUtil } from '@/shared/lib'
import { ACCESS_TOKEN_KEY } from '@/shared/config'

const USER_INFO_QUERYKEY = ['user-info'] as const

export const useQueryUserInfo = () => {
  const queryClient = useQueryClient()
  const accessToken = localStorageUtil.get(ACCESS_TOKEN_KEY)

  return {
    invalidate: () => queryClient.invalidateQueries({ queryKey: USER_INFO_QUERYKEY }),
    ...useQuery({
      queryKey: USER_INFO_QUERYKEY,
      queryFn: userApi.getUserInfo,
      enabled: !!accessToken,
    }),
  }
}
