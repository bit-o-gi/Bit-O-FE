import { create } from 'zustand'
import { IToastListStore, ToastMessageDuration, ToastMessageState, ToastMessageType } from './types'

export const useToastListStore = create<IToastListStore>((set, get) => ({
  toasts: [],
  addToast: (type: ToastMessageType, message: string, duration: ToastMessageDuration) => {
    const toast = { id: get().getNewId(), message, duration, type, state: ToastMessageState.CREATE }
    set((state) => ({
      toasts: [...state.toasts, toast],
    }))
    setTimeout(() => get().setToastState(toast.id, ToastMessageState.VISIBLE), 50)

    get().autoremoveToast(toast.id, duration === 'short' ? 3000 : 5000)
  },
  autoremoveToast: (id: number, duration: number) => {
    setTimeout(() => {
      get().setToastState(id, ToastMessageState.GONE)
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }))
      }, 200)
    }, duration)
  },
  setToastState: (id: number, toastState: ToastMessageState) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              state: toastState,
            }
          : toast,
      ),
    }))
  },
  getNewId: () => {
    return get().toasts.reduce((acc, cur) => (cur.id > acc ? cur.id : acc), 0) + 1
  },
}))
