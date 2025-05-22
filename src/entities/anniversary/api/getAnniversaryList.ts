import { gql } from '@apollo/client'

export const GET_ANNIVERSARY_LIST = gql`
  query GetAnniversaryList($memberId: ID!) {
    getListAnniversary(memberId: $memberId) {
      id
      title
      anniversaryDate
    }
  }
`
