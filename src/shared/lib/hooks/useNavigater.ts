import { useRouter } from 'next/navigation'

export function useNavigater() {
  const router = useRouter()

  const navigateLogin = () => {
    router.push('/login')
  }

  const navigateOnboarding = () => {
    router.push('/onboarding')
  }

  const navigateToKakaoAuth = () => {
    router.push('http://localhost:8080/oauth2/authorization/kakao')
  }

  return { navigateLogin, navigateOnboarding, navigateToKakaoAuth }
}
