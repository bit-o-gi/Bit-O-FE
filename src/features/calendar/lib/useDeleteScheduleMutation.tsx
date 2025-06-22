import { useScheduleStore } from '@/entities/calendar'
import { deleteSchedule } from '@/entities/calendar/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface Props {
  scheduleId: number
  router: AppRouterInstance
}

export const useDeleteScheduleMutation = (props: Props) => {
  const { scheduleId, router } = props

  const { selectedDate, setSelectedDate, deleteScheduleList } = useScheduleStore()

  const deleteMutation = useMutation({
    mutationFn: () => deleteSchedule({ scheduleId }),
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
