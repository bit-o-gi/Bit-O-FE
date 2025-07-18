'use client'

import Image from 'next/image'
import { ConnectStep } from '../../model/types'
import { ProgressBar } from '@/shared/ui'
import { useConnectStepFlow } from '../../model/ConnectStepFlowContext'

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

export const ConnectStepOverview = () => {
  const { steps, currentStep, currentPage, isForward } = useConnectStepFlow()
  return (
    <>
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
    </>
  )
}
