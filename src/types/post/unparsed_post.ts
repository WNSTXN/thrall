import { Tweets, Users } from '@/types'

export interface UnparsedPost {
  globalObjects: {
    tweets: Tweets
    users: Users
    moments: object
    cards: object
    places: object
    media: object
    broadcasts: object
    topics: object
    trends: object
    lists: object
  }
  timeline: {
    id: `Conversation-${number}`
    instructions: object[]
    responseObjects: {
      feedbackActions: object
      immediateReactions: object
    }
  }
}
