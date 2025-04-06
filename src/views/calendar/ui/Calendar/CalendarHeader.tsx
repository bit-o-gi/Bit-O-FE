import Image from 'next/image'
import { addMonths, addYears } from 'date-fns'
import { useScheduleStore } from '@/entities/calendar'

const CalendarHeader = () => {
  const { currentDate, setCurrentDate } = useScheduleStore()
  return (
    <div className="h-[4rem] flex justify-center items-center py-[0.1rem] sm:gap-[1.25rem] gap-[1.1rem]">
      <Image
        alt="couble_left"
        src="/images/icon/doubleArrow.png"
        width={24}
        height={24}
        className="rotate-180"
        onClick={() => {
          setCurrentDate(addYears(currentDate, -1))
        }}
      />
      <Image
        alt="left"
        src="/images/icon/arrow.png"
        width={24}
        height={24}
        className="rotate-180"
        onClick={() => {
          setCurrentDate(addMonths(currentDate, -1))
        }}
      />

      <span className="font-light text-[1.5rem]">{currentDate.getFullYear()}년</span>
      <span className="font-bold text-[1.5rem]">{currentDate.getMonth() + 1}월</span>
      <Image
        alt="right"
        src="/images/icon/arrow.png"
        width={24}
        height={24}
        onClick={() => {
          setCurrentDate(addMonths(currentDate, +1))
        }}
      />
      <Image
        alt="couble_right"
        src="/images/icon/doubleArrow.png"
        width={24}
        height={24}
        onClick={() => {
          setCurrentDate(addYears(currentDate, +1))
        }}
      />
    </div>
  )
}
export default CalendarHeader
