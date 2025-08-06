import { BaseHeader } from '@/shared/ui'
import { DdayThumbnail } from '@/entities/dday'
import { AnniversaryList } from '@/entities/anniversary'
import { useAnniversariesInRange } from '@/entities/anniversary'
import { GoToAnniversaryAddButton } from '@/features/anniversary'
import { PencilIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/config'

export function DdayPage() {
  const router = useRouter()

  const { data } = useAnniversariesInRange(0, 10)

  const anniversaryList = data?.getAnniversariesInRange

  const ddayHeaderActions = [
    {
      icon: <PencilIcon />,
      title: '내 디데이 편집',
      action: () => router.push(ROUTES.EDIT_DDAY),
    },
  ]

  return (
    <div className="relative w-full h-full">
      <BaseHeader title="내 디데이" actions={ddayHeaderActions} />
      <div className="px-4 flex flex-col gap-y-5">
        <DdayThumbnail />
        {anniversaryList && anniversaryList.length > 0 ? (
          <AnniversaryList list={anniversaryList} />
        ) : (
          <div>기념일이 없습니다.</div>
        )}
      </div>
      <div className="absolute right-6 bottom-20">
        <GoToAnniversaryAddButton />
      </div>
    </div>
  )
}
