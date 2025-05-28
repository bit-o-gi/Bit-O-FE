import { baseURL } from '@/shared/api'
export function useNavigater() {
  return {
    navigateToKakaoAuth: () => {
      // router.push 클라이언트 사이드 내비게이션 기능으로 절대 URL 리다이렉트인 location.href으로 변경
      // router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`)
      window.location.href = `${baseURL}/oauth2/authorization/kakao`
    },
  }
}
