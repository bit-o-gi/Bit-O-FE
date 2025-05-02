'use client'

import { ScheduleResponse, getCalendarList, useScheduleStore } from '@/entities/calendar'
import { getOneDaySchedule, getSortedOneDaySchedule } from '@/features/calendar/lib/utils'
import { useNavigater } from '@/shared/lib'
import { LoadingSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { differenceInMinutes } from 'date-fns'
import { useEffect } from 'react'
import CalendarBody from './CalendarBody'
import CalendarHeader from './CalendarHeader'

export function CalendarPage() {
  const { setSelectedDate, setSchedules, setCurrentDate, currentDate } = useScheduleStore()
  const { navigateAddCalendar } = useNavigater()

  const {
    isLoading,
    isError,
    data: plandata,
    error,
  } = useQuery<ScheduleResponse[]>({
    queryKey: ['calendarlist'],
    queryFn: () => getCalendarList(),
  })

  useEffect(() => {
    if (plandata && Array.isArray(plandata)) {
      // console.log()
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

        const newOneDaySchedule = getPlanFiexedIndex(oneDaySchedule, schedule)
        return newOneDaySchedule
      })

      setSchedules(newPlanData)
    }
  }, [plandata, setSchedules, setSelectedDate])

  useEffect(() => {
    //달&월을 위한 일자 - 오늘 날짜
    setCurrentDate(new Date())
  }, [setCurrentDate])

  const handleAddSchedule = () => {
    navigateAddCalendar()
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) alert(error)
  return (
    currentDate && (
      <div className="h-calc64 relative flex flex-col bg-gray-50">
        <CalendarHeader />
        <CalendarBody />
        {/* <CalendarPlans /> */}
        {/* 스케쥴 추가 버튼 */}
        <div
          className="absolute bottom-[2rem] right-[1.5rem] cursor-pointer"
          onClick={handleAddSchedule}
        >
          <div className="w-[2rem] h-[2rem] flex items-center justify-center rounded-full bg-pink  ">
            <div className="translate-y-[2px] text-white text-xl">+</div>
          </div>
        </div>
      </div>
    )
  )
}

function getPlanFiexedIndex(oneDaySchedule: ScheduleResponse[], plan: ScheduleResponse) {
  const overlapedPlan = oneDaySchedule.find(
    (_plan) => _plan.id !== plan.id && _plan.index === plan.index,
  )
  if (overlapedPlan && differenceInMinutes(overlapedPlan.startDateTime, plan.startDateTime) < 0) {
    // 둘중에 시작날짜가 느린쪽을 index를 -1 (재귀적으로 실행)
    const newPlan = { ...plan, index: plan.index - 1 }
    return getPlanFiexedIndex(oneDaySchedule, newPlan)
  } else {
    return plan
  }
}

/**
 * 테스트 코드 작성
 * 1. 일자가 겹치는 일정에 순서(index)를 부여한다
 * 2. 겹치는 일정이 없으면 index는 0으로 부여한다
 * 3. 겹치는 일정이 있으면 일정 시작일을 기준으로 index를 부여한다
 * 4. 단, 일정 시작일이 빠른 일정보다 낮은 index가 비어있는 경우 비어있는 가장 낮은 index를 부여한다
 * (ex. 일정1(1~2일)_index0, 일정2(2~3일)_index1, 일정3(3일)_index0 *index는 2가 아닌 0이 된다)
 */
