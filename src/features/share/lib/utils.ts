export const shareWithKakao = (text: string, url: string, urlTitle: string) => {
  if (!window.Kakao.isInitialized()) return

  window.Kakao.Share.sendDefault({
    objectType: 'text',
    text,
    link: {
      webUrl: url,
    },
    buttonTitle: urlTitle,
  })
}
