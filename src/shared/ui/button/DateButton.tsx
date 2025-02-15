'use client'

import { format } from 'date-fns'
import { memo } from 'react'
import DatePicker from 'react-datepicker'

interface DateButtonProps {
  className: string
  date: Date | null
  setDate: (date: Date | null) => void
}

export const DateButton = memo(({ className, date, setDate }: DateButtonProps) => {
  return (
    <DatePicker
      selected={date ? new Date(date) : null}
      onChange={(date) => setDate(date)}
      customInput={
        <button className={className}>
          {date ? format(date, 'yyyy. MM. dd') : '0000. 00. 00'}
        </button>
      }
    />
  )
})

DateButton.displayName = 'DateButton'
