'use client'

import { useScheduleStore } from '@/entities/calendar'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CalendarPlans = () => {
  const router = useRouter()
  const { selectedDatePlans, selectedDate, currentDate } = useScheduleStore()

  const handleEventClick = (planId: number | null) => {
    //이벤트 수정
    if (planId) {
      router.push(`/calendar/add/${planId}`)
    } else {
      //이벤트 생성
      router.push(`/calendar/add/new`)
    }
  }

  return (
    <>
      <div className="text-[1.13rem] font-semibold">
        {format(selectedDate ? selectedDate : currentDate, 'yyyy년 MM년 dd일')}
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        {selectedDatePlans.map((plan) => {
          return (
            <div
              key={plan.id}
              className="flex flex-row gap-[0.5rem] items-center h-[2.7rem] bg-gray-50 rounded-[8px] py-[6px] px-[12px] text-[0.75rem]"
              onClick={() => handleEventClick(plan.id)}
            >
              <div className="flex flex-col">
                <div>{format(plan.startDateTime, 'hh:mm')}</div>
                <div className="text-[0.5rem] text-gray-200">
                  {format(plan.endDateTime, 'hh:mm')}
                </div>
              </div>
              <div className="h-full w-1 bg-black rounded-sm"></div>
              <div>{plan.title}</div>
            </div>
          )
        })}
        <div
          className="h-[2.7rem] bg-gray-50 rounded-[8px] flex items-center py-[6px] px-[12px] gap-[8px]"
          onClick={() => handleEventClick(null)}
        >
          <Image
            alt="couble_left"
            src="/images/icon/plus.png"
            width={20}
            height={20}
            className="rotate-180"
          />
          <span className="text-[0.75rem]">New Event</span>
        </div>
      </div>
    </>
  )
}

export default CalendarPlans
