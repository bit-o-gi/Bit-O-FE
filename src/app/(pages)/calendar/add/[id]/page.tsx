'use client'

import BaseButton from '@/widgets/button/BaseButton'
import BaseHeader from '@/widgets/layout/BaseHeader'
import AddEventTitle from './AddScheduleTitle'
import AddEventTime from './AddScheduleTime'
import AddEventNote from './AddScheduleNote'
import AddEventLocation from './AddScheduleLocation'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getScheduleDetail, postSchedule, putSchedule } from '@/features/calendar/api'
import { Schedule, ScheduleResponse } from '@/features/calendar/types'
import { useEffect } from 'react'
import useScheduleStore from '@/store/scheduleStore'
import LoadingSpinner from '@/shared/ui/LoadingSpinner'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { compareDesc } from 'date-fns/fp'

/**
 * id 있다면 : 스케쥴 수정
 * id 없다면 : 스케쥴 생성
 */
export default function AddEventPage() {
  const {
    title,
    note,
    date,
    setTitle,
    setNote,
    setDate,
    updateScheduleList,
    setSelectedDate,
    selectedDate,
  } = useScheduleStore()
  const params = useParams() as { id: string }
  const router = useRouter()

  const scheduleId = parseInt(params.id)
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
  const saveMutation = useMutation({
    mutationFn: (scheduleData: Schedule) =>
      scheduleId
        ? putSchedule({ scheduleId: scheduleId, scheduleDetail: scheduleData })
        : postSchedule(scheduleData),
    onSuccess: (data) => {
      updateScheduleList({ scheduleId, scheduleDetail: data })

      if (selectedDate) {
        // setTimeout(() => setSelectedDate(selectedDate), 100)
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
    }
    return () => {
      setTitle(null)
      setNote(null)
      setDate(null)
    }
  }, [scheduleDetailData, setTitle, setNote, setDate, scheduleId])

  const handleSaveButton = () => {
    const form = {
      userId: 1, // <- 로그인 완성후 고칠부분
      title: title || 'No title',
      content: note || '',
      location: '',
      startDateTime: format(date?.startDateTime || new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      endDateTime: format(date?.endDateTime || new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    }

    //시작시간이 끝나는 시간보다 클 경우
    if (compareDesc(new Date(form?.startDateTime), new Date(form?.endDateTime)) === 1) {
      alert('시간을 다시 설정해주세요.')
      return
    }

    saveMutation.mutate(form)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) alert(error)

  return (
    <>
      <BaseHeader title={'이벤트 추가'} backIcon />
      <div className="flex flex-col px-[1.5rem] h-[100vh] overflow-hidden py-[1.5rem]">
        <div className="flex flex-col flex-grow overflow-y-auto gap-[3rem] ">
          <AddEventTitle placeholder={'Title'} />
          <AddEventTime />
          <AddEventLocation />
          <AddEventNote />
        </div>
      </div>
      <div className="sticky bottom-0 left-0 right-0 pb-[3rem] pt-[1.5rem] px-[1.5rem]">
        <BaseButton title="저장하기" onClick={handleSaveButton} />
      </div>
    </>
  )
}
