import { useQuery } from '@apollo/client'
import { GET_ANNIVERSARIES_IN_RANGE } from '../api/getAnniversariesInRange'
import { AnniversaryPreview } from '../model/types'

export const useAnniversariesInRange = (
  page: number,
  size: number,
  startDate?: string,
  endDate?: string,
) =>
  useQuery<{ getAnniversariesInRange: AnniversaryPreview[] }>(GET_ANNIVERSARIES_IN_RANGE, {
    variables: {
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
      page,
      size,
    },
    fetchPolicy: 'cache-and-network',
  })
