export const ROUTES = {
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  CONNECT: '/connect',
  CONNECT_CREATE_COUPLE: '/connect/create-couple',
  CONNECT_INSERT_CODE: '/connect/insert-code',
  CALENDAR: '/calendar',
  ADD_CALENDAR: '/calendar/add/new',
  UPDATE_CALENDAR: (planId: number) => `/calendar/add/${planId}`,
  DDAY: '/dday',
  SETTING: '/setting',
}
