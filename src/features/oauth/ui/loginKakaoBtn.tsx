import Image from 'next/image'

const LoginKakaoBtn = ({ handler }: { handler: () => void }) => {
  return (
    <div className="mt-4 mb-10 cursor-pointer" onClick={handler}>
      <Image width={340} height={52} src={'/images/icon/kakaoBtn.svg'} alt="카카오톡-로그인-버튼" />
    </div>
  )
}

export default LoginKakaoBtn
