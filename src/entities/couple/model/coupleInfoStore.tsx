import { create } from 'zustand'
import { Couple } from './types'
import { persist } from 'zustand/middleware'

interface CoupleInfoStore {
  coupleInfo: Couple | null
  setCoupleInfo: (coupleInfo: Couple | null) => void
  resetCoupleInfo: () => void
}

export const useCoupleInfoStore = create<CoupleInfoStore>()(
  persist(
    (set) => ({
      coupleInfo: null,
      setCoupleInfo: (coupleInfo: Couple | null) => set({ coupleInfo }),
      resetCoupleInfo: () => set({ coupleInfo: null }),
    }),
    {
      name: 'couple-storage',
    },
  ),
)
