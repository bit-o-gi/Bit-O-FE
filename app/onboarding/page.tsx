'use client'
import { BaseButton } from '@/shared/ui'
import useUserInfoStore from '@/store/userInfoStore'
import Image from 'next/image'
import { useEffect } from 'react'
import { getUserInfo } from '@/entities/userInfo/api/userApi'
import { useRouter } from 'next/navigation'
import { setSessionStorage } from '@/shared/lib/utils/sessionStorage'
import { LOGIN_SUCCESS } from '@/shared/config'

export default function Page() {
  const router = useRouter()
  const { userInfo, setUserInfo } = useUserInfoStore()

  useEffect(() => {
    const init = async () => {
      const result = await getUserInfo()
      if (result) {
        setUserInfo(result)
      }
    }
    init()
  }, [])

  return (
    <div className="h-full">
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
            onClick={() => {
              setSessionStorage(LOGIN_SUCCESS, 'true')
              router.back()
            }}
            title="시작하기"
            className="bg-brown text-white"
            style={{
              width: '200px',
            }}
          />
        </div>
      </div>
    </div>
  )
}
