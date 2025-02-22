import { create } from 'zustand'
import { UserInfo } from '../api/types'

interface UserInfoStore {
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
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
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: initState }),
}))
