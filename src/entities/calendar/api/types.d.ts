import { COLORS } from '@/entities/calendar/consts/constants'

export type ColorKey = keyof typeof COLORS
export interface ScheduleResponse extends Schedule {
  id: number
  nickName: string
  index: number
}
export interface Schedule {
  userId: number
  title: string
  content: string
  location: string
  startDateTime: string
  endDateTime: string
  color: ColorKey
}
