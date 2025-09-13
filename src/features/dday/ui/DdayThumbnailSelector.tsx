import Image from 'next/image'
import { useState } from 'react'

interface DdayThumbnailSelectorProps {
  url: string
  selectedFile?: File | null
  onSelect: (file: File | null) => void
}

const IMAGE_INPUT_ID = 'imageInput'

export function DdayThumbnailSelector({ url, selectedFile, onSelect }: DdayThumbnailSelectorProps) {
  const [isImgError, setIsImgError] = useState(false)

  const hasImage = !!url || !!selectedFile
  const showImage = (selectedFile !== undefined ? selectedFile : url) && !isImgError

  return (
    <label
      htmlFor={!hasImage ? 'imageInput' : ''}
      className={`relative w-full aspect-[16/9] bg-gray-50 ${!hasImage ? 'hover:cursor-pointer' : ''}`}
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

      {!hasImage && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brown">
          배경 이미지 선택
        </div>
      )}
      {hasImage && (
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 border px-3 py-0.5 rounded-lg border-red-600 bg-opacity-60 bg-white hover:bg-opacity-70"
          onClick={(event) => {
            event.preventDefault()
            onSelect(null)
            const input = document.getElementById(IMAGE_INPUT_ID) as HTMLInputElement
            if (input) input.value = ''
          }}
        >
          삭제하기
        </button>
      )}
      <input
        className="hidden"
        id={IMAGE_INPUT_ID}
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
