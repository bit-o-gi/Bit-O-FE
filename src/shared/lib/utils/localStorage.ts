export const localStorageUtil = {
  get: (name: string): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(name)
  },
  set: (name: string, value: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(name, value)
  },
  remove: (name: string) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(name)
  },
}
