'use client'

import { coupleApi, useRefetchCoupleInfo } from '@/entities/couple'
import { shareWithKakao } from '@/features/share'
import { useToast } from '@/shared/lib'
import { BaseButton, DateButton, ProgressBar, TextButton } from '@/shared/ui'
import { useUserInfoStore } from '@/entities/user'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useConnectStepFlow } from '../lib/useConnectStepFlow'

type ConnectStepType = 'create' | 'code'
type ConnectStep = 'date' | 'nickname' | 'create-code' | 'insert-code' | 'complete'

interface ConnectStepProps {
  type: ConnectStepType
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
  nickname: '우리 커플의 별명은\n무엇인가요?',
  'create-code': '커플 코드가 생성되었어요.\n상대방에게 공유해볼까요?',
  'insert-code': '커플 코드를 입력해주세요.',
  complete: '커플 연결이 완료되었어요.\n이제 bitO를 사용해보세요.',
}

export function ConnectStepPage({ type }: ConnectStepProps) {
  const searchParams = useSearchParams()
  const toast = useToast()
  const router = useRouter()

  const { userInfo } = useUserInfoStore()
  const { refetch: refetchCouple } = useRefetchCoupleInfo()

  const {
    code,
    steps,
    currentStep,
    currentPage,
    inputData,
    isForward,
    setCurrentPage,
    setCode,
    goToNextStep,
    goToPrevStep,
    handleDateChange,
    handleInputChange,
  } = useConnectStepFlow(type)

  const copyCode = () => {
    window.navigator.clipboard.writeText(code).then(() => toast.shortSuccess('복사되었습니다'))
  }

  const onClickShareButton = () => {
    shareWithKakao(
      `${userInfo?.nickName} 님과 커플 연결하고 다양한 서비스를 이용해보세요.`,
      `${process.env.NEXT_PUBLIC_APP_URL}/connect/insert-code?code=${code}`,
      '연결하러 가기',
    )
  }

  const onClickStartButton = async () => {
    await refetchCouple()
    router.replace('/')
  }

  useEffect(() => {
    if (type === 'create') {
      coupleApi
        .getCoupleCode()
        .then((code) => {
          setCurrentPage(steps.length - 1)
          setCode(code)
        })
        .catch((error) => console.error(error))
    }
    if (type === 'code') {
      const code = searchParams.get('code') || ''
      handleInputChange(code, 'insert-code')
    }
  }, [])

  return (
    <div className="flex flex-col p-8 h-full">
      <Image
        title="이전으로"
        alt="left"
        src="/images/icon/arrow.png"
        width={36}
        height={36}
        className={`hover:bg-gray-50 rounded-md cursor-pointer rotate-180 self-start 
          ${(currentStep === 'create-code' || currentStep === 'complete') && 'invisible'}`}
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
