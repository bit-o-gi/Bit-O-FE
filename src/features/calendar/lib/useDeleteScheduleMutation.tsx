import { calendarApi, useScheduleStore } from '@/entities/calendar'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useParams, useRouter } from 'next/navigation'

export const useDeleteScheduleMutation = () => {
  const { selectedDate, setSelectedDate, deleteScheduleList } = useScheduleStore()

  const router = useRouter()
  const params = useParams() as { id: string }
  const scheduleId = parseInt(params.id)

  const deleteMutation = useMutation({
    mutationFn: () => calendarApi.deleteSchedule({ scheduleId }),
    onSuccess: () => {
      deleteScheduleList({ scheduleId })
      if (selectedDate) {
        setSelectedDate(selectedDate)
      }
      router.back()
    },
    onError: (error: AxiosError) => {
      alert(error)
    },
  })

  return { deleteMutation }
}
