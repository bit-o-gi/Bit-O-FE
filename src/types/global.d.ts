interface KakaoShare {
  sendDefault: (requestBody: {
    objectType: string
    text: string
    link: { webUrl: string }
    buttonTitle: string
  }) => Promise<unknown>
}

interface KakaoSdk {
  isInitialized: () => boolean
  init: (appKey: string) => void
  appKey: string
  Share: KakaoShare
}

declare global {
  interface Window {
    Kakao: KakaoSdk
  }
}

export default global
