export const sessionStorageUtil = {
  get: (name: string): string | null => {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem(name)
  },
  set: (name: string, value: string) => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem(name, value)
  },
  remove: (name: string) => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(name)
  },
}
