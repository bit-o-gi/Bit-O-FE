'use client'

import Image from 'next/image'
import { memo, useEffect, useState } from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  isForward: boolean
}

export const ProgressBar = memo(({ currentStep, totalSteps, isForward }: ProgressBarProps) => {
  const [hearts, setHearts] = useState(Array(totalSteps).fill(false))

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    const updateHearts = (condition: (i: number) => boolean) => {
      setHearts((prev) => prev.map((_, i) => condition(i)))
    }

    if (isForward) {
      if (currentStep === 0) updateHearts((i) => i === currentStep)
      else {
        updateHearts((i) => i < currentStep)
        timeout = setTimeout(() => {
          updateHearts((i) => i <= currentStep)
        }, 100)
      }
    } else {
      updateHearts((i) => i <= currentStep)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [currentStep, isForward])

  if (totalSteps === 1) return null
  return (
    <div className="relative mx-3 h-10" style={{ width: 'calc(100% - 24px)' }}>
      <div className="top-1/2 left-1/2 absolute w-full transform -translate-x-1/2 -translate-y-1/2">
        <div className="z-0 absolute bg-slate-200 w-full h-1"></div>
        <div
          className="z-10 absolute bg-pink h-1 duration-200"
          style={{
            width: `${(currentStep / (totalSteps - 1)) * 100}%`,
          }}
        ></div>
        {hearts.map((active, index) => {
          return (
            <Image
              alt="heart"
              key={index}
              src={active ? '/images/icon/heart_active.png' : '/images/icon/heart_inactive.png'}
              width={40}
              height={40}
              className="z-20 absolute text-pink"
              style={{
                top: '50%',
                left: `${(index / (totalSteps - 1)) * 100}%`,
                transform: 'translate(-50%, -40%)',
              }}
            />
          )
        })}
      </div>
    </div>
  )
})

ProgressBar.displayName = 'ProgressBar'
