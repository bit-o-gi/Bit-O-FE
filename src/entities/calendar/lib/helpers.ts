import { differenceInMinutes } from 'date-fns'
import { ColorKey, ScheduleResponse } from '../model/types'

export function getPlanFixedIndex(oneDaySchedule: ScheduleResponse[], plan: ScheduleResponse) {
  const overlapedPlan = oneDaySchedule.find(
    (_plan) => _plan.id !== plan.id && _plan.index === plan.index,
  )
  if (overlapedPlan && differenceInMinutes(overlapedPlan.startDateTime, plan.startDateTime) < 0) {
    // 둘중에 시작날짜가 느린쪽을 index를 -1 (재귀적으로 실행)
    const newPlan = { ...plan, index: plan.index - 1 }
    return getPlanFixedIndex(oneDaySchedule, newPlan)
  } else {
    return plan
  }
}

const rawExampleSchedules = [
  { title: '제주도 여행', startDay: 2, endDay: 5, color: 'ORANGE', location: '제주도' },
  { title: '지연이랑 성수동', startDay: 15, endDay: 15, color: 'TEAL', location: '성수 카페거리' },
  { title: '가족 식사', startDay: 20, endDay: 20, color: 'LIGHT_PURPLE', location: '남양주' },
  { title: '자격증 시험', startDay: 27, endDay: 27, color: 'BLUE', location: '국세청' },
]

export function generateExampleGuideSchedules() {
  const now = new Date()

  return rawExampleSchedules.map(({ title, startDay, endDay, color, location }, idx) => {
    const startDate = new Date(now.getFullYear(), now.getMonth(), startDay)
    const endDate = new Date(now.getFullYear(), now.getMonth(), endDay)

    return {
      id: idx + 1,
      nickName: 'Example',
      index: 0,
      userId: Number('Example'),
      title,
      content: title,
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString(),
      color: color as ColorKey,
      location,
    }
  })
}
