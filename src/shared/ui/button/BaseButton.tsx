import React, { forwardRef, memo } from 'react'

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

export const BaseButton = memo(
  forwardRef<HTMLButtonElement, BaseButtonProps>(
    ({ type = 'button', title, className, disabled, ...props }, ref) => {
      return (
        <button
          ref={ref}
          type={type}
          disabled={disabled}
          className={`hover:shadow-[0_0_16px_rgba(160,168,180,0.3)] duration-200 py-[0.85rem] rounded-full w-full ${className}`}
          {...props}
        >
          {title}
        </button>
      )
    },
  ),
)
