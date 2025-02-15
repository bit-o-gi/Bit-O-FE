import { format } from 'date-fns'

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
  return (
    <div className="flex flex-1 flex-col">
      <input type="date" value={format(dateTime, 'yyyy-MM-dd')} onChange={handleDateChange} />
      <input type="time" value={format(dateTime, 'HH:mm')} onChange={handleTimeChange} />
    </div>
  )
}
