import { ApolloClient, InMemoryCache } from '@apollo/client'
import { baseURL } from '../config'

export const apolloClient = new ApolloClient({
  uri: `${baseURL}/graphql`,
  cache: new InMemoryCache(),
})
