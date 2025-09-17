import React, { forwardRef, memo } from 'react'

export const BaseInput = memo(
  forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    return (
      <input
        ref={ref}
        className="bg-gray-50 p-2 rounded-md focus:ring-2 focus:ring-brown w-full caret-brown focus:outline-none"
        {...props}
      />
    )
  }),
)
