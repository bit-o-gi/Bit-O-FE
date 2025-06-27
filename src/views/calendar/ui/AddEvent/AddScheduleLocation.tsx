import { useScheduleStore } from '@/entities/calendar'
import Image from 'next/image'
import React from 'react'

const AddEventLocation = () => {
  const { location, setLocation } = useScheduleStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }

  return (
    <div className="flex gap-[1.75rem]">
      <div className="flex-none">
        <Image alt="clock" src="/images/icon/location.png" width={24} height={24} />
      </div>

      <input
        className="flex-1"
        placeholder="위치"
        onChange={handleInputChange}
        value={location || ''}
      />
    </div>
  )
}

export default AddEventLocation
