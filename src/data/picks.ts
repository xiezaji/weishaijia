import { getCanteen, priceRangeOf } from './catalog'
import { distanceLabel, type NearbyShop } from './nearby'
import type { Window } from './types'
import { floorLabel, floorName, formatRange } from '../utils/format'

export interface PickItem {
  id: string
  name: string
  meta: string
  tags: string[]
  href: string
  score: number | null
}

export function windowPick(win: Window): PickItem {
  const canteen = getCanteen(win.canteenId)
  const range = priceRangeOf(win)
  return {
    id: win.id,
    name: win.name,
    meta: [canteen?.name, `${floorLabel(win.floor)} ${floorName(win.floor)}`, range ? formatRange(range) : '价格待补']
      .filter(Boolean)
      .join(' · '),
    tags: win.tags,
    href: `/canteen/${win.canteenId}/window/${win.id}`,
    score: null,
  }
}

export function shopPick(shop: NearbyShop): PickItem {
  return {
    id: shop.id,
    name: shop.name,
    meta: `校外 · ${shop.category} · ${distanceLabel(shop.distance)} · 人均 ¥${shop.avgPrice}`,
    tags: shop.tags,
    href: `/shop/${shop.id}`,
    score: shop.score,
  }
}
