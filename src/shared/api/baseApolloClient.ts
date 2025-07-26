import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { baseURL } from '../config'

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${baseURL}/graphql`,
  }),
  cache: new InMemoryCache(),
})
