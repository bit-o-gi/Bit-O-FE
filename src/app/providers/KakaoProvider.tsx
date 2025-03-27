'use client'

import { useEffect } from 'react'

export function KakaoProvider() {
  useEffect(() => {
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY
    if (
      typeof window !== 'undefined' &&
      !window.Kakao.isInitialized() &&
      kakaoApiKey !== undefined
    ) {
      window.Kakao.init(kakaoApiKey)
    }
  }, [])
  return null
}
