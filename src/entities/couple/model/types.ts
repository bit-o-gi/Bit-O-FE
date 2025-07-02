import { User } from '@/entities/user'

enum CoupleStatus {
  APPROVED = 'APPROVED',
}

export type Couple = {
  id?: number
  initiatorUser: User
  partnerUser: User
  status: CoupleStatus
}
