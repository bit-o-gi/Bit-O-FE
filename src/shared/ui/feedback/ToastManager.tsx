import { useToastListStore } from './model/toastListStore'

export const ToastManager = ({ children }: { children: React.ReactNode }) => {
  const { toasts, addToast, removeToast } = useToastListStore()

  return (
    <div className="relative">
      <div className="absolute top-10 left-0 w-full z-50 flex flex-col items-center gap-y-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="w-80 px-6 py-3 bg-gray-800/70 rounded-lg text-white text-sm shadow-[0_0_10px_rgba(0,0,0,0.4)]"
          >
            <p className="text-white">{toast.message}</p>
          </div>
        ))}
      </div>
      <div className="relative z-0">{children}</div>
    </div>
  )
}
