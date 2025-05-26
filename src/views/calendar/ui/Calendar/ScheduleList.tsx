import { useScheduleStore } from '@/entities/calendar'
import { COLORS } from '@/entities/calendar/consts/constants'
import {
  getOneDaySchedule,
  getSortedOneDaySchedule,
  isShortPlan,
  isStartDate,
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

  // 일정의 index를 재계산하는 함수
  // 만약 index가 3보다 크고, 해당 날짜에 index 0,1,2가 없으면 차례대로 index를 다시 계산
  const checkIndex = (index: number): number => {
    // index가 3보다 작으면 그대로 반환
    if (index < 3) return index

    // 사용 중인 인덱스 배열 생성 (0, 1, 2만 확인)
    const usedIndices = sortedOneDaySchedule
      .map(plan => plan.index)
      .filter(idx => idx < 3)

    // 3 이상인 인덱스를 가진 plan들을 찾아서 순서대로 정렬
    const highIndexPlans = sortedOneDaySchedule
      .filter(plan => plan.index >= 3)
      .sort((a, b) => a.index - b.index)

    // 현재 plan의 위치 찾기 (index 3부터 시작하는 순서)
    const highIndexPosition = highIndexPlans.findIndex(plan => plan.index === index)

    // 사용 가능한 낮은 인덱스들 (0, 1, 2 중에서 사용되지 않은 것들)
    const availableIndices = [0, 1, 2].filter(idx => !usedIndices.includes(idx))

    // 사용 가능한 인덱스가 있고, 현재 plan의 위치가 유효하면
    if (availableIndices.length > 0 && highIndexPosition !== -1) {
      // 위치에 따라 사용 가능한 인덱스 할당 (순서대로)
      if (highIndexPosition < availableIndices.length) {
        return availableIndices[highIndexPosition]
      }
    }

    // 사용 가능한 인덱스가 없거나, 모든 낮은 인덱스가 이미 재할당된 경우 원래 인덱스 반환
    return index
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
