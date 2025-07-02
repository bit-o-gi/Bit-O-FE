import { create } from 'zustand'
import { User } from './types'

interface UserInfoStore {
  userInfo: User | null
  setUserInfo: (userInfo: User | null) => void
  resetUserInfo: () => void
}

const initState = {
  id: 0,
  nickName: '',
  email: '',
  oauthPlatformType: '',
  oauthProviderId: 0,
}

export const useUserInfoStore = create<UserInfoStore>()((set) => ({
  userInfo: initState,
  setUserInfo: (userInfo: User | null) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: initState }),
}))
