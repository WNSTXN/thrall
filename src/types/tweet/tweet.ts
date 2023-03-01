import { Hashtags, Media, Timestamp } from '@/types'

export interface Tweet {
  created_at: Timestamp
  id: number
  id_str: `${number}`
  full_text: string
  truncated: boolean
  display_text_range: number[]
  entities: {
    hashtags: Hashtags[]
    symbols: unknown[]
    user_mentions: unknown[]
    urls: string[]
    media: Media[]
  }
  extended_entities: {
    media: Media[]
  }
  source: string
  in_reply_to_status_id: number | null
  in_reply_to_status_id_str: `${number}` | null
  in_reply_to_user_id: number | null
  in_reply_to_user_id_str: `${number}` | null
  in_reply_to_screen_name: string | null
  user_id: number
  user_id_str: `${number}`
  geo: unknown
  coordinates: unknown
  place: unknown
  contributors: unknown
  is_quote_status: boolean
  retweet_count: number
  favorite_count: number
  reply_count: number
  quote_count: number
  conversation_id: number
  conversation_id_str: `${number}`
  favorited: boolean
  retweeted: boolean
  possibly_sensitive: boolean
  possibly_sensitive_editable: boolean
  lang: 'en' | 'es'
  supplemental_language: unknown
  ext_views: {
    state: 'EnabledWithCount'
    count: `${number}`
  }
  ext: {
    editControl: object
    superFollowMetadata: object
    unmentionInfo: object
  }
}
