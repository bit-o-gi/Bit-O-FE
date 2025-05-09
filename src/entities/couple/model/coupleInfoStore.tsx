import { create } from 'zustand'
import { Couple } from './types'

interface CoupleInfoStore {
  coupleInfo: Couple | null
  setCoupleInfo: (coupleInfo: Couple | null) => void
  resetCoupleInfo: () => void
}

export const useCoupleInfoStore = create<CoupleInfoStore>()((set) => ({
  coupleInfo: null,
  setCoupleInfo: (coupleInfo: Couple | null) => set({ coupleInfo }),
  resetCoupleInfo: () => set({ coupleInfo: null }),
}))
