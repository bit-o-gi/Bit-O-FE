import { calendarApi, useScheduleStore, Schedule } from '@/entities/calendar'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'

export const useMutationScheduleAdd = () => {
  const { selectedDate, setSelectedDate, updateScheduleList } = useScheduleStore()

  const router = useRouter()
  const params = useParams() as { id: string }
  const scheduleId = parseInt(params.id)

  const saveMutation = useMutation({
    mutationFn: (scheduleData: Schedule) =>
      scheduleId
        ? calendarApi.putSchedule({ scheduleId: scheduleId, scheduleDetail: scheduleData })
        : calendarApi.postSchedule(scheduleData),
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
