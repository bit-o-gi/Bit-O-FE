import { UserInfo } from '@/entities/user'

enum CoupleStatus {
  APPROVED = 'APPROVED',
}

export type Couple = {
  id?: number
  initiatorUser: UserInfo
  partnerUser: UserInfo
  status: CoupleStatus
}
