import { useToastListStore } from '@/shared/ui/feedback/model/toastListStore'
import { ToastMessageDuration, ToastMessageType } from '@/shared/ui/feedback/model/types'

export const useToast = () => {
  const { addToast, resetToasts } = useToastListStore()

  return {
    longSuccess: (message: string) =>
      addToast(ToastMessageType.SUCCESS, message, ToastMessageDuration.LONG),
    longError: (message: string) =>
      addToast(ToastMessageType.ERROR, message, ToastMessageDuration.LONG),
    longInfo: (message: string) =>
      addToast(ToastMessageType.INFO, message, ToastMessageDuration.LONG),
    longWarning: (message: string) =>
      addToast(ToastMessageType.WARNING, message, ToastMessageDuration.LONG),
    shortSuccess: (message: string) =>
      addToast(ToastMessageType.SUCCESS, message, ToastMessageDuration.SHORT),
    shortError: (message: string) =>
      addToast(ToastMessageType.ERROR, message, ToastMessageDuration.SHORT),
    shortInfo: (message: string) =>
      addToast(ToastMessageType.INFO, message, ToastMessageDuration.SHORT),
    shortWarning: (message: string) =>
      addToast(ToastMessageType.WARNING, message, ToastMessageDuration.SHORT),
    clear: () => resetToasts(),
  }
}
