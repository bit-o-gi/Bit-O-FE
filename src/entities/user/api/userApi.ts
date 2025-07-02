import { instance } from '@/shared/api'
import { User } from '../model/types'

export const userApi = {
  getUserInfo: async () => {
    try {
      const result = await instance.get('/user')
      const userData = result?.data as User
      return userData
    } catch (err) {
      console.error(err)
      return null
    }
  },
}
