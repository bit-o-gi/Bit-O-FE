import { useScheduleStore } from '@/entities/calendar'
import {
  getOneDaySchedule,
  getSortedOneDaySchedule,
  trancateString,
} from '@/features/calendar/lib/utils'
import { useMemo } from 'react'

interface ScheduleList {
  date: Date
}
const ScheduleList = ({ date }: ScheduleList) => {
  const { schedules } = useScheduleStore()

  // 하루의 일정만 가져오기
  const oneDaySchedule = useMemo(() => getOneDaySchedule(schedules, date), [schedules, date])

  // 일정이 긴 plan 순서대로 display
  const sortedOneDaySchedule = getSortedOneDaySchedule(oneDaySchedule)

  return (
    <ul className="relative h-calc24">
      {sortedOneDaySchedule.slice(0, 3).map((plan) => {
        return (
          <li
            key={plan.id}
            className={`absolute h-1/4 bg-pink text-[0.5rem] text-ellipsis overflow-hidden w-full whitespace-nowrap px-[0.5rem] text-sm`}
            style={{ top: `calc(${25 * plan.index}% + ${2 * plan.index + 2}px)` }}
          >
            <div>
              <span>
                {/* {isStartDate(plan.startDateTime, date) ? trancateString(plan.title, 7) : ''} */}
                {trancateString(plan.title, 7)}
              </span>
            </div>
          </li>
        )
      })}
      {/* 스케쥴이 3개가 넘어가면 넘어가는 갯수 (+ more) 처리 */}
      {oneDaySchedule.length > 3 && (
        <li
          className="absolute text-[0.5rem] text-gray-500 text-sm"
          style={{ top: `calc(${25 * 3}% + 4px)` }}
        >
          + {oneDaySchedule.length - 3} more
        </li>
      )}
    </ul>
  )
}

export default ScheduleList
