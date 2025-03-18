'use client'

import { ScheduleResponse, getCalendarList, useScheduleStore } from '@/entities/calendar'
import { useNavigater } from '@/shared/lib'
import { LoadingSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import CalendarBody from './CalendarBody'
import CalendarHeader from './CalendarHeader'

export function CalendarPage() {
  const { setSelectedDate, setSchedules, setCurrentDate, currentDate } = useScheduleStore()
  // const { setCurrentDate, currentDate } = useScheduleStore()
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
      setSchedules(plandata)
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
          <div className="w-[2rem] h-[2rem] rounded-full bg-pink text-center align-middle ">
            <span className="text-white text-xl">+</span>
          </div>
        </div>

        {/* detail 모달 */}
      </div>
    )
  )
}
