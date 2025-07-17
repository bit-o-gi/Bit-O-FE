'use client'

import { ConnectStep } from '../../model/types'
import { BaseButton, TextButton } from '@/shared/ui'
import { useUserInfoStore } from '@/entities/user'
import { useRefetchCoupleInfo } from '@/entities/couple'
import { shareWithKakao } from '@/features/share'
import { useRouter } from 'next/navigation'

interface ConnectStepActionProps {
  code: string
  currentStep: ConnectStep
  goToNextStep: () => Promise<void>
}

export const ConnectStepAction = ({ code, currentStep, goToNextStep }: ConnectStepActionProps) => {
  const router = useRouter()
  const { userInfo } = useUserInfoStore()
  const { refetch: refetchCouple } = useRefetchCoupleInfo()

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

  return (
    <div className="flex mt-12 w-full">
      {['date', 'nickname', 'insert-code'].includes(currentStep) && (
        <div className="ml-auto">
          <TextButton title="다음으로" className="text-brown" onClick={goToNextStep} />
        </div>
      )}
      {currentStep === 'create-code' && (
        <BaseButton title="공유하기" className="bg-brown text-white" onClick={onClickShareButton} />
      )}
      {currentStep === 'complete' && (
        <BaseButton title="시작하기" className="bg-brown text-white" onClick={onClickStartButton} />
      )}
    </div>
  )
}
