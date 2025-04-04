import { UserInfo } from '@/entities/userInfo'

enum CoupleStatus {
  APPROVED = 'APPROVED',
}

export type Couple = {
  id?: number
  initiatorUser: UserInfo
  partnerUser: UserInfo
  status: CoupleStatus
}
