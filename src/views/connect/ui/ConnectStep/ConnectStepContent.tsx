'use client'

import { DateButton } from '@/shared/ui'
import { ConnectStep } from '../../model/types'
import Image from 'next/image'
import { useToast } from '@/shared/lib'

interface ConnectStepContentProps {
  code: string
  currentStep: ConnectStep
  inputData: Record<ConnectStep, string>
  handleDateChange: (date: Date | null) => void
  handleInputChange: (input: string, step: ConnectStep) => void
}

export const ConnectStepContent = ({
  code,
  currentStep,
  inputData,
  handleDateChange,
  handleInputChange,
}: ConnectStepContentProps) => {
  const toast = useToast()

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
        <Image src={'/images/illustration/love6.png'} alt="heart illust" width={160} height={160} />
      )}
    </div>
  )
}
