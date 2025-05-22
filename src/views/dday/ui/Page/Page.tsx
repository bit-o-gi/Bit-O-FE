import { BaseHeader } from '@/shared/ui'
import { DdayThumbnail } from '@/entities/dday'
import { AnniversaryList } from '@/widgets/AnniversaryList'
import { useAnniversaryList } from '@/entities/anniversary'
import { useUserInfoStore } from '@/entities/userInfo'

export function DdayPage() {
  const { userInfo } = useUserInfoStore()

  const { data: anniversaryList } = useAnniversaryList(userInfo?.id)

  return (
    <>
      <BaseHeader title="내 디데이" />
      <div className="px-4 flex flex-col gap-y-5">
        <DdayThumbnail title="커플 기념일" src="/" dday={100} />
        {anniversaryList && anniversaryList.length > 0 ? (
          <AnniversaryList list={anniversaryList} />
        ) : (
          <div>기념일이 없습니다.</div>
        )}
      </div>
    </>
  )
}
