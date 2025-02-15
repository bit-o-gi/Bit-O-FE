import { useScheduleStore } from '@/entities/calendar'
import { isWithinInterval, startOfDay } from 'date-fns'
import { useMemo } from 'react'

interface ScheduleList {
  date: Date
}
const ScheduleList = ({ date }: ScheduleList) => {
  const { schedules } = useScheduleStore()

  const filterSchedule = useMemo(() => {
    return schedules.filter((plan) =>
      isWithinInterval(date, {
        start: startOfDay(plan.startDateTime),
        end: startOfDay(plan.endDateTime),
      }),
    )
  }, [schedules, date])

  return (
    <ul className="absolute inset-0 top-[1.5rem]">
      {filterSchedule.slice(0, 2).map((plan) => {
        return (
          <li
            key={plan.id}
            className={`bg-pink text-[0.5rem] text-ellipsis overflow-hidden px-[0.5rem] mt-1`}
          >
            {plan.title}
          </li>
        )
      })}
      {filterSchedule.length > 2 && (
        <li className="text-[0.5rem] text-gray-500">+ {filterSchedule.length - 2} more</li>
      )}
    </ul>
  )
}

export default ScheduleList
