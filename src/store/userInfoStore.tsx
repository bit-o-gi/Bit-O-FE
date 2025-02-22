import { create } from 'zustand'

interface UserInfo {
  id: number
  nickName: string
  email: string
  oauthPlatformType: string
  oauthProviderId: number
}

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

const useUserInfoStore = create<UserInfoStore>()((set) => ({
  userInfo: initState,
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: initState }),
}))

export default useUserInfoStore
