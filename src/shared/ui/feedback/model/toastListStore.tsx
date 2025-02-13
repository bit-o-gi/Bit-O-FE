import { create } from 'zustand'
import { IToastListStore, IToastMessage } from './types'

export const useToastListStore = create<IToastListStore>((set) => ({
  toasts: [
    {
      id: 1,
      message: '에러가 발생하였습니다. 어쩌구저쩌구 저쩌구어쩌구저쩌구 저쩌구',
      duration: 'short',
      type: 'success',
    },
    { id: 2, message: '커플 생성에 성공하였습니다.', duration: 'short', type: 'success' },
  ],
  addToast: (toast: IToastMessage) => set((state) => ({ toasts: [...state.toasts, toast] })),
  removeToast: (id: number) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))
