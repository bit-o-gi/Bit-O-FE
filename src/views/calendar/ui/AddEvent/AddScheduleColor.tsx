import { useScheduleStore } from "@/entities/calendar"
import { COLORS } from "@/entities/calendar/consts/constants"
import { useState } from "react"

const AddScheduleColor = () => {
    const { color, setColor } = useScheduleStore()

    const onClickColor = (color: string) => {
        handleColorChange(color)
        setIsColorPickerOpen(false)
    }

    const handleColorChange = (color: string) => {
        setColor(color)
    }

    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    const handleColorPickerToggle = () => {
        setIsColorPickerOpen(!isColorPickerOpen)
    }

    return (
        <>
            <div className='w-[1em] h-[1em] rounded-full cursor-pointer'
                style={{ backgroundColor: color }}
                onClick={handleColorPickerToggle}
            />
            {
                isColorPickerOpen && (
                    <div className='absolute top-[30px] right-[5px] grid grid-cols-5 p-[10px] gap-[0.5em] rounded-[20px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]'>
                        {Object.values(COLORS).map((color) => (
                            <div
                                key={`plan-color-${color}`}
                                className='w-[1em] h-[1em] rounded-full cursor-pointer'
                                style={{ backgroundColor: color }}
                                onClick={() => onClickColor(color)}
                            />
                        ))}
                    </div>
                )
            }
        </>
    )
}

export default AddScheduleColor
