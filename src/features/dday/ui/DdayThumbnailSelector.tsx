import Image from 'next/image'

interface DdayThumbnailSelectorProps {
  url: string
  onSelect: (url: string) => void
}

export function DdayThumbnailSelector({ url, onSelect }: DdayThumbnailSelectorProps) {
  return (
    <div className="relative w-full aspect-[16/9] bg-gray-50">
      <Image
        alt="커플 배경 이미지 선택"
        src={url || 'noimage'}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <span className="text-brown">배경 이미지 선택</span>
      </div>
    </div>
  )
}
