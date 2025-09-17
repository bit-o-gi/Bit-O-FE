'use client'
import { BaseButton } from '@/shared/ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { sessionStorageUtil } from '@/shared/lib'
import { LOGIN_SUCCESS } from '@/shared/config'
import { useQueryUserInfo } from '@/entities/user'

export function OnboardingPage() {
  const router = useRouter()
  const { data: userInfo } = useQueryUserInfo()

  const handleStart = () => {
    sessionStorageUtil.set(LOGIN_SUCCESS, 'true')
    router.back()
  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-24 text-center">
      <div className="flex flex-col gap-5">
        <div className="flex justify-center">
          <Image width={50} height={50} src={'/images/icon/check_br.png'} alt="chcek-icon" />
        </div>
        {/* <div className="text-[21px]">회원가입 완료</div> */}
        <div className="text-[21px]">로그인 완료</div>
        <div>
          <div>{userInfo?.nickName}님 반갑습니다!</div>
          {/* <div>회원이 되신것을 환영합니다.</div> */}
          <div>재방문을 환영합니다</div>
        </div>
      </div>
      <div>
        <BaseButton
          onClick={handleStart}
          title="시작하기"
          className="bg-brown text-white"
          style={{
            width: '200px',
          }}
        />
      </div>
    </div>
  )
}
