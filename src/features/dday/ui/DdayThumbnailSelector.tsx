import Image from 'next/image'
import { useState } from 'react'

interface DdayThumbnailSelectorProps {
  url: string
  selectedFile?: File | null
  onSelect: (file: File | null) => void
}

export function DdayThumbnailSelector({ url, selectedFile, onSelect }: DdayThumbnailSelectorProps) {
  const [isImgError, setIsImgError] = useState(false)

  const showImage = (selectedFile !== undefined ? selectedFile : url) && !isImgError

  return (
    <label
      htmlFor="imageInput"
      className="relative w-full aspect-[16/9] bg-gray-50 hover:cursor-pointer"
    >
      {showImage && (
        <Image
          alt="배경 이미지 선택"
          src={selectedFile !== undefined ? URL.createObjectURL(selectedFile!) : url}
          fill
          className="object-cover"
          onError={() => setIsImgError(true)}
        />
      )}
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <span className="text-brown">배경 이미지 선택</span>
      </div>
      <input
        className="hidden"
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const files = event.target.files
          if (files) onSelect(files[0])
          else onSelect(null)
        }}
      />
    </label>
  )
}
