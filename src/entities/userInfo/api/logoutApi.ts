import { instance } from '@/shared/api'

export const logoutApi = {
  logout: async () => {
    const response = await instance.post('auth/logout')
    return response.data
  },
}

