import { useScheduleStore } from '@/entities/calendar'
import { ColorKey } from '@/entities/calendar/api/types'
import { COLORS } from '@/entities/calendar/consts/constants'
import { useState } from 'react'

const AddScheduleColor = () => {
  const { color, setColor } = useScheduleStore()

  const onClickColor = (color: ColorKey) => {
    handleColorChange(color)
    setIsColorPickerOpen(false)
  }

  const handleColorChange = (color: ColorKey) => {
    setColor(color)
  }

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  const handleColorPickerToggle = () => {
    setIsColorPickerOpen(!isColorPickerOpen)
  }

  return (
    <>
      <div
        className="w-[1em] h-[1em] rounded-full cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={handleColorPickerToggle}
      />
      {isColorPickerOpen && (
        <div className="absolute top-[30px] right-[5px] grid grid-cols-5 p-[10px] gap-[0.5em] rounded-[20px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          {Object.entries(COLORS).map(([key, hex]) => (
            <div
              key={`plan-color-${key}`}
              className="w-[1em] h-[1em] rounded-full cursor-pointer"
              style={{ backgroundColor: hex }}
              onClick={() => onClickColor(color)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default AddScheduleColor
