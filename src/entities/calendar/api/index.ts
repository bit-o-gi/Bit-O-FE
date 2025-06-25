import { instance } from '@/shared/api'
import { Schedule, ScheduleResponse } from './types'

export const getCalendarList = async (currentYear: number, currentMonth: number): Promise<ScheduleResponse[]> => {
  const res = await instance.get(`/schedule/couple`, {
    params: {
      year: currentYear,
      month: currentMonth,
    },
  })
  return res.data
}

export const getScheduleDetail = async (scheduleId: number): Promise<ScheduleResponse> => {
  const res = await instance.get(`/schedule/${scheduleId}`)
  return res.data
}

export const postSchedule = async (scheduleDetail: Schedule): Promise<ScheduleResponse> => {
  return await instance.post(`/schedule`, scheduleDetail)
}

export const putSchedule = async ({
  scheduleId,
  scheduleDetail,
}: {
  scheduleId: number
  scheduleDetail: Schedule
}): Promise<ScheduleResponse> => {
  return await instance.put(`/schedule/${scheduleId}`, scheduleDetail)
}

export const deleteSchedule = async ({ scheduleId }: { scheduleId: number }) => {
  return instance.delete(`/schedule/${scheduleId}`)
}
