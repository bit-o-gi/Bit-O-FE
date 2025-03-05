'use client'

import { useToastListStore } from './model/toastListStore'
import Image from 'next/image'
import { ToastMessageState } from './model/types'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const ICON_MAP = {
  success: '/images/icon/success.png',
  error: '/images/icon/error.png',
  warning: '/images/icon/warning.png',
  info: '/images/icon/info.png',
}

export const ToastManager = () => {
  const pathname = usePathname()
  const { toasts, resetToasts } = useToastListStore()

  useEffect(() => {
    resetToasts()
  }, [pathname])

  return (
    <div className="fixed z-50 top-10 left-0 w-full flex flex-col items-center gap-y-4 pointer-events-none">
      {toasts.map(({ id, type, message, state }) => (
        <div
          key={id}
          className={`flex items-start gap-x-2 min-w-80 mx-20 px-6 py-3 bg-neutral-800/90 rounded-lg text-white text-base shadow-[0_0_10px_rgba(0,0,0,0.4)] 
              ${state === ToastMessageState.VISIBLE ? 'translate-y-0 opacity-100' : state === ToastMessageState.CREATE ? 'translate-y-2 opacity-0' : '-translate-y-2 opacity-0'} duration-200`}
        >
          <Image alt={type} src={ICON_MAP[type]} width={16} height={16} />
          <p>{message}</p>
        </div>
      ))}
    </div>
  )
}
