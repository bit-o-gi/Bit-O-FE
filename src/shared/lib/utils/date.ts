import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatDate(date: string | number | Date, formatStr: string): string {
  return format(date, formatStr, { locale: ko })
}
