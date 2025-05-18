'use client'

import AddEventTitle from './AddScheduleTitle'
import AddEventTime from './AddScheduleTime'
import AddEventNote from './AddScheduleNote'
import AddScheduleColor from './AddScheduleColor'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteSchedule,
  getScheduleDetail,
  postSchedule,
  putSchedule,
} from '@/entities/calendar/api'
import { Schedule, ScheduleResponse } from '@/entities/calendar/api/types'
import { useEffect } from 'react'
import { useScheduleStore } from '@/entities/calendar'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { compareDesc } from 'date-fns/fp'
import Image from 'next/image'
import { BaseButton, BaseHeader, LoadingSpinner } from '@/shared/ui'
import AddEventLocation from './AddScheduleLocation'
import { COLORS } from '@/entities/calendar/consts/constants'


/**
 * id 있다면 : 스케쥴 수정
 * id 없다면 : 스케쥴 생성
 */
export function AddEventPage() {
  const {
    title,
    note,
    date,
    color,
    setColor,
    setTitle,
    setNote,
    setDate,
    updateScheduleList,
    setSelectedDate,
    deleteScheduleList,
    selectedDate,
  } = useScheduleStore()
  const params = useParams() as { id: string }
  const router = useRouter()

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

  /**Schedule 저장 use-query */
  const saveMutation = useMutation({
    mutationFn: (scheduleData: Schedule) =>
      scheduleId
        ? putSchedule({ scheduleId: scheduleId, scheduleDetail: scheduleData })
        : postSchedule(scheduleData),
    onSuccess: (data) => {
      updateScheduleList({ scheduleId, scheduleDetail: data })

      if (selectedDate) {
        setSelectedDate(selectedDate)
      }
      router.back()
    },
    onError: (error: AxiosError) => {
      alert(error)
    },
  })

  /**Schedule 삭제 use-query */
  const deleteMutation = useMutation({
    mutationFn: () => deleteSchedule({ scheduleId }),
    onSuccess: () => {
      deleteScheduleList({ scheduleId })
      if (selectedDate) {
        setSelectedDate(selectedDate)
      }
      router.back()
    },
    onError: (error: AxiosError) => {
      alert(error)
    },
  })

  useEffect(() => {
    if (scheduleDetailData && scheduleId) {
      setTitle(scheduleDetailData.title)
      setNote(scheduleDetailData.content)
      setDate({
        startDateTime: new Date(scheduleDetailData.startDateTime),
        endDateTime: new Date(scheduleDetailData.endDateTime),
      })
      setColor(scheduleDetailData.color)
    }
    return () => {
      setTitle(null)
      setNote(null)
      setDate(null)
      setColor(COLORS.LIGHT_PURPLE)
    }
  }, [scheduleDetailData, setColor, setTitle, setNote, setDate, scheduleId])

  /**
   * Schedule 저장
   * */
  const handleSaveButton = () => {
    const baseDate = date?.startDateTime || selectedDate || new Date()
    const form = {
      userId: 1, // <- 로그인 완성후 고칠부분
      title: title || 'No title',
      content: note || '',
      location: '',
      startDateTime: format(date?.startDateTime || new Date(baseDate), "yyyy-MM-dd'T'HH:mm:ss"),
      endDateTime: format(date?.endDateTime || new Date(baseDate), "yyyy-MM-dd'T'HH:mm:ss"),
      color: findKeyByValue(color) || 'LIGHT_PURPLE',
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



  // color 의 key 찾기
  const findKeyByValue = (color: string) => {
    return Object.keys(COLORS).find((key) => COLORS[key as keyof typeof COLORS] === color)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) alert(error)

  return (
    <>
      <BaseHeader
        title={'이벤트 추가'}
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
      <div className="flex flex-col px-[1.5rem] overflow-hidden py-[1.5rem] h-[75vh] ">
        <div className="flex flex-col flex-grow overflow-y-auto gap-[3rem] ">
          <div className='relative flex justify-between items-center'>
            <AddEventTitle placeholder={'Title'} />
            <AddScheduleColor />
          </div>
          <AddEventTime />
          <AddEventLocation />
          <AddEventNote />
        </div>
      </div>
      <div className="sticky left-0 right-0 pb-[3rem] pt-[1.5rem] px-[1.5rem] ">
        <BaseButton title="저장하기" className="bg-brown text-white" onClick={handleSaveButton} />
      </div>
    </>
  )
}
