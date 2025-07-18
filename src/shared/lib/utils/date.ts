import { DAY_OF_THE_WEEK } from '../../config'

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
