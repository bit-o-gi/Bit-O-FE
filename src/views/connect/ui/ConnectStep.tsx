'use client'

import { confirmCoupleCode, createCoupleCode, getCoupleCode } from '@/entities/couple/api'
import { BaseButton, DateButton, ProgressBar, TextButton } from '@/shared/ui'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ConnectStepType = 'create' | 'code'
type ConnectStep = 'date' | 'nickname' | 'create-code' | 'insert-code' | 'complete'

interface ConnectStepProps {
  type: ConnectStepType
}

const CONNECT_STEP: Record<ConnectStepType, ConnectStep[]> = {
  create: ['date', 'nickname', 'create-code'],
  code: ['insert-code', 'nickname', 'complete'],
}

const CONNECT_STEP_IMAGE: Record<ConnectStep, string> = {
  date: '/images/illustration/love1.png',
  nickname: '/images/illustration/love2.png',
  'create-code': '/images/illustration/love3.png',
  'insert-code': '/images/illustration/love4.png',
  complete: '/images/illustration/love5.png',
}

const CONNECT_STEP_INSTRUCTION: Record<ConnectStep, string> = {
  date: '처음 사귀기 시작한 날짜를 \n선택해주세요.',
  nickname: '우리 둘 사이에서\n나의 애칭은 무엇인가요?',
  'create-code': '커플 코드가 생성되었어요.\n상대방에게 공유해볼까요?',
  'insert-code': '커플 코드를 입력해주세요.',
  complete: '커플 연결이 완료되었어요.\n이제 bitO를 사용해보세요.',
}

export function ConnectStepPage({ type }: ConnectStepProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isForward, setIsForward] = useState<boolean>(true)
  const [code, setCode] = useState<string>('')
  const [isConnectSuccess, setIsConnectSuccess] = useState<boolean>(false)
  const [inputData, setInputData] = useState<Record<ConnectStep, string>>(
    {} as Record<ConnectStep, string>,
  )

  const createCodeMutation = useMutation({
    mutationFn: () => createCoupleCode(),
    onSuccess: (data) => setCode(data),
    onError: async (error: AxiosError) => {
      if (error.response?.status === 409) {
        try {
          const code = await getCoupleCode()
          if (code) setCode(code)
        } catch {
          console.error('커플 코드 조회 실패')
        }
      } else {
        console.error('커플 코드 생성 실패')
      }
    },
  })

  const confirmCodeMutation = useMutation({
    mutationFn: (code: string) => confirmCoupleCode(code),
    onSuccess: () => setIsConnectSuccess(true),
    onError: async (error: AxiosError) => {
      if (error.response?.status === 400) {
        console.error('잘못된 코드입니다.')
      } else {
        console.error('커플 연결 실패')
      }
    },
  })

  const goToNextStep = async () => {
    if (currentPage >= steps.length - 1) return
    if (inputData[currentStep] === '') {
      console.error('값을 입력해주세요')
      return
    }

    setIsForward(true)
    setCurrentPage((prev) => prev + 1)
  }

  const goToPrevStep = () => {
    if (currentPage === 0) {
      router.back()
      return
    }
    setIsForward(false)
    setCurrentPage((prev) => prev - 1)
  }

  const handleDateChange = (date: Date | null) => {
    if (date) setInputData((prev) => ({ ...prev, date: format(date, 'yyyy/MM/dd') }))
    else setInputData((prev) => ({ ...prev, date: '' }))
  }

  const handleInputChange = (input: string, step: ConnectStep) => {
    if (input) setInputData((prev) => ({ ...prev, [step]: input }))
    else setInputData((prev) => ({ ...prev, [step]: '' }))
  }

  const copyCode = () => {
    // TODO: toast 메시지
    window.navigator.clipboard.writeText(code).then(() => console.log('복사되었습니다.'))
  }

  const onClickShareButton = () => {
    // TODO: 공유로직
  }

  const onClickStartButton = () => {
    // TODO: 홈으로 돌아가기
  }

  const steps = CONNECT_STEP[type]
  const currentStep = steps[currentPage]

  useEffect(() => {
    if (currentStep === 'create-code') createCodeMutation.mutate()
    if (currentStep === 'complete') confirmCodeMutation.mutate(inputData['insert-code'])
  }, [currentStep])

  useEffect(() => {
    console.log(inputData)
  }, [inputData])

  return (
    <div className="flex flex-col p-8 h-full">
      <Image
        title="이전으로"
        alt="left"
        src="/images/icon/arrow.png"
        width={36}
        height={36}
        className="hover:bg-gray-50 rounded-md cursor-pointer rotate-180 self-start"
        onClick={() => goToPrevStep()}
      />
      <div className="flex flex-col flex-1 items-center pt-32">
        <div className="h-16">
          <Image
            src={CONNECT_STEP_IMAGE[currentStep]}
            alt={`step-${currentStep}`}
            width={0}
            height={0}
            style={{ width: 'auto', height: '100%' }}
          />
        </div>
        <div className="my-10 w-40">
          <ProgressBar currentStep={currentPage} totalSteps={steps.length} isForward={isForward} />
        </div>
        <p className="h-16 text-center whitespace-pre-wrap">
          {CONNECT_STEP_INSTRUCTION[currentStep]}
        </p>
        <div className="flex flex-col justify-center h-40">
          {currentStep === 'date' && (
            <DateButton
              className="text-4xl"
              date={inputData.date ? new Date(inputData.date) : null}
              setDate={(date: Date | null) => handleDateChange(date)}
            />
          )}
          {(currentStep === 'nickname' || currentStep === 'insert-code') && (
            <input
              type="text"
              className="bg-gray-50 p-2 rounded-md focus:ring-2 focus:ring-brown w-72 caret-brown focus:outline-none"
              value={inputData[currentStep] || ''}
              onChange={(e) => handleInputChange(e.target.value, currentStep)}
            />
          )}
          {currentStep === 'create-code' && (
            <div className="flex flex-col items-center gap-y-4">
              <p className="text-4xl">{code}</p>
              <button className="flex items-center text-gray-300" onClick={copyCode}>
                <Image src={'/images/icon/copy.png'} alt="copy icon" width={20} height={20} />
                <span className="hover:border-b">복사하기</span>
              </button>
            </div>
          )}
          {currentStep === 'complete' && (
            <Image
              src={'/images/illustration/love6.png'}
              alt="heart illust"
              width={160}
              height={160}
            />
          )}
        </div>
        <div className="flex mt-12 w-full">
          {['date', 'nickname', 'insert-code'].includes(currentStep) && (
            <div className="ml-auto">
              <TextButton title="다음으로" className="text-brown" onClick={goToNextStep} />
            </div>
          )}
          {currentStep === 'create-code' && (
            <BaseButton
              title="공유하기"
              className="bg-brown text-white"
              onClick={onClickShareButton}
            />
          )}
          {currentStep === 'complete' && (
            <BaseButton
              title="시작하기"
              className="bg-brown text-white"
              onClick={onClickStartButton}
            />
          )}
        </div>
      </div>
    </div>
  )
}
