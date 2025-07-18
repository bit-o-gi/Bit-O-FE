import { LoginKakaoButton } from './LoginKakaoButton'

export const LoginMethods = () => {
  return (
    <div className="text-center">
      <LoginKakaoButton />
      <div>
        <div className="underline text-sm text-gray-300">다른 이메일로 시작하기</div>
      </div>
    </div>
  )
}
