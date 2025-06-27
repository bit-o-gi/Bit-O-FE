import { ROUTES } from '@/shared/config'
import { redirect } from 'next/navigation'

export default function Page() {
  redirect(ROUTES.CALENDAR)
}
