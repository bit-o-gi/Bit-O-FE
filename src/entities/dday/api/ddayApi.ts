import { instance } from '@/shared/api'
import { Dday } from '../model/types'
import { compressImage } from '@/shared/lib'
import axios from 'axios'

export const ddayApi = {
  getDdayByUser: async () => {
    try {
      const result = await instance.get<Dday>('/day/user')
      return result.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null
      }
      throw error
    }
  },
  setDdayThumbnail: async ({ dayId, file }: { dayId: number; file: File | null }) => {
    const formData = new FormData()
    formData.append('dayId', String(dayId))
    if (file) {
      const resizedBlob = await compressImage(file)
      formData.append('file', resizedBlob)
    }
    await instance.post('/day/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  setDdayInfo: async (data: { dayId: number; title: string; startDate: string }) => {
    await instance.put('/day', data)
  },
}
