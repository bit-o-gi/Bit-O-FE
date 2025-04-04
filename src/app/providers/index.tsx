import { KakaoProvider } from './KakaoProvider'
import { QueryProvider } from './QueryProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <KakaoProvider />
      {children}
    </QueryProvider>
  )
}
