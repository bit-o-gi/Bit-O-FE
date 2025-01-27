'use client'
import BaseButton from '@/widgets/button/BaseButton'

import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'
// import instance from '../../../utils/api/axiosInstance'

export default function Page() {
  // const handleAxiosTest = async () => {
  //   const result = await instance.get(`/schedule/0`)
  //   console.log('🚀 ~ handleAxiosTest ~ result:', result)
  // }
  // const router = useRouter()
  // const handleStart = () => {
  //   router.push('/')
  // }

  return (
    <div className="h-full">
      <div className="h-full flex flex-col justify-center items-center gap-24 text-center">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <Image width={50} height={50} src={'/images/icon/check_br.png'} alt="chcek-icon" />
          </div>
          <div className="text-[21px]">회원가입 완료</div>
          <div>
            <div>이**님 반갑습니다!</div>
            <div>회원이 되신것을 환영합니다.</div>
          </div>
        </div>
        <div>
          <Link href={'/'}>
            <BaseButton
              title="시작하기"
              color="bg-brown"
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
