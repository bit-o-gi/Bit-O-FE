import { useScheduleStore } from '@/entities/calendar'
import { getOneDaySchedule } from '@/features/calendar/lib/utils'
import { useMemo } from 'react'

interface ScheduleList {
  date: Date
}
const ScheduleList = ({ date }: ScheduleList) => {
  const { schedules } = useScheduleStore()

  const oneDaySchedule = useMemo(() => getOneDaySchedule(schedules, date), [schedules, date])

  return (
    // <ul className="h-calc24">
    <ul className="">
      {oneDaySchedule.slice(0, 2).map((plan) => {
        return (
          <li
            key={plan.id}
            className={`bg-pink text-[0.5rem] text-ellipsis overflow-hidden w-full whitespace-nowrap px-[0.5rem] mt-1`}
          >
            {plan.title}
          </li>
        )
      })}
      {oneDaySchedule.length > 2 && (
        <li className="text-[0.5rem] text-gray-500">+ {oneDaySchedule.length - 2} more</li>
      )}
    </ul>
  )
}

export default ScheduleList
