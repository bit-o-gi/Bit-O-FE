import { getDdayLabel } from '@/shared/lib'
import Image from 'next/image'
import { useQueryDayUser } from '../../model/useQueryDayUser'

export function DdayThumbnail() {
  const { data } = useQueryDayUser(true)

  if (!data) return null

  const { title, startDate, thumbnailUrl } = data
  const ddayLabel = getDdayLabel(startDate)

  return (
    <div className="relative w-full aspect-[16/9] bg-gray-100">
      <Image
        alt={`${title} 이미지`}
        src={thumbnailUrl || 'noimage'}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <span className="text-2xl">{title}</span>
        <span className="text-6xl">{ddayLabel}</span>
      </div>
    </div>
  )
}
