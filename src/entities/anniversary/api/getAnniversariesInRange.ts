import { gql } from '@apollo/client'

export const GET_ANNIVERSARIES_IN_RANGE = gql`
  query GetAnniversariesInRange($startDate: String, $endDate: String, $page: Int!, $size: Int!) {
    getAnniversariesInRange(startDate: $startDate, endDate: $endDate, page: $page, size: $size) {
      id
      title
      anniversaryDate
    }
  }
`
