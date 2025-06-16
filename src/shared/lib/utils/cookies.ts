export const cookiesUtil = {
  get: (name: string): string | undefined => {
    return document.cookie.split(`${name}=`)[1]?.split(';')[0]
  },
}
