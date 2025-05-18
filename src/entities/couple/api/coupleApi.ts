import { instance } from '@/shared/api'
import { Couple } from '../model/types'

export const createCoupleCode = async ({
  startDate,
  coupleTitle,
}: {
  startDate: Date
  coupleTitle: string
}): Promise<string> => {
  const res = await instance.post('/couple/code', {
    startDate,
    coupleTitle,
  })
  return res.data.code
}

export const getCoupleCode = async (): Promise<string> => {
  const res = await instance.get('/couple/code')
  return res.data.code
}

export const confirmCoupleCode = async (code: string): Promise<void> => {
  await instance.post('/couple/confirm', { code })
}

export const getCoupleInfo = async (): Promise<Couple | null> => {
  try {
    const res = await instance.get('/couple')
    return res.data as Couple
  } catch (error) {
    console.error('getCoupleInfo', error)
    return null
  }
}
