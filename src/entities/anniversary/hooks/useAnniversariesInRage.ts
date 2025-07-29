import { useQuery } from '@apollo/client'
import { GET_ANNIVERSARIES_IN_RANGE } from '../api/getAnniversariesInRange'
import { Anniversary } from '../model/types'

export const useAnniversariesInRange = (
  page: number,
  size: number,
  startDate?: string,
  endDate?: string,
) =>
  useQuery<Anniversary[]>(GET_ANNIVERSARIES_IN_RANGE, {
    variables: {
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
      page,
      size,
    },
    fetchPolicy: 'cache-and-network',
  })
