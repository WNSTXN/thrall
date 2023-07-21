import { Twitter } from '@/api'
import { expect } from 'chai'

describe('is_guest_token_expired', () => {
  const twitter = new Twitter()

  it('It should be expired', () => {
    const is_expired = twitter.is_guest_token_expired()
    expect(is_expired).to.be.true
  })

  it('It should not be expired', async () => {
    await twitter.regenerate_guest_token()
    const is_expired = twitter.is_guest_token_expired()
    expect(is_expired).to.be.false
  })
})
