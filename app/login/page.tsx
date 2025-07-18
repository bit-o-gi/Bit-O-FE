import { LoginPage } from '@/views/login'

export default function Page() {
  return <LoginPage />
}

// Suspense 사용 이유
// Suspense 경계 없이 검색 매개변수를 읽으면 useSearchParams()전체 페이지가 클라이언트 측 렌더링에 옵트인됩니다. 이로 인해 클라이언트 측 JavaScript가 로드될 때까지 페이지가 비어 있을 수 있습니다
// git issue (https://github.com/vercel/next.js/discussions/61654)
// 공식문서 내용 (https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
