import { useToastListStore } from './model/toastListStore'
import Image from 'next/image'
import { ToastMessageDuration, ToastMessageType } from './model/types'

const ICON_MAP = {
  success: '/images/icon/success.png',
  error: '/images/icon/error.png',
  warning: '/images/icon/warning.png',
  info: '/images/icon/info.png',
}

export const ToastManager = ({ children }: { children: React.ReactNode }) => {
  const { toasts, addToast, removeToast } = useToastListStore()
  return (
    <div className="relative h-full">
      <button
        onClick={() => {
          addToast(ToastMessageType.SUCCESS, `Success Toast `, ToastMessageDuration.SHORT)
        }}
      >
        짧은 메세지 클릭!
      </button>

      <button
        onClick={() => {
          addToast(
            ToastMessageType.ERROR,
            `Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast Error Toast `,
            ToastMessageDuration.LONG,
          )
        }}
      >
        긴 메세지 클릭!
      </button>
      <div className="absolute top-10 left-0 w-full z-50 flex flex-col items-center gap-y-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-start gap-x-2 min-w-80 mx-20 px-6 py-3 bg-neutral-800/90 rounded-lg text-white text-sm shadow-[0_0_10px_rgba(0,0,0,0.4)] duration-700 transition-all"
          >
            <Image alt={toast.type} src={ICON_MAP[toast.type]} width={16} height={16} />
            <p className="text-white">{toast.message}</p>
          </div>
        ))}
      </div>
      <div className="relative z-0">{children}</div>
    </div>
  )
}
