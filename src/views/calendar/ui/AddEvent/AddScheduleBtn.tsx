import { useScheduleStore } from '@/entities/calendar'
import useUserInfoStore from '@/entities/userInfo/model/userInfoStore'
import { useAddScheduleMutation } from '@/features/calendar/lib/useAddScheduleMutation'
import { useRequireAuth } from '@/shared/lib'
import { BaseButton } from '@/shared/ui'
import { format } from 'date-fns'
import { compareDesc } from 'date-fns/fp'

export const AddScheduleBtn = () => {
  const { saveMutation } = useAddScheduleMutation()

  const requireAuth = useRequireAuth()
  const { userInfo } = useUserInfoStore()
  const { title, note, date, color, location, selectedDate } = useScheduleStore()

  const handleSaveButton = () => {
    const baseDate = date?.startDateTime || selectedDate || new Date()

    const form = {
      userId: userInfo?.id as number, // <- 로그인 완성후 고칠부분
      title: title || 'No title',
      content: note || '',
      location: location || '',
      startDateTime: format(date?.startDateTime || new Date(baseDate), "yyyy-MM-dd'T'HH:mm:ss"),
      endDateTime: format(date?.endDateTime || new Date(baseDate), "yyyy-MM-dd'T'HH:mm:ss"),
      color: color || 'LIGHT_PURPLE',
    }

    //시작시간이 끝나는 시간보다 클 경우
    if (compareDesc(new Date(form?.startDateTime), new Date(form?.endDateTime)) === 1) {
      alert('시간을 다시 설정해주세요.')
      return
    }

    saveMutation.mutate(form)
  }

  return (
    <div className="sticky left-0 right-0 pb-[3rem] pt-[1.5rem] px-[1.5rem] ">
      <BaseButton
        title="저장하기"
        className="bg-brown text-white"
        onClick={requireAuth(handleSaveButton)}
      />
    </div>
  )
}
