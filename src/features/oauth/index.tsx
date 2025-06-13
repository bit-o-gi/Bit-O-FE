import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import UseLoginOauth from './lib/useLoginOauth'
import LoginKakaoBtn from './ui/loginKakaoBtn'
import { useRouter } from 'next/navigation'
import { ACCESS_TOKEN_KEY, ROUTES } from '@/shared/config'
import { setLocalStorage } from '@/shared/lib'

const Oauth = () => {
  const router = useRouter()
  const { loginController } = UseLoginOauth()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('token')
    if (accessToken) {
      setLocalStorage(ACCESS_TOKEN_KEY, accessToken)
      router.replace(ROUTES.ONBOARDING)
    }
  }, [])

  return (
    <div className="text-center">
      <LoginKakaoBtn handler={loginController} />
      <div>
        <div className="underline text-sm text-gray-300">다른 이메일로 시작하기</div>
      </div>
    </div>
  )
}

export default Oauth
