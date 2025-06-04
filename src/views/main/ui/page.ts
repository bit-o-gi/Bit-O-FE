import { ROUTES } from "@/shared/config"
import { redirect } from "next/navigation"


export function MainPage() {
  redirect(ROUTES.CALENDAR)
  return null
}
