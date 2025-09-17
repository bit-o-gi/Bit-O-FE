import { useQueryCoupleInfo } from '@/entities/couple'
import { useQueryDayUser } from '@/entities/dday'
import { DdayThumbnailSelector, useMutationDdayEdit } from '@/features/dday'
import { useToast } from '@/shared/lib'
import { BaseButton, BaseHeader, BaseInput } from '@/shared/ui'
import { useState } from 'react'

interface DdayForm {
  title?: string
  thumbnailUrl?: string
  selectedFile?: File | null
}

export function EditDdayPage() {
  const toast = useToast()

  const { mutateAsync: mutateAsyncDdayEdit } = useMutationDdayEdit()
  const { data: coupleInfo } = useQueryCoupleInfo()
  const isCouple = !!coupleInfo

  const { data } = useQueryDayUser(isCouple)

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

  const handleSaveDday = async () => {
    if (!form.title) return
    if (!data) return
    try {
      await mutateAsyncDdayEdit({
        dayId: data.id,
        title: form.title,
        file: form.selectedFile,
        startDate: data.startDate,
      })
      toast.shortSuccess('저장이 완료되었습니다.')
    } catch {
      toast.shortSuccess('저장 실패')
    }
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

        <BaseButton
          title="저장하기"
          className="mt-auto bg-brown text-white"
          onClick={handleSaveDday}
        />
      </div>
    </div>
  )
}
