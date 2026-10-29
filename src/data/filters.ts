import { getCanteen, priceRangeOf, windows } from './catalog'
import { nearbyShops, type NearbyShop } from './nearby'
import type { CanteenId, Window } from './types'

export type PlaceKey = CanteenId | 'all' | 'outside'

export interface FilterState {
  place: PlaceKey
  priceMin: number | null
  priceMax: number | null
  food: string
}

export const PLACES: { key: PlaceKey; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'xinyuan', label: '馨园' },
  { key: 'huiyuan', label: '荟园' },
  { key: 'queyuan', label: '雀园' },
  { key: 'taiyuan', label: '泰园' },
  { key: 'outside', label: '校外' },
]

export const FOOD_KINDS: { key: string; label: string; keywords: string[] }[] = [
  { key: 'all', label: '不限', keywords: [] },
  {
    key: 'rice',
    label: '米饭套餐',
    keywords: ['盖饭', '盖浇饭', '捞饭', '米饭', '饭团', '滑蛋', '炒饭', '汤饭', '拌饭', '饭'],
  },
  { key: 'noodle', label: '面食粉面', keywords: ['面食', '汤面', '拉面', '米线', '冷面', '炸酱面', '粉'] },
  {
    key: 'pot',
    label: '麻辣烫 · 锅物',
    keywords: ['麻辣烫', '鸡公煲', '冒菜', '冒豆花', '火锅', '串串', '铁锅炖'],
  },
  { key: 'breakfast', label: '早餐 · 烘焙', keywords: ['早餐', '烘焙', '粥', '饮品', '豆浆', '面包'] },
  { key: 'fastfood', label: '汉堡 · 快餐', keywords: ['汉堡', '快餐', '西式'] },
  { key: 'roast', label: '烧腊 · 凉菜', keywords: ['凉菜', '卤味', '烧鸭', '烤鸭', '卤'] },
  {
    key: 'stirfry',
    label: '家常炒菜',
    keywords: ['炒鸡', '鸡肉', '家常', '下饭', '炒菜', '川菜', '鲁菜', '现炒'],
  },
  { key: 'bbq', label: '烧烤 · 海鲜', keywords: ['烧烤', '烤肉', '烤鱼', '海鲜', '大排档'] },
  { key: 'cafe', label: '咖啡 · 甜品', keywords: ['咖啡', '甜品', '冰淇淋', '冰品', '蛋糕', '茶饮'] },
]

export function emptyFilters(): FilterState {
  return { place: 'all', priceMin: null, priceMax: null, food: 'all' }
}

function priceBounds(filters: FilterState): { min: number; max: number } {
  return {
    min: filters.priceMin ?? 0,
    max: filters.priceMax ?? Infinity,
  }
}

function kindOf(filters: FilterState) {
  return FOOD_KINDS.find((item) => item.key === filters.food) ?? FOOD_KINDS[0]
}

function haystack(win: Window): string {
  return [
    win.name,
    win.alias,
    win.tags.join(' '),
    win.note,
    ...win.dishes.map((dish) => `${dish.category} ${dish.name}`),
  ]
    .filter(Boolean)
    .join(' ')
}

export function filterWindows(filters: FilterState): Window[] {
  if (filters.place === 'outside') return []

  const { min, max } = priceBounds(filters)
  if (min > max) return []
  const kind = kindOf(filters)
  const hasPrice = filters.priceMin !== null || filters.priceMax !== null

  return windows.filter((win) => {
    if (filters.place !== 'all' && win.canteenId !== filters.place) return false

    if (hasPrice) {
      const range = priceRangeOf(win)
      if (!range || range[1] < min || range[0] > max) return false
    }

    if (kind.keywords.length) {
      const text = haystack(win)
      if (!kind.keywords.some((word) => text.includes(word))) return false
    }

    return true
  })
}

export function filterNearby(filters: FilterState): NearbyShop[] {
  const { min, max } = priceBounds(filters)
  if (min > max) return []
  const kind = kindOf(filters)

  return nearbyShops.filter((shop) => {
    if (shop.avgPrice < min || shop.avgPrice > max) return false

    if (kind.keywords.length) {
      const text = [shop.name, shop.category, shop.area, shop.tags.join(' ')].join(' ')
      if (!kind.keywords.some((word) => text.includes(word))) return false
    }

    return true
  })
}

export function placeLabel(key: PlaceKey): string {
  if (key === 'all') return '全部食堂'
  if (key === 'outside') return '校外'
  return getCanteen(key)?.name ?? ''
}
