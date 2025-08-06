'use client'

import { calendarApi, useScheduleStore, ScheduleResponse } from '@/entities/calendar'
import { useMutationScheduleDelete } from '@/features/calendar'
import { BaseHeader, LoadingSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { AddScheduleBtn } from './AddScheduleBtn'
import AddScheduleColor from './AddScheduleColor'
import AddEventLocation from './AddScheduleLocation'
import AddEventNote from './AddScheduleNote'
import AddEventTime from './AddScheduleTime'
import AddEventTitle from './AddScheduleTitle'
import { Trash2Icon } from 'lucide-react'

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
    queryFn: () => calendarApi.getScheduleDetail(scheduleId),
    enabled: !!scheduleId,
  })

  const { deleteMutation } = useMutationScheduleDelete()

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
        hasBack
        actions={
          scheduleId
            ? [
                {
                  icon: <Trash2Icon />,
                  title: '이벤트 삭제',
                  action: handleDeleteButton,
                },
              ]
            : []
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
