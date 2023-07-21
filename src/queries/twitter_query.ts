import { Twitter } from '@/api'
import type { Post, Profile, Tweet, Tweets, UnparsedPost, UnparsedProfile, UnparsedTimeline } from '@/types'

export class TwitterQuery {
  private twitter: Twitter

  constructor() {
    this.twitter = new Twitter()
  }

  private async authorised_request_with_search_params(
    endpoint: string,
    search_params: Record<string, string> = {}
  ): Promise<Response> {
    const url_search_params = new URLSearchParams({
      include_profile_interstitial_type: '1',
      include_blocking: '1',
      include_blocked_by: '1',
      include_followed_by: '1',
      include_want_retweets: '1',
      include_mute_edge: '1',
      include_can_dm: '1',
      include_can_media_tag: '1',
      include_ext_has_nft_avatar: '1',
      include_ext_is_blue_verified: '1',
      include_ext_verified_type: '1',
      skip_status: '1',
      cards_platform: 'Web-12',
      include_cards: '1',
      include_ext_alt_text: 'true',
      include_ext_limited_action_results: 'false',
      include_quote_count: 'true',
      include_reply_count: '1',
      tweet_mode: 'extended',
      include_ext_collab_control: 'true',
      include_ext_views: 'true',
      include_entities: 'true',
      include_user_entities: 'true',
      include_ext_media_color: 'true',
      include_ext_media_availability: 'true',
      include_ext_sensitive_media_warning: 'true',
      include_ext_trusted_friends_metadata: 'true',
      send_error_codes: 'true',
      simple_quoted_tweet: 'true',
      include_tweet_replies: 'true',
      ext: 'mediaStats:highlightedLabel:hasNftAvatar:voiceInfo:birdwatchPivot:enrichments:superFollowMetadata:unmentionInfo:editControl:collab_control:vibe',
      ...search_params
    }).toString()

    return this.twitter.authorised_request(`${endpoint}?${url_search_params}`)
  }

  private async get_unparsed_profile(username: string): Promise<UnparsedProfile> {
    const url_search_params = new URLSearchParams({
      variables: JSON.stringify({
        screen_name: username,
        withHighlightedLabel: true
      })
    }).toString()

    const request = await this.twitter.authorised_request(
      `graphql/4S2ihIKfF3xhp-ENxvUAfQ/UserByScreenName?${url_search_params}`
    )

    return request.json() as Promise<UnparsedProfile>
  }

  private async get_unparsed_user_timeline(username: string, count: `${number}`): Promise<UnparsedTimeline> {
    const user_id = await this.get_user_id(username)
    const request = await this.authorised_request_with_search_params(`2/timeline/profile/${user_id}.json`, {
      count: count
    })

    return request.json() as Promise<UnparsedTimeline>
  }

  private async get_unparsed_post(tweet_id: `${number}` | number): Promise<UnparsedPost> {
    const request = await this.authorised_request_with_search_params(`2/timeline/conversation/${tweet_id}.json`)
    return request.json() as Promise<UnparsedPost>
  }

  async get_post(tweet_id: `${number}` | number): Promise<Post> {
    const tweet = await this.get_unparsed_post(tweet_id)

    return {
      tweets: tweet.globalObjects.tweets,
      users: tweet.globalObjects.users
    }
  }

  async get_tweet(tweet_id: `${number}` | number): Promise<Tweet | undefined> {
    const post = await this.get_unparsed_post(tweet_id)
    return post.globalObjects.tweets[tweet_id as `${number}`]
  }

  async get_profile(username: string): Promise<Profile> {
    const profile = await this.get_unparsed_profile(username)

    return {
      ...profile.data.user.legacy,
      rest_id: profile.data.user.rest_id
    }
  }

  async get_user_timeline(username: string, count: `${number}` = '3000'): Promise<Tweets> {
    const timeline = await this.get_unparsed_user_timeline(username, count)
    return timeline.globalObjects.tweets
  }

  async get_user_id(username: string): Promise<string> {
    const profile = await this.get_unparsed_profile(username)
    return profile.data.user.rest_id
  }
}
