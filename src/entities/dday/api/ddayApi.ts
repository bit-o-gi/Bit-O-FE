import { instance } from '@/shared/api'
import { Dday } from '../model/types'

export const ddayApi = {
  getDdayByUser: async () => {
    const result = await instance.get<Dday>('/day/user')
    return result.data
  },
}
