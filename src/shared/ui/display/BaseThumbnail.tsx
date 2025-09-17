'use client'

import Image from 'next/image'
import { useState } from 'react'

interface BaseThumbnailProps {
  title: string
  src?: string
  children?: React.ReactNode
}

export const BaseThumbnail = ({ title, src, children }: BaseThumbnailProps) => {
  const [isImgError, setIsImgError] = useState(false)

  const showImage = src && !isImgError

  return (
    <div className="relative w-full aspect-[16/9] bg-gray-50">
      {showImage && (
        <Image
          alt={`${title} 이미지`}
          src={src}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setIsImgError(true)}
        />
      )}
      <div
        className={`flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${showImage ? 'text-white' : 'text-black'}`}
      >
        {children}
      </div>
    </div>
  )
}
