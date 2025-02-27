import { create } from 'zustand'
import { IToastListStore, ToastMessageDuration, ToastMessageType } from './types'

export const useToastListStore = create<IToastListStore>((set, get) => ({
  toasts: [],
  addToast: (type: ToastMessageType, message: string, duration: ToastMessageDuration) => {
    const toast = { id: get().getNewId(), message, duration, type }
    set((state) => ({
      toasts: [...state.toasts, toast],
    }))
    get().autoremoveToast(toast.id, duration === 'short' ? 3000 : 5000)
  },
  autoremoveToast: (id: number, duration: number) => {
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
    }, duration)
  },
  getNewId: () => {
    return get().toasts.reduce((acc, cur) => (cur.id > acc ? cur.id : acc), 0) + 1
  },
}))
