import { APP } from '../config'
import type { Canteen, CanteenId, Dish, Quote, Window } from './types'

const CHANNEL = '腾讯频道 · 小黄鸭星球'
const OFFICIAL = {
  officialSource: APP.official.name,
  officialUrl: APP.official.url,
}
const MAP_SOURCE = {
  officialSource: APP.mapSource.name,
  officialUrl: APP.mapSource.url,
}

const URL_NO8 = 'https://pd.qq.com/s/7u4gdvotl'
const URL_EGG = 'https://pd.qq.com/g/SduwerHome1/post/B_1803e06ab2e801001441152187144351730X60'
const URL_RICEBALL = 'https://pd.qq.com/g/SduwerHome1/post/B_383c296a5db506001441152186940187750X60'
const URL_DUCKLEG = 'https://pd.qq.com/g/SduwerHome1/post/B_6ef6cd69844707001441152186684196510X60'
const URL_ROASTDUCK = 'https://pd.qq.com/g/SduwerHome1/post/B_6f12df6909470a001441152195892152150X60'

function dish(
  id: string,
  name: string,
  category: string,
  price: number | null,
  extra: Partial<Dish> = {},
): Dish {
  return { id, name, category, price, ...extra }
}

function quote(id: string, text: string, url: string, date: string): Quote {
  return { id, text, platform: CHANNEL, date, url }
}

export const canteens: Canteen[] = [
  {
    id: 'xinyuan',
    name: '馨园',
    latin: 'XINYUAN',
    index: '01',
    accent: '#E8503A',
    accentSoft: '#FFE8E0',
    accentInk: '#B83823',
    intro: '三层，早餐、盖饭、自选都有，早上最热闹。',
    note: '楼层数有“三层”和“四层”两种公开说法，本目录按三层记录，以现场为准。',
  },
  {
    id: 'huiyuan',
    name: '荟园',
    latin: 'HUIYUAN',
    index: '02',
    accent: '#C07A16',
    accentSoft: '#FFF1D6',
    accentInk: '#8A5310',
    intro: '两层。盖浇饭和鸡公煲是官方榜前排，饭点排队明显。',
    note: '客莱茵的楼层暂未在公开资料中找到，先标为待核实。',
  },
  {
    id: 'queyuan',
    name: '雀园',
    latin: 'QUEYUAN',
    index: '03',
    accent: '#5C8C3B',
    accentSoft: '#EEF7DF',
    accentInk: '#41682A',
    intro: '窗口不多，麻辣烫和自选饭团是频道里常被提到的两样。',
    note: '公开资料没有给出雀园窗口的具体楼层，暂按待核实处理。',
  },
  {
    id: 'taiyuan',
    name: '泰园',
    latin: 'TAIYUAN',
    index: '04',
    accent: '#8A5BC2',
    accentSoft: '#F3EAFB',
    accentInk: '#68409C',
    intro: '三楼窗口密集，卤鸭腿、烧鸭饭和豆花捞饭都在这一层。',
    note: '频道里常把“泰园”写作“泰元”，本目录统一记为“泰园”。',
  },
]

