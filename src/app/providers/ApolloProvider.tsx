import { apolloClient } from '@/shared/api'
import { ApolloProvider as ApolloClientProvider } from '@apollo/client'

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloClientProvider client={apolloClient}>{children}</ApolloClientProvider>
}
