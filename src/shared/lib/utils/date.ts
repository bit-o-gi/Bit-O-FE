import { differenceInCalendarDays, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DAY_OF_THE_WEEK } from '../../config'

export const formatDate = (date: string | Date, formatStr: string): string => {
  return format(date, formatStr, { locale: ko })
}

export const getDayDiff = (date: string | Date, baseDate: string | Date) => {
  return differenceInCalendarDays(date, baseDate)
}

export const getDayDiffFromToday = (date: string | Date) => {
  return differenceInCalendarDays(new Date(), date)
}

export const getDdayLabel = (date: string | Date): string => {
  const dday = getDayDiffFromToday(date)
  if (dday === 0) return 'D-day'
  else if (dday > 0) return `D+${dday}`
  else return `D${dday}`
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
