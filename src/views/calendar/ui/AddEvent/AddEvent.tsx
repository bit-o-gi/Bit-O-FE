'use client'

import { useScheduleStore } from '@/entities/calendar'
import { getScheduleDetail } from '@/entities/calendar/api'
import { ScheduleResponse } from '@/entities/calendar/api/types'
import { useDeleteScheduleMutation } from '@/features/calendar/lib/useDeleteScheduleMutation'
import { BaseHeader, LoadingSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { AddScheduleBtn } from './AddScheduleBtn'
import AddScheduleColor from './AddScheduleColor'
import AddEventLocation from './AddScheduleLocation'
import AddEventNote from './AddScheduleNote'
import AddEventTime from './AddScheduleTime'
import AddEventTitle from './AddScheduleTitle'

/**
 * id 있다면 : 스케쥴 수정
 * id 없다면 : 스케쥴 생성
 */
export function AddEventPage() {
  const { setColor, setTitle, setNote, setDate, setLocation } = useScheduleStore()

  const params = useParams() as { id: string }
  const scheduleId = parseInt(params.id)

  /**Schedule 정보 use-query */
  const {
    data: scheduleDetailData,
    isLoading,
    isError,
    error,
  } = useQuery<ScheduleResponse>({
    queryKey: ['scheduleDetail', scheduleId],
    queryFn: () => getScheduleDetail(scheduleId),
    enabled: !!scheduleId,
  })

  const { deleteMutation } = useDeleteScheduleMutation()

  useEffect(() => {
    if (scheduleDetailData && scheduleId) {
      setTitle(scheduleDetailData.title)
      setNote(scheduleDetailData.content)
      setDate({
        startDateTime: new Date(scheduleDetailData.startDateTime),
        endDateTime: new Date(scheduleDetailData.endDateTime),
      })
      setColor(scheduleDetailData.color)
      setLocation(scheduleDetailData.location)
    }
    return () => {
      setTitle(null)
      setNote(null)
      setDate(null)
      setColor('LIGHT_PURPLE')
    }
  }, [scheduleDetailData, setColor, setNote, setDate, scheduleId])

  /**
   * Schedule 삭제
   * */
  const handleDeleteButton = () => {
    deleteMutation.mutate()
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) alert(error)

  return (
    <>
      <BaseHeader
        title={scheduleId ? '이벤트 수정' : '이벤트 추가'}
        backIcon
        nextIcon={
          scheduleId ? (
            <Image
              className="cursor-pointer absolute right-[1rem]"
              alt="couble_right"
              src="/images/icon/delete.png"
              width={20}
              height={20}
              onClick={handleDeleteButton}
            />
          ) : null
        }
      />
      <div className="flex flex-col px-[1.5rem] overflow-hidden py-[1.5rem] h-[75vh]">
        <div className="flex flex-col flex-grow overflow-y-auto gap-[3rem] ">
          <div className="relative flex items-center gap-4">
            <AddEventTitle placeholder={'Title'} />
            <AddScheduleColor />
          </div>
          <AddEventTime />
          <AddEventLocation />
          <AddEventNote />
        </div>
      </div>
      <AddScheduleBtn />
    </>
  )
}
