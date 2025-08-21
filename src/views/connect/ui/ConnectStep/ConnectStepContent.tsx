'use client'

import { BaseInput, DateButton } from '@/shared/ui'
import Image from 'next/image'
import { useToast } from '@/shared/lib'
import { useConnectStepFlow } from '../../model/ConnectStepFlowContext'

export const ConnectStepContent = () => {
  const toast = useToast()

  const { code, currentStep, inputData, handleDateChange, handleInputChange } = useConnectStepFlow()

  const copyCode = () => {
    window.navigator.clipboard.writeText(code).then(() => toast.shortSuccess('복사되었습니다'))
  }

  return (
    <div className="flex flex-col justify-center h-40">
      {currentStep === 'date' && (
        <DateButton
          className="text-4xl"
          date={inputData.date ? new Date(inputData.date) : null}
          setDate={(date: Date | null) => handleDateChange(date)}
        />
      )}
      {(currentStep === 'nickname' || currentStep === 'insert-code') && (
        <div className="w-72">
          <BaseInput
            type="text"
            value={inputData[currentStep] || ''}
            onChange={(e) => handleInputChange(e.target.value, currentStep)}
          />
        </div>
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
        <Image src={'/images/illustration/love6.png'} alt="heart illust" width={160} height={160} />
      )}
    </div>
  )
}
