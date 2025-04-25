import { useScheduleStore } from '@/entities/calendar'
import {
  getFormattedDate,
  getFormattedDay,
  getFormattedTime,
  getOneDaySchedule,
  getSortedOneDaySchedule,
} from '@/features/calendar/lib/utils'
import { useNavigater } from '@/shared/lib'
import { useMemo } from 'react'

type Props = {
  isVisable: boolean
  closeDetailModal: () => void
  date: Date
}

const DetailModal = ({ isVisable, closeDetailModal, date }: Props) => {
  const { schedules } = useScheduleStore()
  const { navigateToUpdateCalendar } = useNavigater()

  const handleModalContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleEventClick = (planId: number) => {
    navigateToUpdateCalendar(planId)
  }

  const formattedDate = getFormattedDate(date)
  const formattedDay = getFormattedDay(date)
  const oneDaySchedule = useMemo(() => getOneDaySchedule(schedules, date), [schedules, date])

  // 일정이 긴 plan 순서대로 display
  const sortedOneDaySchedule = getSortedOneDaySchedule(oneDaySchedule)

  return (
    <div
      className={`z-10 fixed inset-0 bg-black bg-opacity-70 p-5 transition-opacity duration-300 ease-in-out opacity-${isVisable ? 1 : 0} flex justify-center items-center`}
      onClick={closeDetailModal}
    >
      <div
        className={`w-full max-w-[33.75rem] h-full bg-white p-5 rounded shadow-md transition-opacity duration-300 ease-in-out opacity-1 transform scale-75`}
        onClick={handleModalContent}
      >
        <div className="text-4xl">
          {formattedDate}일 {formattedDay}요일
        </div>
        <hr />
        <ul className="pt-3">
          {sortedOneDaySchedule.map((plan) => (
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
                    <span>{getFormattedTime(plan.startDateTime)}</span>
                    <span>-</span>
                    <span>{getFormattedTime(plan.endDateTime)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DetailModal
