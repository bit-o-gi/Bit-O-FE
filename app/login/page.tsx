'use client'

import Oauth from '@/features/oauth'
import Image from 'next/image'
import { Suspense } from 'react'

export default function Page() {
  // console.log('로그인 페이지 렌더링')

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
        {/* 카카오 로그인 컴포넌트 */}
        {/* 카카오 로그인 컴포넌트 */}
        <Suspense>
          <Oauth />
        </Suspense>
      </div>
    </div>
  )
}

// Suspense 사용 이유
// Suspense 경계 없이 검색 매개변수를 읽으면 useSearchParams()전체 페이지가 클라이언트 측 렌더링에 옵트인됩니다. 이로 인해 클라이언트 측 JavaScript가 로드될 때까지 페이지가 비어 있을 수 있습니다
// git issue (https://github.com/vercel/next.js/discussions/61654)
// 공식문서 내용 (https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
