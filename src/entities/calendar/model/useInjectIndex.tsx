import { ScheduleResponse, useScheduleStore } from '@/entities/calendar'
import { getPlanFixedIndex } from '@/entities/calendar/lib/injectIndex'
import { useEffect } from 'react'
import { getOneDaySchedule, getSortedOneDaySchedule } from '../../../features/calendar/lib/utils'

type Props = ScheduleResponse[] | undefined

export const useInjectIndex = (plandata: Props) => {
  const setSchedules = useScheduleStore((state) => state.setSchedules)

  useEffect(() => {
    if (plandata && Array.isArray(plandata)) {
      const planDataWithIndex = plandata.map((plan) => {
        const oneDaySchedule = getOneDaySchedule(plandata, plan.startDateTime)
        if (oneDaySchedule.length > 1) {
          const sortedOneDaySchedule = getSortedOneDaySchedule(oneDaySchedule)
          const targetIndex = sortedOneDaySchedule.findIndex((_plan) => _plan.id === plan.id)
          return { ...plan, index: targetIndex }
        } else {
          return { ...plan, index: 0 }
        }
      })

      // index가 겹치는 plan index 조정
      const newPlanData = planDataWithIndex.map((schedule) => {
        const oneDaySchedule = getOneDaySchedule(planDataWithIndex, schedule.startDateTime)
        if (oneDaySchedule.length < 1) return schedule

        const newOneDaySchedule = getPlanFixedIndex(oneDaySchedule, schedule)
        return newOneDaySchedule
      })

      setSchedules(newPlanData)
    }
  }, [plandata])
}
