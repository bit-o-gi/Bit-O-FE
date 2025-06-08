export function getLocalStorage(name: string): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(name)
}

export function setLocalStorage(name: string, value: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem(name, value)
}