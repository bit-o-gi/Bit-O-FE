import { ROUTES } from '@/shared/config'
import { RoundButton } from '@/shared/ui'
import { useRouter } from 'next/navigation'

export const GoToAnniversaryAddButton = () => {
  const router = useRouter()

  return (
    <div className="w-16 h-16">
      <RoundButton
        title="기념일 추가"
        mode="add"
        onClick={() => router.push(ROUTES.ADD_ANNIVERSARY)}
      />
    </div>
  )
}
