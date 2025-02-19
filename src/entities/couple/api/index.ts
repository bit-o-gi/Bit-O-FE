import { instance } from '@/shared/api'

export const createCoupleCode = async (): Promise<string> => {
  const res = await instance.post('/couple/code')
  return res.data.code
}

export const getCoupleCode = async (): Promise<string> => {
  const res = await instance.get('/couple/code')
  return res.data.code
}

export const confirmCoupleCode = async (code: string): Promise<void> => {
  await instance.post('/couple/confirm', { code })
}
