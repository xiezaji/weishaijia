export interface NearbyShop {
  id: string
  name: string
  category: string
  area: string
  distance: number
  score: number
  avgPrice: number
  tags: string[]
  lng: number
  lat: number
}

export const nearbyMeta = {
  source: '高德地图',
  collectedAt: '2026-10-29',
  note: '评分、人均与距离来自高德地图公开数据（2026-10-29 采集），仅供参考；营业状态以现场为准。',
} as const

export const nearbyShops: NearbyShop[] = [
  {
    id: 'orange-sea',
    name: '橙海咖啡',
    category: '咖啡 · 酒吧',
    area: '沈阳路',
    distance: 191,
    score: 4.7,
    avgPrice: 88,
    tags: ['海景', '咖啡', '酒馆'],
    lng: 122.05147,
    lat: 37.530769,
  },
  {
    id: 'lao-cishen',
    name: '老刺参·海鲜宴',
    category: '海鲜 · 宴请',
    area: '沈阳路',
    distance: 218,
    score: 4.6,
    avgPrice: 94,
    tags: ['海鲜', '鲅鱼水饺', '宴请'],
    lng: 122.051255,
    lat: 37.530588,
  },
  {
    id: 'ju-baixiang',
    name: '聚百香海鲜川鲁菜',
    category: '海鲜 · 鲁菜',
    area: '北环海路',
    distance: 323,
    score: 4.6,
    avgPrice: 55,
    tags: ['海鲜', '家常菜', '海肠捞饭'],
    lng: 122.050059,
    lat: 37.530297,
  },
  {
    id: 'rushi-hai',
    name: '如是·海 本地菜',
    category: '本地菜 · 海鲜',
    area: '北环海路',
    distance: 361,
    score: 4.6,
    avgPrice: 60,
    tags: ['本地菜', '海肠捞饭', '海鲜烧烤'],
    lng: 122.049706,
    lat: 37.530106,
  },
  {
    id: 'sugarsea',
    name: 'Sugarsea Gelato',
    category: '冰淇淋 · 甜品',
    area: '北环海路',
    distance: 384,
    score: 4.6,
    avgPrice: 30,
    tags: ['冰淇淋', '甜品', '海景'],
    lng: 122.049496,
    lat: 37.529988,
  },
  {
    id: 'feiyu-moshu',
    name: '非鱼莫蜀烤鱼',
    category: '烤鱼 · 夜宵',
    area: '文化西路',
    distance: 575,
    score: 4.5,
    avgPrice: 55,
    tags: ['烤鱼', '海鲜', '夜宵'],
    lng: 122.055999,
    lat: 37.527125,
  },
  {
    id: 'hanxiangfu',
    name: '韩香福烤肉庄园',
    category: '韩式烤肉',
    area: '文化西路',
    distance: 809,
    score: 4.7,
    avgPrice: 85,
    tags: ['烤肉', '韩餐', '聚餐'],
    lng: 122.054826,
    lat: 37.524642,
  },
  {
    id: 'xushengji',
    name: '徐升记不改良老火锅',
    category: '重庆火锅',
    area: '文化西路',
    distance: 813,
    score: 4.7,
    avgPrice: 79,
    tags: ['火锅', '聚餐', '老火锅'],
    lng: 122.05432,
    lat: 37.524546,
  },
  {
    id: 'baoge',
    name: '宝哥串串香',
    category: '串串香',
    area: '滨州南街',
    distance: 1240,
    score: 4.7,
    avgPrice: 23,
    tags: ['串串', '平价', '夜宵'],
    lng: 122.066503,
    lat: 37.528194,
  },
  {
    id: 'wangshuling',
    name: '王淑玲下饭菜',
    category: '川菜 · 家常',
    area: '滨州南街',
    distance: 1351,
    score: 4.7,
    avgPrice: 29,
    tags: ['下饭菜', '川菜', '现炒'],
    lng: 122.067821,
    lat: 37.52816,
  },
]

export function getShop(id: string): NearbyShop | undefined {
  return nearbyShops.find((shop) => shop.id === id)
}

export function amapUrl(shop: NearbyShop): string {
  const name = encodeURIComponent(shop.name)
  return `https://uri.amap.com/marker?position=${shop.lng},${shop.lat}&name=${name}&src=${encodeURIComponent('崴食家')}&coordinate=gaode&callnative=0`
}

export function distanceLabel(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)}km` : `${meters}m`
}
