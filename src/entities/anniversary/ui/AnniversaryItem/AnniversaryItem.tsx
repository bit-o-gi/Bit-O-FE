import Link from 'next/link'
import { Anniversary } from '../../model/types'
import { formatDate } from '@/shared/lib/utils/date'

interface IAnniversaryItemProps {
  anniversary: Anniversary
}

export function AnniversaryItem({ anniversary }: IAnniversaryItemProps) {
  return (
    <Link href={`anniversary detail`}>
      <div className="h-20 px-2 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-2xl">{anniversary.title}</span>
          <span className="text-gray-200">
            {formatDate(anniversary.anniversaryDate, 'yyyy.MM.dd(E)')}
          </span>
        </div>
        <span className="text-2xl text-brown">D-??</span>
      </div>
    </Link>
  )
}
