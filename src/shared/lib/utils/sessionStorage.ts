export function getSessionStorage(name: string): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(name)
}

export function setSessionStorage(name: string, value: string) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(name, value)
}

export function removeSessionStorage(name: string) {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(name)
}
