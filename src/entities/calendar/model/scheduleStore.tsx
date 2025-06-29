import { ColorKey, ScheduleResponse } from '@/entities/calendar/api/types'
import { addDays, isWithinInterval } from 'date-fns'
import { create } from 'zustand'

interface IScheduleStore {
  color: ColorKey
  setColor: (color: ColorKey) => void
  title: string | null
  note: string | null
  date: { startDateTime: Date; endDateTime: Date } | null
  location: string | null
  selectedDate: Date | null
  schedules: ScheduleResponse[]
  selectedDatePlans: ScheduleResponse[]
  currentDate: Date
  setDate: (date: { startDateTime: Date; endDateTime: Date } | null) => void
  setCurrentDate: (today: Date) => void
  setTitle: (title: string | null) => void
  setNote: (note: string | null) => void
  setLocation: (location: string | null) => void
  setSelectedDate: (date: Date) => void
  setSelectedDatePlans: (payload: ScheduleResponse[]) => void
  setSchedules: (payload: ScheduleResponse[]) => void
  updateScheduleList: ({
    scheduleId,
    scheduleDetail,
  }: {
    scheduleId: number
    scheduleDetail: ScheduleResponse
  }) => void
  deleteScheduleList: ({ scheduleId }: { scheduleId: number }) => void
}

export const useScheduleStore = create<IScheduleStore>((set) => ({
  color: 'LIGHT_PURPLE',
  setColor: (color: ColorKey) => set({ color }),
  title: null,
  note: null,
  date: null,
  location: null,
  selectedDate: null,
  schedules: [],
  selectedDatePlans: [],
  currentDate: new Date(),
  setDate: (date: { startDateTime: Date; endDateTime: Date } | null) => set({ date }),
  setCurrentDate: (currentDate: Date) => set({ currentDate }),
  setTitle: (title: string | null) => set({ title }),
  setNote: (note: string | null) => set({ note }),
  setLocation: (location: string | null) => set({ location }),
  setSelectedDate: (selectedDate: Date) =>
    set((state) => {
      //선택된 날짜의 plan filter
      if (state.schedules.length > 0) {
        const filteredPlans = state.schedules.filter((schedules) =>
          isWithinInterval(selectedDate, {
            start: addDays(schedules.startDateTime, -1),
            end: schedules.endDateTime,
          }),
        )
        state.selectedDatePlans = filteredPlans
      }
      return { selectedDate }
    }),
  setSchedules: (schedules: ScheduleResponse[]) => set({ schedules }),
  setSelectedDatePlans: (selectedDatePlans: ScheduleResponse[]) => set({ selectedDatePlans }),
  updateScheduleList: ({
    scheduleId,
    scheduleDetail,
  }: {
    scheduleId: number
    scheduleDetail: ScheduleResponse
  }) =>
    set((state) => {
      const updatedList = state.schedules.map((schedule) =>
        schedule.id === scheduleId ? scheduleDetail : schedule,
      )
      return { schedules: updatedList }
    }),
  deleteScheduleList: ({ scheduleId }: { scheduleId: number }) =>
    set((state) => {
      const updatedList = state.schedules.filter((schedule) => schedule.id !== scheduleId)
      return { schedules: updatedList }
    }),
}))
