import { useScheduleStore } from '@/entities/calendar'
import { COLORS } from '@/entities/calendar/consts/constants'
import {
  getOneDaySchedule,
  getSortedOneDaySchedule,
  isShortPlan,
  isStartDate,
  trancateString,
} from '@/features/calendar/lib/utils'
import { getAdjustedIndex } from '@/features/calendar/lib/adjustIndex'
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

  const checkIndex = (index: number): number => {
    const allIndices = sortedOneDaySchedule.map(plan => plan.index)
    return getAdjustedIndex(index, allIndices)
  }

  return (
    <ul className="relative h-calc24">
      {sortedOneDaySchedule.slice(0, 3).map((plan) => {
        return (
          <li
            key={plan.id}
            className="absolute h-1/4 text-[0.5rem] text-ellipsis overflow-hidden w-full whitespace-nowrap px-[0.5rem] text-sm"
            style={{
              top: (() => {
                const idx = checkIndex(plan.index)
                return `calc(${25 * idx}% + ${2 * idx + 2}px)`
              })()
            }}
          >
            {/* 배경색을 위한 div - 하루짜리 일정이면 10%, 아니면 100% 너비 */}
            <div
              className="absolute h-full top-0 left-0"
              style={{
                width: isShortPlan(plan.startDateTime, plan.endDateTime) ? '5%' : '100%',
                backgroundColor: COLORS[plan.color as keyof typeof COLORS] || COLORS['LIGHT_PURPLE']
              }}
            />
            <div className="relative z-10">
              <span>
                {/* 각 plan이 하루가 넘어가는 일정이면 시작하는 날짜에만 title을 보여준다. */}
                {isStartDate(plan.startDateTime, date) && trancateString(plan.title, 7)}

                {/* index가 재조정 되는 경우 재조정된 일자에만 title을 보여준다다 */}
                {plan.index !== checkIndex(plan.index) && trancateString(plan.title, 7)}
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
