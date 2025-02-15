import React, { forwardRef, memo } from 'react'

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  className?: string
}

export const TextButton = memo(
  forwardRef<HTMLButtonElement, TextButtonProps>(
    ({ type = 'button', title, className, ...props }, ref) => {
      return (
        <button
          ref={ref}
          type={type}
          className={`duration-200 hover:bg-gray-50 font-semibold rounded-md w-full px-4 py-2 ${className}`}
          {...props}
        >
          {title}
        </button>
      )
    },
  ),
)
