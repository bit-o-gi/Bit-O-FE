import { useScheduleStore } from '@/entities/calendar'
import { postSchedule, putSchedule } from '@/entities/calendar/api'
import { Schedule } from '@/entities/calendar/api/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface Props {
  scheduleId: number
  router: AppRouterInstance
}

export const useAddScheduleMutation = (props: Props) => {
  const { scheduleId, router } = props
  const { selectedDate, setSelectedDate, updateScheduleList } = useScheduleStore()

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
