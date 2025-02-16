import { instance } from '@/shared/api'
import axios from 'axios'

export const requestCreateCoupleCode = async (): Promise<string> => {
  try {
    const res = await instance.post('/couple/code')
    return res.data.code
  } catch (error) {
    throw errorHandling(error, 'Failed to create couple code')
  }
}

export const requestConfirmCoupleCode = async (code: string): Promise<void> => {
  try {
    await instance.post('/couple/confirm', { code })
  } catch (error) {
    throw errorHandling(error, 'Failed to confirm couple code')
  }
}

const errorHandling = (error: unknown, apiErrorName: string) => {
  if (!(error instanceof Error)) throw new Error('Unknown error')
  if (axios.isAxiosError(error) && error.response)
    throw new Error(`${apiErrorName}: ${error.response.data}`)
  throw new Error('Network error')
}
