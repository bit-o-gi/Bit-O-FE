'use client'

import { useScheduleStore } from '@/entities/calendar'
import { getScheduleDetail } from '@/entities/calendar/api'
import useUserInfoStore from '@/entities/userInfo/model/userInfoStore'
import { useAddScheduleMutation } from '@/features/calendar/lib/useAddScheduleMutation'
import { useRequireAuth } from '@/shared/lib'
import { BaseButton, BaseHeader, LoadingSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { compareDesc } from 'date-fns/fp'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AddScheduleColor from './AddScheduleColor'
import AddEventLocation from './AddScheduleLocation'
import AddEventNote from './AddScheduleNote'
import AddEventTime from './AddScheduleTime'
import AddEventTitle from './AddScheduleTitle'
import { ScheduleResponse } from '@/entities/calendar/api/types'
import { useDeleteScheduleMutation } from '@/features/calendar/lib/useDeleteScheduleMutation'

/**
 * id 있다면 : 스케쥴 수정
 * id 없다면 : 스케쥴 생성
 */
export function AddEventPage() {
  const params = useParams() as { id: string }
  const router = useRouter()
  const requireAuth = useRequireAuth()
  const { userInfo } = useUserInfoStore()

  const {
    title,
    note,
    date,
    color,
    location,
    setColor,
    setTitle,
    setNote,
    setDate,
    setLocation,
    selectedDate,
  } = useScheduleStore()

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

  const { saveMutation } = useAddScheduleMutation({
    scheduleId,
    router,
  })

  const { deleteMutation } = useDeleteScheduleMutation({ scheduleId, router })

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
  }, [scheduleDetailData, setColor, setTitle, setNote, setDate, scheduleId])

  /**
   * Schedule 저장
   * */
  const handleSaveButton = () => {
    const baseDate = date?.startDateTime || selectedDate || new Date()

    const form = {
      userId: userInfo?.id as number, // <- 로그인 완성후 고칠부분
      title: title || 'No title',
      content: note || '',
      location: location || '',
      startDateTime: format(date?.startDateTime || new Date(baseDate), "yyyy-MM-dd'T'HH:mm:ss"),
      endDateTime: format(date?.endDateTime || new Date(baseDate), "yyyy-MM-dd'T'HH:mm:ss"),
      color: color || 'LIGHT_PURPLE',
    }

    //시작시간이 끝나는 시간보다 클 경우
    if (compareDesc(new Date(form?.startDateTime), new Date(form?.endDateTime)) === 1) {
      alert('시간을 다시 설정해주세요.')
      return
    }

    saveMutation.mutate(form)
  }

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
      <div className="sticky left-0 right-0 pb-[3rem] pt-[1.5rem] px-[1.5rem] ">
        <BaseButton
          title="저장하기"
          className="bg-brown text-white"
          onClick={requireAuth(handleSaveButton)}
        />
      </div>
    </>
  )
}
