import { Twitter } from '@/api'
import { expect } from 'chai'

describe('regenerate_guest_token', () => {
  const twitter = new Twitter()

  it('It should return a valid guest token', async () => {
    const guest_token = await twitter.regenerate_guest_token()
    expect(guest_token).to.be.a('string')
  })

  it('It should not be a number', async () => {
    const guest_token = await twitter.regenerate_guest_token()
    expect(guest_token).to.not.be.a('number')
  })
})
