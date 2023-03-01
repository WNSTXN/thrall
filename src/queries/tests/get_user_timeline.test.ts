import { TwitterQuery } from '@/queries'
import { expect } from 'chai'

describe('get_user_timeline', () => {
  const query = new TwitterQuery()

  it('It should return a valid timeline', async () => {
    const timeline = await query.get_user_timeline('twitter', '10')

    for (const tweet_id in timeline) {
      const tweet = timeline[tweet_id as `${number}`]
      expect(tweet?.id_str).to.be.a('string')
    }
  })

  it('It should return the expected amount of posts queried', async () => {
    const expected_post_count = '10'
    const timeline = await query.get_user_timeline('twitter', expected_post_count)
    const post_count = Object.keys(timeline).length
    expect(post_count).to.be.equal(Number(expected_post_count))
  })
})
