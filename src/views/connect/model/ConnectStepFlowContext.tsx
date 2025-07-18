'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ConnectStep, ConnectStepType } from './types'
import { format } from 'date-fns'
import { isAxiosError } from 'axios'
import { useMutationCoupleCodeCreate, useMutationCoupleConfirm } from '@/features/couple'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/lib'
import { coupleApi } from '@/entities/couple'

const CONNECT_STEP: Record<ConnectStepType, ConnectStep[]> = {
  create: ['date', 'nickname', 'create-code'],
  code: ['insert-code', 'complete'],
}

interface ConnectStepFlowContextValue {
  type: ConnectStepType
  code: string
  steps: ConnectStep[]
  currentStep: ConnectStep
  currentPage: number
  inputData: Record<ConnectStep, string>
  isForward: boolean
  setCurrentPage: (page: number) => void
  setCode: (code: string) => void
  goToNextStep: () => Promise<void>
  goToPrevStep: () => void
  handleDateChange: (date: Date | null) => void
  handleInputChange: (input: string, step: ConnectStep) => void
}

const ConnectStepFlowContext = createContext<ConnectStepFlowContextValue | null>(null)

export const ConnectStepFlowProvider = ({
  type,
  children,
}: {
  type: ConnectStepType
  children: ReactNode
}) => {
  const toast = useToast()
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isForward, setIsForward] = useState<boolean>(true)
  const [inputData, setInputData] = useState<Record<ConnectStep, string>>(
    {} as Record<ConnectStep, string>,
  )

  const [code, setCode] = useState<string>('')

  const { mutateAsync: mutateAsyncCoupleCodeCreate } = useMutationCoupleCodeCreate()
  const { mutateAsync: mutateAsyncCoupleConfirm } = useMutationCoupleConfirm()

  const steps = CONNECT_STEP[type]
  const currentStep = steps[currentPage]

  const createCode = async (startDate: Date, coupleTitle: string) => {
    try {
      const code = await mutateAsyncCoupleCodeCreate({ startDate, coupleTitle })
      setCode(code)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          try {
            const code = await coupleApi.getCoupleCode()
            if (code) setCode(code)
          } catch {
            throw new Error('커플 코드 조회 실패')
          }
        } else {
          throw new Error('커플 코드 생성 실패')
        }
      }
      throw new Error('알 수 없는 에러')
    }
  }

  const confirmCode = async (code: string) => {
    try {
      await mutateAsyncCoupleConfirm(code)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('잘못된 커플 코드입니다.')
        } else {
          throw new Error('커플 연결에 실패하였습니다.')
        }
      } else {
        throw new Error('알 수 없는 에러')
      }
    }
  }

  const goToNextStep = async () => {
    if (currentPage >= steps.length - 1) return
    if (!inputData[currentStep]) {
      toast.shortWarning('값을 입력해주세요')
      return
    }

    const nextStep = steps[currentPage + 1]
    try {
      if (nextStep === 'create-code')
        await createCode(new Date(inputData['date']), inputData['nickname'])
      if (nextStep === 'complete') await confirmCode(inputData['insert-code'])
    } catch (error) {
      if (error instanceof Error) {
        toast.shortError(error.message)
      }
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
    setInputData((prev) => ({ ...prev, date: date ? format(date, 'yyyy/MM/dd') : '' }))
  }

  const handleInputChange = (input: string, step: ConnectStep) => {
    setInputData((prev) => ({ ...prev, [step]: input }))
  }

  useEffect(() => {
    toast.clear()
  }, [currentStep])

  return (
    <ConnectStepFlowContext.Provider
      value={{
        type,
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
      }}
    >
      {children}
    </ConnectStepFlowContext.Provider>
  )
}

export const useConnectStepFlow = () => {
  const context = useContext(ConnectStepFlowContext)
  if (!context) {
    throw new Error('useConnectStep must be used within a ConnectStepProvider')
  }
  return context
}
