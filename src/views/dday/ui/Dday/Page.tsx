import { BaseHeader } from '@/shared/ui'
import { DdayThumbnail } from '@/entities/dday'
import { AnniversaryList } from '@/entities/anniversary'
import { useAnniversariesInRange } from '@/entities/anniversary'

export function DdayPage() {
  const { data } = useAnniversariesInRange(0, 10)

  const anniversaryList = data?.getAnniversariesInRange

  return (
    <>
      <BaseHeader title="내 디데이" />
      <div className="px-4 flex flex-col gap-y-5">
        <DdayThumbnail />
        {anniversaryList && anniversaryList.length > 0 ? (
          <AnniversaryList list={anniversaryList} />
        ) : (
          <div>기념일이 없습니다.</div>
        )}
      </div>
    </>
  )
}
