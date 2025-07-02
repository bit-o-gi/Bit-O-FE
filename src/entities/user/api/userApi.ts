import { instance } from '@/shared/api'
import { UserInfo } from './types'

export const getUserInfo = async () => {
  try {
    const result = await instance.get('/user')
    const userData = result?.data as UserInfo
    return userData
  } catch (err) {
    console.error(err)
    return null
  }
}
