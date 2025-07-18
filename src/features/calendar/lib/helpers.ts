import { ScheduleResponse } from '@/entities/calendar'
import {
  addDays,
  differenceInMinutes,
  endOfDay,
  endOfMonth,
  getDay,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfMonth,
} from 'date-fns'

/**
 * @param index
 * @param allIndices // 일정의 index 배열 ex) [0, 1, 2]
 * @returns
 */
export const getAdjustedIndex = (index: number, allIndices: number[]): number => {
  // index가 3보다 작으면 그대로 반환
  if (index < 3) return index

  // allIndices에서 3보다 작은 index를 필터링
  const usedIndices = allIndices.filter((idx) => idx < 3)

  // allIndices에서 3보다 큰 index를 필터링하고 정렬
  const highIndices = allIndices.filter((idx) => idx >= 3).sort((a, b) => a - b)

  // highIndices에서 현재 index의 위치 찾기
  const highIndexPosition = highIndices.indexOf(index)

  // availableIndices (0,1,2)에서 사용되지 않은 index 찾기
  const availableIndices = [0, 1, 2].filter((idx) => !usedIndices.includes(idx))

  // availableIndices가 있고 highIndexPosition이 -1이 아니면
  if (availableIndices.length > 0 && highIndexPosition !== -1) {
    // availableIndices의 순서대로 할당
    if (highIndexPosition < availableIndices.length) {
      return availableIndices[highIndexPosition]
    }
  }

  // 할당이 불가능하면 원본 index 반환
  return index
}

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

// 오늘이 일정 시작일인지 체크
export const isStartDate = (startDate: string, today: Date) => {
  return isSameDay(startDate, today)
}
