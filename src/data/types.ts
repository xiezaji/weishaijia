export type CanteenId = 'xinyuan' | 'huiyuan' | 'queyuan' | 'taiyuan'

export interface Canteen {
  id: CanteenId
  name: string
  latin: string
  index: string
  accent: string
  accentSoft: string
  accentInk: string
  intro: string
  note?: string
}

export interface Dish {
  id: string
  name: string
  category: string
  price: number | null
  priceNote?: string
  estimated?: boolean
  note?: string
}

export interface Quote {
  id: string
  text: string
  platform: string
  date: string
  url: string
}

export interface Photo {
  src: string
  alt: string
  credit: string
  postUrl: string
}

export interface Window {
  id: string
  canteenId: CanteenId
  floor: number | null
  name: string
  alias?: string
  tags: string[]
  position: string | null
  officialRank: number | null
  officialSource?: string
  officialUrl?: string
  sourceName?: string
  sourceUrl?: string
  basis: 'official' | 'channel' | 'mixed'
  status: 'open' | 'unknown'
  addedAt: string
  note?: string
  dishes: Dish[]
  quotes: Quote[]
  photos?: Photo[]
}
