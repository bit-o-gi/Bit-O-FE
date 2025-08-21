import { useQueryDayUser } from '@/entities/dday/model/useQueryDayUser'
import { DdayThumbnailSelector } from '@/features/dday'
import { useToast } from '@/shared/lib'
import { BaseHeader, BaseInput } from '@/shared/ui'
import { useState } from 'react'

interface DdayForm {
  title?: string
  thumbnailUrl?: string
}

export function EditDdayPage() {
  const toast = useToast()

  // TODO: isCouple 매개변수로 넘긴 인자 조건문으로 수정
  const { data } = useQueryDayUser(true)

  const [form, setForm] = useState<DdayForm>({
    title: data?.title,
    thumbnailUrl: data?.thumbnailUrl,
  })

  if (!data) {
    toast.shortError('디데이 정보가 없습니다.')
    return null
  }

  const handleFormUpdate = <K extends keyof DdayForm>(key: K, value: DdayForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="relative w-full h-full">
      <BaseHeader hasBack title="내 디데이 편집" />
      <div className="px-4 flex flex-col gap-y-5">
        <DdayThumbnailSelector
          url={form.thumbnailUrl ?? ''}
          onSelect={(url: string) => handleFormUpdate('thumbnailUrl', url)}
        />
        <div className="flex flex-col gap-y-2">
          <span>디데이 이름</span>
          <BaseInput
            defaultValue={form.title}
            onBlur={(event) => handleFormUpdate('title', event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
