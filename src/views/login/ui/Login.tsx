'use client'

import { useOauthLoginCallback, LoginMethods } from '@/features/auth'
import Image from 'next/image'
import { Suspense } from 'react'

export function LoginPage() {
  useOauthLoginCallback()

  return (
    <div className="h-full">
      <div className="h-full flex flex-col justify-center items-center gap-10 ">
        <div>
          <Image width={126} height={44} src={'/images/logo/BitO.svg'} alt="logo" />
        </div>
        <div className="text-center text-[21px]">
          <div>간편하게 로그인하고</div>
          <div>다양한 서비스를 이용해보세요.</div>
        </div>
        <Suspense>
          <LoginMethods />
        </Suspense>
      </div>
    </div>
  )
}
