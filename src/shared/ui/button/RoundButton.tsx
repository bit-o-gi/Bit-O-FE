import { PlusIcon } from 'lucide-react'
import React, { forwardRef, memo } from 'react'

interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: 'add'
}

export const RoundButton = memo(
  forwardRef<HTMLButtonElement, RoundButtonProps>(({ mode, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="bg-pink text-white flex justify-center items-center content-center hover:shadow-[0_0_16px_rgba(160,168,180,0.3)] duration-200 rounded-full w-full aspect-square"
        {...props}
      >
        {mode === 'add' && <PlusIcon />}
      </button>
    )
  }),
)
