import { create } from 'zustand'
import { Couple } from './types'

interface ICoupleInfoStore {
  coupleInfo: Couple | null
  setCoupleInfo: (coupleInfo: Couple | null) => void
  resetCoupleInfo: () => void
}

export const useCoupleInfoStore = create<ICoupleInfoStore>()((set) => ({
  coupleInfo: null,
  setCoupleInfo: (coupleInfo: Couple | null) => set({ coupleInfo }),
  resetCoupleInfo: () => set({ coupleInfo: null }),
}))
