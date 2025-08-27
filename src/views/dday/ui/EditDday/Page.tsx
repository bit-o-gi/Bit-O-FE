import { useQueryDayUser } from '@/entities/dday'
import { DdayThumbnailSelector } from '@/features/dday'
import { BaseButton, BaseHeader, BaseInput } from '@/shared/ui'
import { useState } from 'react'

interface DdayForm {
  title?: string
  thumbnailUrl?: string
  selectedFile?: File | null
}

export function EditDdayPage() {
  // TODO: isCouple 매개변수로 넘긴 인자 조건문으로 수정
  const { data } = useQueryDayUser(true)

  const [form, setForm] = useState<DdayForm>({
    title: data?.title,
    thumbnailUrl: data?.thumbnailUrl,
  })

  const handleFormUpdate = <K extends keyof DdayForm>(key: K, value: DdayForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <BaseHeader hasBack title="내 디데이 편집" />
      <div className="p-4 flex flex-col gap-y-5 flex-1">
        <DdayThumbnailSelector
          url={form.thumbnailUrl ?? ''}
          selectedFile={form.selectedFile}
          onSelect={(file: File | null) => handleFormUpdate('selectedFile', file)}
        />
        <div className="flex flex-col gap-y-2">
          <span>디데이 이름</span>
          <BaseInput
            defaultValue={form.title}
            onBlur={(event) => handleFormUpdate('title', event.target.value)}
          />
        </div>

        <BaseButton title="저장하기" className="mt-auto bg-brown text-white" />
      </div>
    </div>
  )
}
