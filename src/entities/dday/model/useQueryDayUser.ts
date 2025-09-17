import { useQuery } from '@tanstack/react-query'
import { ddayApi } from '@/entities/dday'

export const useQueryDayUser = (isCouple: boolean) =>
  useQuery({
    queryKey: ['get-day-user'],
    enabled: isCouple,
    queryFn: () => ddayApi.getDdayByUser(),
  })
