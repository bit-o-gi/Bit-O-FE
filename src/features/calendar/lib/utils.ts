import { addDays, endOfMonth, getDay, isToday, startOfMonth } from 'date-fns'

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
