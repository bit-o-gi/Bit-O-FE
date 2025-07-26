import { BaseHeader } from '@/shared/ui'
import { DdayThumbnail } from '@/entities/dday'
import { AnniversaryList } from '@/widgets/AnniversaryList'
import { useAnniversariesInRange } from '@/entities/anniversary'

export function DdayPage() {
  const { data: anniversaryList } = useAnniversariesInRange(1, 10)

  return (
    <>
      <BaseHeader title="내 디데이" />
      <div className="px-4 flex flex-col gap-y-5">
        <DdayThumbnail title="커플 기념일" src="/" baseDate={new Date('2025/01/01')} />
        {anniversaryList && anniversaryList.length > 0 ? (
          <AnniversaryList list={anniversaryList} />
        ) : (
          <div>기념일이 없습니다.</div>
        )}
      </div>
    </>
  )
}
