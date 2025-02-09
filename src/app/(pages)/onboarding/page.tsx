'use client'
import { userApi } from '@/entities/userInfo'
import useUserInfoStore from '@/store/userInfoStore'
import BaseButton from '@/widgets/button/BaseButton'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Page() {
  const { userInfo, setUserInfo } = useUserInfoStore()
  const getUserInfo = async () => {
    const result = await userApi()
    if (result) {
      setUserInfo(result)
    }
  }

  useEffect(() => {
    getUserInfo()
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
            <div>{userInfo.nickName}님 반갑습니다!</div>
            {/* <div>회원이 되신것을 환영합니다.</div> */}
            <div>재방문을 환영합니다</div>
          </div>
        </div>
        <div>
          <Link href={'/'}>
            <BaseButton
              title="시작하기"
              className="bg-brown text-white"
              style={{
                width: '200px',
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
