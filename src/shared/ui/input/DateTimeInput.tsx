'use client'
import { format } from 'date-fns'
import { useRef } from 'react'

interface DateTimeInputProps {
  dateTime: Date
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DateTimeInput = ({
  dateTime,
  handleDateChange,
  handleTimeChange,
}: DateTimeInputProps) => {
  const dateInputRef = useRef<HTMLInputElement>(null)
  const timeInputRef = useRef<HTMLInputElement>(null)

  const handleDateClick = () => {
    dateInputRef.current?.showPicker()
  }

  const handleTimeClick = () => {
    timeInputRef.current?.showPicker()
  }

  return (
    <div className="flex flex-1 flex-col">
      <input
        ref={dateInputRef}
        type="date"
        value={format(dateTime, 'yyyy-MM-dd')}
        onChange={handleDateChange}
        onClick={handleDateClick}
        className="cursor-pointer"
      />
      <input
        ref={timeInputRef}
        type="time"
        value={format(dateTime, 'HH:mm')}
        onChange={handleTimeChange}
        onClick={handleTimeClick}
        className="cursor-pointer"
      />
    </div>
  )
}
