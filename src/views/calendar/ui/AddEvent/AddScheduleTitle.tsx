import { useScheduleStore } from '@/entities/calendar'

interface AddEventTitleProps {
  placeholder: string
}
const AddEventTitle = ({ placeholder }: AddEventTitleProps) => {
  const { title, setTitle } = useScheduleStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTitle(value)
  }

  return (
    <div className="flex-1">
      <input
        className="w-full text-[1.5rem] font-bold outline-none border-l-4 border-black px-[0.5rem] "
        placeholder={placeholder}
        value={title ? title : ''}
        onChange={handleInputChange}
      ></input>
    </div>
  )
}

export default AddEventTitle
