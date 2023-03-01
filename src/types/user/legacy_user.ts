import { Timestamp, UserEntities } from '@/types'

export interface LegacyUser {
  created_at: Timestamp
  default_profile: boolean
  default_profile_image: boolean
  description: string
  entities: UserEntities
  fast_followers_count: number
  favourites_count: number
  followers_count: number
  friends_count: number
  has_custom_timelines: boolean
  is_translator: boolean
  listed_count: number
  location: string
  media_count: number
  name: string
  normal_followers_count: number
  pinned_tweet_ids_str: string[]
  profile_banner_extensions: object
  profile_banner_url: string
  profile_image_extensions: object
  profile_image_url_https: string
  profile_interstitial_type: string
  protected: boolean
  screen_name: string
  statuses_count: number
  translator_type: string
  verified: boolean
  withheld_in_countries: unknown[]
}
