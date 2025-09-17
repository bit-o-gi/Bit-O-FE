import { ApolloProvider } from './ApolloProvider'
import { KakaoProvider } from './KakaoProvider'
import { QueryProvider } from './QueryProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ApolloProvider>
        <KakaoProvider />
        {children}
      </ApolloProvider>
    </QueryProvider>
  )
}
