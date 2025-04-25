import {
  addDays,
  differenceInDays,
  endOfMonth,
  getDay,
  isEqual,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfMonth,
} from 'date-fns'
import { DAY_OF_THE_WEEK } from '../consts/constants'
import { ScheduleResponse } from '@/entities/calendar'

interface GenerateDateProps {
  month: number
  year: number
}

export const generateDate = ({ year, month }: GenerateDateProps) => {
  const firstDateOfMonth = startOfMonth(new Date(year, month))
  const lastDateOfMonth = endOfMonth(firstDateOfMonth)
  const arrayOfDate = []

  /** 이전 달 날짜 채우기 */
  for (let i = 0; i < getDay(firstDateOfMonth); i++) {
    const date = addDays(firstDateOfMonth, -1 * (getDay(firstDateOfMonth) - i))
    arrayOfDate.push({
      currentMonth: false,
      date,
    })
  }

  /** 현재 해당하는 달 날짜 채우기 */
  for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
    const date = new Date(year, month, i)
    arrayOfDate.push({
      currentMonth: true,
      date,
      today: isToday(date),
    })
  }

  /** 남은 일수를 다음날 날짜로 채우기 */
  const remaining = 35 - arrayOfDate.length
  for (let i = 1; i <= remaining; i++) {
    const date = addDays(lastDateOfMonth, i)
    arrayOfDate.push({
      currentMonth: false,
      date,
    })
  }
  return arrayOfDate
}

export const getFormattedDate = (date: Date) => {
  return date.getDate()
}

export const getFormattedDay = (date: Date) => {
  const day = date.getDay()
  return DAY_OF_THE_WEEK[day]
}

export const getFormattedTime = (date: string) => {
  const time = date.split('T')[1].split(':')

  const hour = time[0]
  const minute = time[1]
  return `${hour}:${minute}`
}

export const getOneDaySchedule = (schedules: ScheduleResponse[], date: Date) => {
  // console.log('성능 최적화가 되나?')
  return schedules.filter((plan) =>
    isWithinInterval(date, {
      start: startOfDay(plan.startDateTime),
      end: startOfDay(plan.endDateTime),
    }),
  )
}

// 각 plan이 하루가 넘어가는 일정이면 시작하는 날짜에만 title을 보여준다.
export const isStartDate = (startDate: string, date: Date) => {
  return isEqual(startDate, date)
}

// 일정이 긴 plan 순서대로 display
export const getSortedOneDaySchedule = (oneDaySchedule: ScheduleResponse[]) => {
  const sortedOneDaySchedule = [...oneDaySchedule]
  sortedOneDaySchedule.sort((planA, planB) => {
    return (
      differenceInDays(planB.endDateTime, planB.startDateTime) -
      differenceInDays(planA.endDateTime, planA.startDateTime)
    )
  })

  return sortedOneDaySchedule
}
