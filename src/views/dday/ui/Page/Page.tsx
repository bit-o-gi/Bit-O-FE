import { BaseHeader } from '@/shared/ui'
import { DdayThumbnail } from '@/entities/dday'
import { AnniversaryList } from '@/widgets/AnniversaryList'
import { Anniversary } from '@/entities/anniversary'

const mockedAnniversaryList: Anniversary[] = [
  {
    id: 1,
    title: '100일',
    anniversaryDate: new Date('2025-06-01'),
  },
  {
    id: 2,
    title: '200일',
    anniversaryDate: new Date('2025-09-09'),
  },
  {
    id: 3,
    title: '300일',
    anniversaryDate: new Date('2025-12-18'),
  },
  {
    id: 4,
    title: '400일',
    anniversaryDate: new Date('2026-03-28'),
  },
  {
    id: 5,
    title: '500일',
    anniversaryDate: new Date('2026-07-06'),
  },
]

export function DdayPage() {
  return (
    <>
      <BaseHeader title="내 디데이" />
      <div className="px-4 flex flex-col gap-y-5">
        <DdayThumbnail title="커플 기념일" src="/" dday={100} />
        <AnniversaryList list={mockedAnniversaryList} />
      </div>
    </>
  )
}
