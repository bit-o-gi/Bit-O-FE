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
  color: string
}
