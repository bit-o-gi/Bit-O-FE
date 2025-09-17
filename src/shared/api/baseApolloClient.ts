import {
  ApolloClient,
  ApolloLink,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { ACCESS_TOKEN_KEY, baseURL, REFRESH_TOKEN_KEY } from '../config'
import { cookiesUtil, localStorageUtil } from '../lib'
import { instance } from './baseAxiosInstance'

const httpLink = new HttpLink({ uri: `${baseURL}/graphql` })

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorageUtil.get(ACCESS_TOKEN_KEY)

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers, // 기존 헤더 유지
      Authorization: token ? `Bearer ${token}` : '',
    },
  }))

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        const refreshToken = cookiesUtil.get(REFRESH_TOKEN_KEY)
        if (!refreshToken) {
          localStorageUtil.remove(ACCESS_TOKEN_KEY)
        }

        return fromPromise(
          instance
            .post('auth/token', {
              refreshToken,
            })
            .then((res) => {
              const { accessToken } = res.data
              localStorageUtil.set(ACCESS_TOKEN_KEY, accessToken)

              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers, // 기존 헤더 유지
                  Authorization: accessToken ? `Bearer ${accessToken}` : '',
                },
              }))

              return forward(operation)
            })
            .catch(() => {
              localStorageUtil.remove(ACCESS_TOKEN_KEY)
            }),
        ).flatMap(() => forward(operation)!)
      }
    }
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})
