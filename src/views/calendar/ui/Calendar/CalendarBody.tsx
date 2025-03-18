import { useScheduleStore } from '@/entities/calendar'
import { DAY_OF_THE_WEEK, generateDate } from '@/features/calendar'
import { isEqual } from 'date-fns'
import ScheduleList from './ScheduleList'

const CalendarBody = () => {
  const { selectedDate, setSelectedDate, currentDate } = useScheduleStore()

  const getDateStyle = ({ date, today }: { date: Date | null; today: boolean | undefined }) => {
    if (!date) return

    /** 오늘날짜 일때 */
    if (today) {
      //선택된 날짜가 있을때
      if (selectedDate) {
        if (selectedDate && isEqual(date, selectedDate)) {
          return 'text-white bg-black rounded-full' // 오늘날짜 == 클릭된 날짜
        }
        return 'text-white bg-gray-100 rounded-full' //오늘날짜 !== 클릭된 날짜
      } else {
        if (today) {
          return 'text-white bg-black rounded-full' //오늘 날짜
        }
        return 'text-white bg-gray-100 rounded-full' //오늘이 아닌날짜
      }

      /** 오늘날짜가 아닐때*/
    } else if (selectedDate && isEqual(date, selectedDate)) {
      return 'text-white bg-black rounded-full' // 클릭된 날짜
    }

    return 'text-black' // 기본 상태
  }

  const onClickDateController = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="w-full h-calc4rem flex flex-col py-[0.25rem] px-[0.5rem] rounded-t-3xl text-[0.75rem] bg-white">
      <div className="flex w-full h-[4vh] items-center">
        {DAY_OF_THE_WEEK.map((item, index) => {
          return (
            <div key={index} className="flex-1 text-gray-400">
              <div className="w-[24px] text-center">{item}</div>
            </div>
          )
        })}
      </div>
      {/** 일자 */}
      <div className="h-full grid grid-cols-7 items-stretch">
        {generateDate({
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
        }).map(({ date, currentMonth, today }, index) => {
          return (
            <div
              key={date.getDate() + '_' + index}
              className="h-[65px] cursor-pointer"
              onClick={() => onClickDateController(date)}
            >
              <div
                className={`${currentMonth ? getDateStyle({ date, today }) : 'text-gray-100'} 
                text-center w-[24px] h-[24px] flex items-center justify-center`}
                // onClick={() => setSelectedDate(date)}
              >
                <div>{date.getDate()}</div>
              </div>
              <ScheduleList date={date} />
              {/** 스케쥴 리스트 */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarBody
