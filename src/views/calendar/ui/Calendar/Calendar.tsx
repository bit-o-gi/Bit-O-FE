'use client'

import { ScheduleResponse, getCalendarList, useScheduleStore } from '@/entities/calendar'
import { useInjectIndex } from '@/entities/calendar/model/useInjectIndex'
import { useNavigater } from '@/shared/lib'
import { LoadingSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import CalendarBody from './CalendarBody'
import CalendarHeader from './CalendarHeader'

export function CalendarPage() {
  const { setCurrentDate, currentDate } = useScheduleStore()
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

  // index 주입 커스텀훅
  useInjectIndex(plandata)

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

/**
 * 테스트 코드 작성
 * 1. 일자가 겹치는 일정에 순서(index)를 부여한다
 * 2. 겹치는 일정이 없으면 index는 0으로 부여한다
 * 3. 겹치는 일정이 있으면 일정 시작일을 기준으로 index를 부여한다
 * 4. 단, 일정 시작일이 빠른 일정보다 낮은 index가 비어있는 경우 비어있는 가장 낮은 index를 부여한다
 * (ex. 일정1(1~2일)_index0, 일정2(2~3일)_index1, 일정3(3일)_index0 *index는 2가 아닌 0이 된다)
 */
