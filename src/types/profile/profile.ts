import { LegacyUser } from '@/types'

export interface Profile extends LegacyUser {
  rest_id: `${number}`
}
