import { instance } from '@/shared/api'

export const createCoupleCode = async (): Promise<string> => {
  const res = await instance.post('/couple/code')
  return res.data.code
}
