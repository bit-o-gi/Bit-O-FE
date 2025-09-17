import Link from 'next/link'
import { AnniversaryPreview } from '../../model/types'
import { formatDate, getDdayLabel } from '@/shared/lib'

interface IAnniversaryItemProps {
  anniversary: AnniversaryPreview
}

export function AnniversaryItem({ anniversary }: IAnniversaryItemProps) {
  const { id, title, anniversaryDate } = anniversary

  const ddayLabel = getDdayLabel(anniversaryDate)

  return (
    <Link href={`anniversary detail`}>
      <div className="h-20 px-2 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-2xl">{title}</span>
          <span className="text-gray-200">{formatDate(anniversaryDate, 'yyyy.MM.dd(E)')}</span>
        </div>
        <span className="text-2xl text-brown">{ddayLabel}</span>
      </div>
    </Link>
  )
}
