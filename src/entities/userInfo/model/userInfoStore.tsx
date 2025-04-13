import { create } from 'zustand'
import { UserInfo } from '../api/types'

interface UserInfoStore {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
  resetUserInfo: () => void
}

export const useUserInfoStore = create<UserInfoStore>()((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfo | null) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: null }),
}))
