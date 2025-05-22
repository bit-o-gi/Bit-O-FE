import { baseURL } from '@/shared/config'
import { useRouter } from 'next/navigation'

export function useNavigater() {
  const router = useRouter()

  const navigateToPath = (replace: boolean, path: string) => {
    if (replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  }

  return {
    navigateCalendar: (option: { replace: boolean } = { replace: false }) =>
      navigateToPath(option.replace, '/calendar'),
    navigateAddCalendar: (option: { replace: boolean } = { replace: false }) =>
      navigateToPath(option.replace, '/calendar/add/new'),
    navigateLogin: (option: { replace: boolean } = { replace: false }) =>
      navigateToPath(option.replace, '/login'),
    navigateOnboarding: (option: { replace: boolean } = { replace: false }) =>
      navigateToPath(option.replace, '/onboarding'),
    navigateConnect: (option: { replace: boolean } = { replace: false }) =>
      navigateToPath(option.replace, '/connect'),
    navigateToUpdateCalendar: (
      planId: number,
      option: { replace: boolean } = { replace: false },
    ) => {
      navigateToPath(option.replace, `/calendar/add/${planId}`)
    },
    navigateToKakaoAuth: () => {
      // router.push 클라이언트 사이드 내비게이션 기능으로 절대 URL 리다이렉트인 location.href으로 변경
      // router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`)
      window.location.href = `${baseURL}/oauth2/authorization/kakao`
    },
  }
}
