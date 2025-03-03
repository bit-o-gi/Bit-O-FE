import { baseURL } from '@/shared/api'
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
    // router.push 클라이언트 사이드 내비게이션 기능으로 절대 URL 리다이렉트인 location.href으로 변경
    // router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`)
    window.location.href = `${baseURL}/oauth2/authorization/kakao`
  }

  return { navigateLogin, navigateOnboarding, navigateToKakaoAuth }
}
