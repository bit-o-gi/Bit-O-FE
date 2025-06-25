import { useScheduleStore } from '@/entities/calendar'
import { postSchedule, putSchedule } from '@/entities/calendar/api'
import { Schedule } from '@/entities/calendar/api/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'

export const useAddScheduleMutation = () => {
  const { selectedDate, setSelectedDate, updateScheduleList } = useScheduleStore()

  const router = useRouter()
  const params = useParams() as { id: string }
  const scheduleId = parseInt(params.id)

  const saveMutation = useMutation({
    mutationFn: (scheduleData: Schedule) =>
      scheduleId
        ? putSchedule({ scheduleId: scheduleId, scheduleDetail: scheduleData })
        : postSchedule(scheduleData),
    onSuccess: (data) => {
      updateScheduleList({ scheduleId, scheduleDetail: data })

      if (selectedDate) {
        setSelectedDate(selectedDate)
      }
      router.back()
    },
    onError: (error: AxiosError) => {
      alert(error)
    },
  })

  return { saveMutation }
}
