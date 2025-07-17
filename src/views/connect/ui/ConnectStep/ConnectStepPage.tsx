'use client'

import { coupleApi } from '@/entities/couple'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useConnectStepFlow } from '../../lib/useConnectStepFlow'
import { ConnectStepType } from '../../model/types'
import { ConnectStepOverview } from './ConnectStepOverview'
import { ConnectStepContent } from './ConnectStepContent'
import { ConnectStepAction } from './ConnectStepAction'

interface ConnectStepProps {
  type: ConnectStepType
}

export function ConnectStepPage({ type }: ConnectStepProps) {
  const searchParams = useSearchParams()

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
        <ConnectStepOverview
          steps={steps}
          currentStep={currentStep}
          currentPage={currentPage}
          isForward={isForward}
        />
        <ConnectStepContent
          code={code}
          currentStep={currentStep}
          inputData={inputData}
          handleDateChange={handleDateChange}
          handleInputChange={handleInputChange}
        />
        <ConnectStepAction code={code} currentStep={currentStep} goToNextStep={goToNextStep} />
      </div>
    </div>
  )
}
