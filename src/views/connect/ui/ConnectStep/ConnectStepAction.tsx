'use client'

import { BaseButton, TextButton } from '@/shared/ui'
import { useUserInfoStore } from '@/entities/user'
import { useRefetchCoupleInfo } from '@/entities/couple'
import { shareWithKakao } from '@/features/share'
import { useRouter } from 'next/navigation'
import { useConnectStepFlow } from '../../model/ConnectStepFlowContext'

export const ConnectStepAction = () => {
  const router = useRouter()

  const { code, currentStep, goToNextStep } = useConnectStepFlow()

  const { userInfo } = useUserInfoStore()
  const { refetch: refetchCouple } = useRefetchCoupleInfo()

  const handleShareCode = () => {
    shareWithKakao(
      `${userInfo?.nickName} 님과 커플 연결하고 다양한 서비스를 이용해보세요.`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/connect/insert-code?code=${code}`,
      '연결하러 가기',
    )
  }

  const handleStart = async () => {
    await refetchCouple()
    router.replace('/')
  }

  return (
    <div className="flex mt-12 w-full">
      {['date', 'nickname', 'insert-code'].includes(currentStep) && (
        <div className="ml-auto">
          <TextButton title="다음으로" className="text-brown" onClick={goToNextStep} />
        </div>
      )}
      {currentStep === 'create-code' && (
        <BaseButton title="공유하기" className="bg-brown text-white" onClick={handleShareCode} />
      )}
      {currentStep === 'complete' && (
        <BaseButton title="시작하기" className="bg-brown text-white" onClick={handleStart} />
      )}
    </div>
  )
}
