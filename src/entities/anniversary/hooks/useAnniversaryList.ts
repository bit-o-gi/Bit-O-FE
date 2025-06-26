import { useQuery } from '@apollo/client'
import { GET_ANNIVERSARY_LIST } from '../api/getAnniversaryList'
import { Anniversary } from '../model/types'

export const useAnniversaryList = (memberId?: number) => {
  const { data, loading, error } = useQuery<Anniversary[]>(GET_ANNIVERSARY_LIST, {
    skip: !memberId,
    variables: {
      memberId,
    },
  })
  return { data, loading, error }
}
