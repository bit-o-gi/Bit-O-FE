import { instance } from '@/shared/api'
import { Schedule, ScheduleResponse } from '../model/types'

export const calendarApi = {
  getCalendarList: async (
    currentYear: number,
    currentMonth: number,
  ): Promise<ScheduleResponse[]> => {
    const res = await instance.get(`/schedule/couple`, {
      params: {
        year: currentYear,
        month: currentMonth,
      },
    })
    return res.data
  },
  getScheduleDetail: async (scheduleId: number): Promise<ScheduleResponse> => {
    const res = await instance.get(`/schedule/${scheduleId}`)
    return res.data
  },
  postSchedule: async (scheduleDetail: Schedule): Promise<ScheduleResponse> => {
    return await instance.post(`/schedule`, scheduleDetail)
  },
  putSchedule: async ({
    scheduleId,
    scheduleDetail,
  }: {
    scheduleId: number
    scheduleDetail: Schedule
  }): Promise<ScheduleResponse> => {
    return await instance.put(`/schedule/${scheduleId}`, scheduleDetail)
  },
  deleteSchedule: async ({ scheduleId }: { scheduleId: number }) => {
    return instance.delete(`/schedule/${scheduleId}`)
  },
}
