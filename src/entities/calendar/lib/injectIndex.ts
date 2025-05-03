import { differenceInMinutes } from 'date-fns'
import { ScheduleResponse } from '../api/types'

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
