'use client'

import { coupleApi } from '@/entities/couple'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { ConnectStepType } from '../../model/types'
import { ConnectStepOverview } from './ConnectStepOverview'
import { ConnectStepContent } from './ConnectStepContent'
import { ConnectStepAction } from './ConnectStepAction'
import { ConnectStepFlowProvider, useConnectStepFlow } from '../../model/ConnectStepFlowContext'

interface ConnectStepProps {
  type: ConnectStepType
}

export const ConnectStepPage = ({ type }: ConnectStepProps) => {
  return (
    <ConnectStepFlowProvider type={type}>
      <ConnectStepPageContainer />
    </ConnectStepFlowProvider>
  )
}

const ConnectStepPageContainer = () => {
  const searchParams = useSearchParams()

  const { type, steps, currentStep, setCurrentPage, setCode, goToPrevStep, handleInputChange } =
    useConnectStepFlow()

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
        <ConnectStepOverview />
        <ConnectStepContent />
        <ConnectStepAction />
      </div>
    </div>
  )
}
