export interface ScheduleResponse extends Schedule {
  id: number
  nickName: string
}

export interface Schedule {
  userId: number
  title: string
  content: string
  location: string
  startDateTime: string
  endDateTime: string
}
