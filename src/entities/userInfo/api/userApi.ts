import { instance } from '@/shared/api'
import { UserInfo } from './types'

export const userApi = async () => {
  try {
    const result = await instance.get('/user')
    const userData = result?.data as UserInfo
    return userData
  } catch (err) {
    console.error(err)
    return null
  }
}
