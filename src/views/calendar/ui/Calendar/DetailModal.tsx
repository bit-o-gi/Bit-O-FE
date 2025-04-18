import { useScheduleStore } from '@/entities/calendar'
import { useNavigater } from '@/shared/lib'
import { isWithinInterval, startOfDay } from 'date-fns'
import { useMemo } from 'react'

type Props = {
  isVisable: boolean
  closeDetailModal: () => void
  date: Date
}

const DetailModal = ({ isVisable, closeDetailModal, date }: Props) => {
  const { schedules } = useScheduleStore()
  const { navigateToUpdateCalendar } = useNavigater()

  const filterSchedule = useMemo(() => {
    return schedules.filter((plan) =>
      isWithinInterval(date, {
        start: startOfDay(plan.startDateTime),
        end: startOfDay(plan.endDateTime),
      }),
    )
  }, [schedules, date])

  const handleModalContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  // date format
  const day = date.getDate()
  const dayOfTheWeek = date.getDay()
  const formatedDayOfTheWeek = () => {
    switch (dayOfTheWeek) {
      case 0:
        return '일'
      case 1:
        return '월'
      case 2:
        return '화'
      case 3:
        return '수'
      case 4:
        return '목'
      case 5:
        return '금'
      case 6:
        return '토'
      default:
        return ''
    }
  }

  /**
   * @param date // 2025-01-27T07:44:47.195"
   * @returns
   */
  const formatTime = (date: string) => {
    const time = date.split('T')[1].split(':')

    const hour = time[0]
    const minute = time[1]
    // if (hour === '00' && minute === '00') {
    //   return ''
    // }
    return `${hour}:${minute}`
  }

  const handleEventClick = (planId: number) => {
    navigateToUpdateCalendar(planId)
  }

  return (
    <div
      className={` fixed inset-0 bg-black bg-opacity-70 p-5 transition-opacity duration-300 ease-in-out opacity-${isVisable ? 1 : 0} flex justify-center items-center`}
      onClick={closeDetailModal}
    >
      <div
        className={`w-full h-full bg-white p-5 rounded shadow-md transition-opacity duration-300 ease-in-out opacity-1 transform scale-75`}
        onClick={handleModalContent}
      >
        <div className="text-4xl">
          {day}일 {formatedDayOfTheWeek()}요일
        </div>
        <hr />
        <ul className="pt-3">
          {filterSchedule.map((plan) => (
            <li
              key={`schedule-detail-plan-${date}-${plan.id}`}
              className="cursor-pointer"
              onClick={() => handleEventClick(plan.id)}
            >
              <div className="flex gap-2">
                <div className="h-6 flex justify-center items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <div>
                  <div className="text-2xl h-6 align-middle">{plan.title}</div>
                  <div className="text-xl text-gray-300 ">
                    <span>{formatTime(plan.startDateTime)}</span>
                    <span>-</span>
                    <span>{formatTime(plan.endDateTime)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {filterSchedule.length > 2 && (
            <li className="text-[0.5rem] text-gray-500">+ {filterSchedule.length - 2} more</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default DetailModal