export const windows: Window[] = [
  {
    id: 'xy-bread',
    canteenId: 'xinyuan',
    floor: 1,
    name: '面包烘焙',
    tags: ['烘焙', '早餐'],
    position: null,
    officialRank: 1,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('xy-bread-1', '现烤面包', '烘焙', 6, { estimated: true }),
      dish('xy-bread-2', '蛋挞', '烘焙', 3.5, { estimated: true, priceNote: '单个' }),
      dish('xy-bread-3', '吐司', '烘焙', 12, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'xy-soy',
    canteenId: 'xinyuan',
    floor: 1,
    name: '豆浆',
    tags: ['早餐', '饮品'],
    position: null,
    officialRank: 5,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('xy-soy-1', '现磨豆浆', '饮品', 3, { estimated: true }),
      dish('xy-soy-2', '油条', '早餐', 2.5, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'xy-duck',
    canteenId: 'xinyuan',
    floor: 2,
    name: '烤鸭饭',
    tags: ['烤鸭', '盖饭'],
    position: null,
    officialRank: 2,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('xy-duck-1', '烤鸭饭', '盖饭', 13, { estimated: true }),
      dish('xy-duck-2', '双拼烤鸭饭', '盖饭', 16, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'xy-happy',
    canteenId: 'xinyuan',
    floor: 2,
    name: '快乐星手工汉堡',
    tags: ['汉堡', '快餐'],
    position: null,
    officialRank: 3,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('xy-happy-1', '香辣鸡腿堡', '快餐', 12, { estimated: true }),
      dish('xy-happy-2', '薯条', '小食', 8, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'xy-noodle',
    canteenId: 'xinyuan',
    floor: 2,
    name: '牛杂面',
    tags: ['面食', '汤面'],
    position: null,
    officialRank: 4,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('xy-noodle-1', '牛杂面', '面食', 14, { estimated: true }),
      dish('xy-noodle-2', '红烧牛肉面', '面食', 15, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'xy-no8',
    canteenId: 'xinyuan',
    floor: 3,
    name: '八号窗口',
    alias: '奶奶家大酱骨',
    tags: ['自选', '盖饭', '家常'],
    position: '馨园三楼，老式烫菜旁边',
    officialRank: null,
    basis: 'channel',
    sourceName: CHANNEL,
    sourceUrl: URL_NO8,
    status: 'open',
    addedAt: '10 月',
    note: '13.8 元小份随便选菜，由阿姨打菜；碗上写着“奶奶家大酱骨”。',
    dishes: [
      dish('xy-no8-1', '小份自选饭', '盖饭', 13.8, { priceNote: '13.8 元随便选菜，小份畅吃' }),
      dish('xy-no8-2', '自选凉菜', '凉菜', null, { priceNote: '价格待补录' }),
    ],
    quotes: [
      quote(
        'q-xy-no8-1',
        '馨园三楼八号窗口的美味饭终于回来了！！！13.8 小份畅吃，吃起来有一种家里做的饭的味道',
        URL_NO8,
        '10 月',
      ),
      quote(
        'q-xy-no8-2',
        '就像妈妈盖浇饭一样让阿姨打菜，不过价格是 13.8 随便选菜。',
        URL_NO8,
        '10 月',
      ),
      quote('q-xy-no8-3', '从大一吃到大三的窗口，很庆幸没有倒闭。', URL_NO8, '10 月'),
    ],
  },

  {
    id: 'hy-congee',
    canteenId: 'huiyuan',
    floor: 1,
    name: '营养粥饮',
    tags: ['粥品', '早餐'],
    position: null,
    officialRank: 4,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('hy-congee-1', '皮蛋瘦肉粥', '粥品', 6, { estimated: true }),
      dish('hy-congee-2', '南瓜粥', '粥品', 5, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'hy-mama',
    canteenId: 'huiyuan',
    floor: 2,
    name: '妈妈盖浇饭',
    tags: ['盖浇饭', '家常'],
    position: null,
    officialRank: 1,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('hy-mama-1', '番茄炒蛋盖饭', '盖饭', 12, { estimated: true }),
      dish('hy-mama-2', '宫保鸡丁盖饭', '盖饭', 13, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'hy-chicken',
    canteenId: 'huiyuan',
    floor: 2,
    name: '重庆鸡公煲',
    tags: ['鸡公煲', '聚餐'],
    position: null,
    officialRank: 2,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('hy-chicken-1', '鸡公煲（小份）', '鸡公煲', 18, { estimated: true }),
      dish('hy-chicken-2', '鸡公煲（双人）', '鸡公煲', 32, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'hy-yizhi',
    canteenId: 'huiyuan',
    floor: 2,
    name: '一纸鸡',
    tags: ['鸡肉', '快餐'],
    position: null,
    officialRank: 5,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('hy-yizhi-1', '纸包鸡', '鸡肉', 15, { estimated: true }),
      dish('hy-yizhi-2', '手撕鸡饭', '盖饭', 14, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'hy-kelaiyin',
    canteenId: 'huiyuan',
    floor: null,
    name: '客莱茵',
    tags: ['西式', '快餐'],
    position: '楼层待核实',
    officialRank: 3,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('hy-kelaiyin-1', '香煎鸡排饭', '西式', 15, { estimated: true }),
      dish('hy-kelaiyin-2', '番茄意面', '西式', 14, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'hy-egg',
    canteenId: 'huiyuan',
    floor: 2,
    name: '滑蛋饭',
    tags: ['滑蛋', '甜口', '新窗口'],
    position: '荟园二楼，具体窗口待补录',
    officialRank: null,
    basis: 'channel',
    sourceName: CHANNEL,
    sourceUrl: URL_EGG,
    status: 'open',
    addedAt: '10-27',
    note: '频道里 10 月 27 日提到的新窗口，加温泉蛋共 15 元。',
    dishes: [
      dish('hy-egg-1', '滑蛋饭', '盖饭', 13, { priceNote: '加温泉蛋共 15 元' }),
      dish('hy-egg-2', '温泉蛋', '加料', 2),
    ],
    quotes: [
      quote(
        'q-hy-egg-1',
        '山威第一份滑蛋饭✌（荟二，甜口星人狂喜，加温泉蛋 15r）',
        URL_EGG,
        '10-27',
      ),
    ],
  },

  {
    id: 'qy-mala',
    canteenId: 'queyuan',
    floor: null,
    name: '麻辣烫',
    tags: ['麻辣烫', '自选'],
    position: '楼层待核实',
    officialRank: 1,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [dish('qy-mala-1', '自选麻辣烫', '麻辣烫', 12, { estimated: true, priceNote: '12 元起' })],
    quotes: [],
  },
  {
    id: 'qy-riceball',
    canteenId: 'queyuan',
    floor: null,
    name: '自选饭团',
    tags: ['饭团', '便携'],
    position: '雀园自选区（楼层待核实）',
    officialRank: null,
    basis: 'channel',
    sourceName: CHANNEL,
    sourceUrl: URL_RICEBALL,
    status: 'unknown',
    addedAt: '10 月',
    note: '频道帖子提到阿姨因销量不好想撤掉这个品，去之前先看一眼。',
    dishes: [
      dish('qy-riceball-1', '招牌饭团', '饭团', 7, { estimated: true }),
      dish('qy-riceball-2', '咸蛋黄饭团', '饭团', 8, { estimated: true }),
      dish('qy-riceball-3', '蟹柳饭团', '饭团', 9, { estimated: true }),
    ],
    quotes: [
      quote(
        'q-qy-riceball-1',
        '同学们！我要强烈安利这个雀园自选里的饭团……但是阿姨说最近卖的不好要撤了，momo 真的舍不得爱吃的东西这么被埋没。',
        URL_RICEBALL,
        '10 月',
      ),
      quote(
        'q-qy-riceball-2',
        '饭团是有点油的，依 momo 目测里面有肉松、胡萝卜、香肠、白芝麻、紫菜、不知道是莴笋还是黄瓜等食材。',
        URL_RICEBALL,
        '10 月',
      ),
    ],
  },

  {
    id: 'ty-qiangban',
    canteenId: 'taiyuan',
    floor: 2,
    name: '炝拌菜',
    tags: ['凉菜', '小份'],
    position: null,
    officialRank: 1,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [
      dish('ty-qb-1', '炝拌土豆丝', '凉菜', 4, { estimated: true }),
      dish('ty-qb-2', '炝拌木耳', '凉菜', 5, { estimated: true }),
    ],
    quotes: [],
  },
  {
    id: 'ty-mala',
    canteenId: 'taiyuan',
    floor: 3,
    name: '麻辣烫',
    tags: ['麻辣烫', '自选'],
    position: null,
    officialRank: 2,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [dish('ty-mala-1', '自选麻辣烫', '麻辣烫', 12, { estimated: true, priceNote: '12 元起' })],
    quotes: [],
  },
  {
    id: 'ty-chicken',
    canteenId: 'taiyuan',
    floor: 3,
    name: '摇滚炒鸡',
    tags: ['炒鸡', '下饭'],
    position: null,
    officialRank: 3,
    ...OFFICIAL,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025-04',
    dishes: [dish('ty-chicken-1', '摇滚炒鸡（小份）', '炒鸡', 16, { estimated: true })],
    quotes: [],
  },
  {
    id: 'ty-douhua',
    canteenId: 'taiyuan',
    floor: 3,
    name: '豆花捞饭',
    tags: ['豆花', '捞饭'],
    position: null,
    officialRank: null,
    ...MAP_SOURCE,
    basis: 'official',
    status: 'unknown',
    addedAt: '2025',
    dishes: [dish('ty-douhua-1', '豆花捞饭', '捞饭', 12, { estimated: true })],
    quotes: [],
  },
  {
    id: 'ty-lamian',
    canteenId: 'taiyuan',
    floor: 3,
    name: '兰州拉面',
    tags: ['拉面', '汤面'],
    position: '豆花捞饭旁边（待核实）',
    officialRank: null,
    basis: 'channel',
    sourceName: CHANNEL,
    sourceUrl: URL_ROASTDUCK,
    status: 'unknown',
    addedAt: '10 月',
    note: '频道帖在描述烧鸭饭位置时提到过这个窗口，具体信息待补录。',
    dishes: [dish('ty-lamian-1', '牛肉拉面', '面食', 12, { estimated: true })],
    quotes: [],
  },
  {
    id: 'ty-duckleg',
    canteenId: 'taiyuan',
    floor: 3,
    name: '卤鸭腿饭',
    tags: ['卤味', '减脂', '凉菜'],
    position: '泰园三楼上电梯后向后转身，团结餐厅正对面',
    officialRank: null,
    basis: 'channel',
    sourceName: CHANNEL,
    sourceUrl: URL_DUCKLEG,
    status: 'open',
    addedAt: '10 月',
    note: '打包 14 元；米饭和阿姨做的凉菜也被提到。',
    dishes: [
      dish('ty-duckleg-1', '卤鸭腿饭', '盖饭', 14, { priceNote: '打包价；米饭与凉菜以现场为准' }),
    ],
    quotes: [
      quote(
        'q-ty-duckleg-1',
        '最近刷到 momo 推荐的减脂餐，这个卤鸭腿饭，今天去了感觉好大一份，而且阿姨做的凉菜都很好吃，鸭腿也很大一个，好评～',
        URL_DUCKLEG,
        '10 月',
      ),
      quote('q-ty-duckleg-2', '这一份我打包 14r。', URL_DUCKLEG, '10 月'),
      quote(
        'q-ty-duckleg-3',
        '在泰园三楼上电梯后往后转身第一个窗口，就是团结餐厅的正对面。',
        URL_DUCKLEG,
        '10 月',
      ),
    ],
  },
  {
    id: 'ty-roastduck',
    canteenId: 'taiyuan',
    floor: 3,
    name: '烧鸭饭',
    tags: ['烧鸭', '米饭', '咸鸭蛋'],
    position: '大概在兰州拉面与豆花捞饭之间（窗口号待核实）',
    officialRank: null,
    basis: 'channel',
    sourceName: CHANNEL,
    sourceUrl: URL_ROASTDUCK,
    status: 'open',
    addedAt: '10 月',
    note: '小份 13 元，配半个咸鸭蛋；米饭畅吃。',
    dishes: [
      dish('ty-roast-1', '小份烧鸭饭', '盖饭', 13, { priceNote: '配半个咸鸭蛋' }),
      dish('ty-roast-2', '大份烧鸭饭', '盖饭', 15, { estimated: true }),
    ],
    quotes: [
      quote(
        'q-ty-roast-1',
        '好久没吃啦，泰园小份烧鸭饭变得好大一份呀哈哈哈，还有半个咸鸭蛋～',
        URL_ROASTDUCK,
        '10 月',
      ),
      quote('q-ty-roast-2', '小份的 13 元。', URL_ROASTDUCK, '10 月'),
      quote(
        'q-ty-roast-3',
        '周末还送雪碧可乐的不知道现在还送么，米饭还畅吃。',
        URL_ROASTDUCK,
        '10 月',
      ),
    ],
  },
]

const canteenById = new Map(canteens.map((canteen) => [canteen.id, canteen]))
const windowById = new Map(windows.map((win) => [win.id, win]))

export function getCanteen(id: string): Canteen | undefined {
  return canteenById.get(id as CanteenId)
}

export function getWindow(id: string): Window | undefined {
  return windowById.get(id)
}

export function windowsOf(canteenId: CanteenId): Window[] {
  return windows
    .filter((win) => win.canteenId === canteenId)
    .sort((a, b) => (a.floor ?? 99) - (b.floor ?? 99) || (a.officialRank ?? 99) - (b.officialRank ?? 99))
}

export function getCanteenFloors(canteenId: CanteenId): number[] {
  const floors = new Set<number>()
  windowsOf(canteenId).forEach((win) => {
    if (win.floor !== null) floors.add(win.floor)
  })
  return [...floors].sort((a, b) => a - b)
}

export function priceRangeOf(win: Window): [number, number] | null {
  const prices = win.dishes
    .map((item) => item.price)
    .filter((price): price is number => price !== null)
  if (!prices.length) return null
  return [Math.min(...prices), Math.max(...prices)]
}

export function rankedWindowsOf(canteenId: CanteenId): Window[] {
  return windowsOf(canteenId).filter((win) => win.officialRank !== null)
}

export const catalogStats = {
  canteens: canteens.length,
  windows: windows.length,
  dishes: windows.reduce((total, win) => total + win.dishes.length, 0),
  quotes: windows.reduce((total, win) => total + win.quotes.length, 0),
  ranked: windows.filter((win) => win.officialRank !== null).length,
}
