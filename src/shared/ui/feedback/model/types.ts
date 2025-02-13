export interface IToastMessage {
  id?: number
  message: string
  duration: 'short' | 'long'
  type: 'success' | 'error' | 'info' | 'warning'
}

export interface IToastListStore {
  toasts: IToastMessage[]
  addToast: (toast: IToastMessage) => void
  removeToast: (id: number) => void
}
