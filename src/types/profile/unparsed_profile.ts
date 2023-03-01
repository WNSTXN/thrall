import { LegacyUser } from '@/types'

export interface UnparsedProfile {
  data: {
    user: {
      id: string
      rest_id: `${number}`
      affiliates_highlighted_label: object
      legacy: LegacyUser
      legacy_extended_profile: object
      is_profile_translatable: boolean
    }
  }
}
