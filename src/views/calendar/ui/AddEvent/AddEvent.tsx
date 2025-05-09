'use client'

import AddEventTitle from './AddScheduleTitle'
import AddEventTime from './AddScheduleTime'
import AddEventNote from './AddScheduleNote'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  useScheduleStore,
  Schedule,
  ScheduleResponse,
  deleteSchedule,
  getScheduleDetail,
  postSchedule,
  putSchedule,
} from '@/entities/calendar'
import { useEffect, useState } from 'react'
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
    }
    return () => {
      setTitle(null)
      setNote(null)
      setDate(null)
    }
  }, [scheduleDetailData, setTitle, setNote, setDate, scheduleId])

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
      color: findKeyByValue(color),
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

  // 임시 color 부여 로직
  const [color, setColor] = useState(COLORS.LIGHT_PURPLE)

  const onClickColor = (color: string) => {
    handleColorChange(color)
    setIsColorPickerOpen(false)
  }

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  const handleColorPickerToggle = () => {
    setIsColorPickerOpen(!isColorPickerOpen)
  }

  // color 의 key 찾기
  const findKeyByValue = (value: string) => {
    return Object.keys(COLORS).find((key) => COLORS[key] === value)
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
          <div className='relative flex justify-between item-center'>
          <AddEventTitle placeholder={'Title'} />
          <div className='w-[1em] h-[1em] rounded-full cursor-pointer' 
          style={{ backgroundColor: color }} 
          onClick={handleColorPickerToggle}
          />
          {
            isColorPickerOpen && (
              <div className='absolute top-[30px] right-[5px] grid grid-cols-5 p-[10px] gap-[0.5em] rounded-[20px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]'>
                {Object.values(COLORS).map((color) => (
                  <div
                    key={`plan-color-${color}`}
                    className='w-[1em] h-[1em] rounded-full cursor-pointer'
                    style={{ backgroundColor: color }}
                    onClick={() => onClickColor(color)}
                  />
                ))}
              </div>
            )
          }
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
