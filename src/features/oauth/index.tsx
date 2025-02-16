import { useNavigater } from '@/shared/lib'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import UseLoginOauth from './lib/useLoginOauth'
import LoginKakaoBtn from './ui/loginKakaoBtn'

const Oauth = () => {
  const { loginController } = UseLoginOauth()
  const { navigateOnboarding } = useNavigater()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('token')
    if (accessToken) {
      localStorage.setItem('access_token', accessToken)
      navigateOnboarding()
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
