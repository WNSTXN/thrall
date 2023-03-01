import { TwitterQuery } from '@/queries'
import { expect } from 'chai'

describe('get_profile', () => {
  it('It should return a valid profile', async () => {
    const profile = await new TwitterQuery().get_profile('twitter')
    expect(profile.rest_id).to.be.a('string')
  })
})
