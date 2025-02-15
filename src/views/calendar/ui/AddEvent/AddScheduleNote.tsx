import { useScheduleStore } from '@/entities/calendar'
import Image from 'next/image'

const AddEventNote = () => {
  const { note, setNote } = useScheduleStore()

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setNote(value)
  }

  return (
    <div className="flex gap-[1.75rem]">
      <div>
        <Image alt="clock" src="/images/icon/pencil.png" width={24} height={24} />
      </div>

      <textarea
        className="outline-none w-full "
        rows={5}
        placeholder="노트"
        value={note ? note : ''}
        onChange={handleTextAreaChange}
      />
    </div>
  )
}

export default AddEventNote
