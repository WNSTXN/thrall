export interface Media {
  id: number
  id_str: `${number}`
  indices: number[]
  media_url: string
  media_url_https: string
  url: string
  display_url: string
  expanded_url: string
  type: 'photo' | 'video' | 'animated_gif'
  original_info: {
    width: number
    height: number
    focus_rects: object[]
  }
  sizes: object
}
