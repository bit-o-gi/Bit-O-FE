import { differenceInCalendarDays, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DAY_OF_THE_WEEK } from '../../config'

export function formatDate(date: string | number | Date, formatStr: string): string {
  return format(date, formatStr, { locale: ko })
}

export function getDateDiff(date: string | number | Date, baseDate: string | number | Date) {
  return differenceInCalendarDays(date, baseDate)
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
