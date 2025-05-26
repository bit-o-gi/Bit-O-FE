import { ScheduleResponse } from '@/entities/calendar/api/types'
import {
  addDays,
  differenceInDays,
  differenceInMinutes,
  endOfDay,
  endOfMonth,
  getDay,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfMonth
} from 'date-fns'
import { DAY_OF_THE_WEEK } from '../../../entities/calendar/consts/constants'

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

export const getOneDaySchedule = (schedules: ScheduleResponse[], date: string | Date) => {
  // console.log('성능 최적화가 되나?')
  if (schedules.length === 0) return []

  return schedules.filter((plan) =>
    isWithinInterval(date, {
      start: startOfDay(plan?.startDateTime),
      end: endOfDay(plan?.endDateTime),
    }),
  )
}

// 오늘이 일정 시작일인지 체크
export const isStartDate = (startDate: string, today: Date) => {
  return isSameDay(startDate, today)
}

// 1. 일정 시작일이 빠른 순서로 정렬
export const getSortedOneDaySchedule = (oneDaySchedule: ScheduleResponse[]) => {
  const sortedOneDaySchedule = [...oneDaySchedule]
  sortedOneDaySchedule.sort((planA, planB) => {
    if (differenceInMinutes(planA.startDateTime, planB.startDateTime) < 0) {
      return -1
    } else {
      return 1
    }
  })

  return sortedOneDaySchedule
}

export const trancateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '..'
  }
  return str
}

// 하루짜리 일정인지 확인
export const isShortPlan = (startDate: string, endDate: string) => {
  return isSameDay(startDate, endDate)
}