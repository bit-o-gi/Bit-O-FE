'use client'

import React, { useEffect } from 'react'

type KakaoProviderProps = {
  children?: React.ReactNode
}

export function KakaoProvider({ children }: KakaoProviderProps) {
  useEffect(() => {
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY

    if (!kakaoApiKey) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('KakaoProvider: NEXT_PUBLIC_KAKAO_API_KEY 가 설정되지 않았습니다.')
      }
      return
    }

    const ensureInitialized = () => {
      try {
        if (typeof window === 'undefined') return
        const kakao = (window as any)?.Kakao
        if (!kakao) return
        if (!kakao.isInitialized()) {
          kakao.init(kakaoApiKey)
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('KakaoProvider: 초기화 중 오류', error)
        }
      }
    }

    // 이미 스크립트가 있으면 로드 완료 여부에 따라 처리
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-kakao-sdk="true"]')
    if (existingScript) {
      if ((existingScript as any)._loaded) {
        ensureInitialized()
      } else {
        existingScript.addEventListener('load', () => {
          ;(existingScript as any)._loaded = true
          ensureInitialized()
        })
      }
      return
    }

    // 새 스크립트 추가
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    script.async = true
    script.defer = true
    script.setAttribute('data-kakao-sdk', 'true')

    script.addEventListener('load', () => {
      ;(script as any)._loaded = true
      ensureInitialized()
    })

    script.addEventListener('error', (error) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('KakaoProvider: SDK 스크립트 로드 실패', error)
      }
    })

    document.head.appendChild(script)

    // cleanup: 이벤트만 제거 (스크립트는 재사용)
    return () => {}
  }, [])

  return <>{children}</>
}
