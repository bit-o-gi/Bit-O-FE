export enum ToastMessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export enum ToastMessageDuration {
  SHORT = 'short',
  LONG = 'long',
}

export enum ToastMessageState {
  CREATE = 'create',
  VISIBLE = 'visible',
  GONE = 'gone',
}

export interface IToastMessage {
  id: number
  message: string
  duration: ToastMessageDuration
  type: ToastMessageType
  state: ToastMessageState
}

export interface IToastListStore {
  toasts: IToastMessage[]
  addToast: (type: ToastMessageType, message: string, duration: ToastMessageDuration) => void
  autoremoveToast: (id: number, duration: number) => void
  setToastState: (id: number, state: ToastMessageState) => void
  getNewId: () => number
}
