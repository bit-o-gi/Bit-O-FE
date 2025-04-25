import { useScheduleStore } from '@/entities/calendar'
import {
  getOneDaySchedule,
  getSortedOneDaySchedule,
  isStartDate,
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

  // 스케쥴은 3개까지 display, 4개부터는 2개까지 display + more 문구
  const displaySchedule =
    sortedOneDaySchedule.length > 3 ? sortedOneDaySchedule.slice(0, 2) : oneDaySchedule.slice(0, 3)

  return (
    // <ul className="h-calc24">
    <ul className="">
      {displaySchedule.map((plan) => {
        return (
          <li
            key={plan.id}
            className={`bg-pink text-[0.5rem] text-ellipsis overflow-hidden w-full whitespace-nowrap px-[0.5rem] mt-1 text-sm`}
          >
            <div className="h-[20px]">
              <span>{isStartDate(plan.startDateTime, date) ? plan.title : ''}</span>
            </div>
          </li>
        )
      })}
      {/* 스케쥴이 3개가 넘어가면 넘어가는 number를 (+ number) 처리 */}
      {oneDaySchedule.length > 3 && (
        <li className="text-[0.5rem] text-gray-500 text-sm">
          + {oneDaySchedule.slice(2).length} more
        </li>
      )}
    </ul>
  )
}

export default ScheduleList
