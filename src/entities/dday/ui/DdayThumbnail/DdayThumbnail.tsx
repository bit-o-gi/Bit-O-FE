import Image from 'next/image'

interface IDdayThumbnail {
  title: string
  src: string
  dday: number
}

export function DdayThumbnail({ title, src, dday }: IDdayThumbnail) {
  return (
    <div className="relative w-full aspect-[16/9] bg-gray-100">
      <Image alt={`${title} 이미지`} src={src} fill style={{ objectFit: 'cover' }} />
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <span className="text-2xl">{title}</span>
        <span className="text-6xl">D+{dday}</span>
      </div>
    </div>
  )
}
