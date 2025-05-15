import { BaseHeader } from '@/shared/ui'
import { DdayThumbnail } from '@/entities/dday'
import { AnniversaryList } from '@/widgets/AnniversaryList'

export function DdayPage() {
  return (
    <>
      <BaseHeader title="내 디데이" />
      <div className="px-4 flex flex-col gap-y-5">
        <DdayThumbnail title="커플 기념일" src="/" dday={100} />
        <AnniversaryList />
      </div>
    </>
  )
}
