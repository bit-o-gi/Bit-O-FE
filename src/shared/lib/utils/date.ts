import { differenceInCalendarDays, format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatDate(date: string | number | Date, formatStr: string): string {
  return format(date, formatStr, { locale: ko })
}

export function getDateDiff(date: string | number | Date, baseDate: string | number | Date) {
  return differenceInCalendarDays(date, baseDate)
}
