interface GuestTokenResponse {
  guest_token: string
}

export class Twitter {
  private api_url: string
  private guest_token: string | undefined
  private guest_token_created_at: number | undefined
  static_headers: Record<string, string>

  constructor() {
    this.api_url = 'https://api.twitter.com/'
    this.guest_token = undefined
    this.guest_token_created_at = undefined

    this.static_headers = {
      Authorization:
        'Bearer AAAAAAAAAAAAAAAAAAAAAPYXBAAAAAAACLXUNDekMxqa8h%2F40K4moUkGsoc%3DTYfbDKbT3jJPCEVnMYqilB28NHfOPqkca3qaAxGfsyKCs0wRbw'
    }
  }

  private async fetch_guest_token(): Promise<GuestTokenResponse> {
    const request = await this.request('1.1/guest/activate.json', {
      method: 'POST',
      headers: this.static_headers
    })

    return request.json() as Promise<GuestTokenResponse>
  }

  is_guest_token_expired(): boolean {
    return !this.guest_token_created_at || Date.now() - this.guest_token_created_at >= 1.08e7
  }

  async regenerate_guest_token(): Promise<string> {
    this.guest_token_created_at = Date.now()
    const response = await this.fetch_guest_token()
    return response.guest_token
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    return fetch(new URL(endpoint, this.api_url), options)
  }

  async authorised_request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    this.guest_token =
      !this.guest_token || this.is_guest_token_expired() ? await this.regenerate_guest_token() : this.guest_token

    return this.request(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        ...this.static_headers,
        'X-Guest-Token': this.guest_token
      }
    })
  }
}
