export interface Plate {
  id: string
  src: string
  alt: string
  title: string
  note: string
  postUrl: string
}

const POST = 'https://pd.qq.com/g/SduwerHome1/post/'
const IMG = `${import.meta.env.BASE_URL}img/channel/`

export const plates: Plate[] = [
  {
    id: 'douhua',
    src: `${IMG}douhua.webp`,
    alt: '不锈钢碗里的冒豆花，豆花、肉卷、青菜和红汤',
    title: '冒豆花',
    note: '泰园三楼',
    postUrl: `${POST}B_178fd56a5f410c001441152191438457840X60`,
  },
  {
    id: 'roastduck',
    src: `${IMG}roastduck.webp`,
    alt: '烧鸭饭配青菜和咸鸭蛋',
    title: '烧鸭饭',
    note: '泰园三楼',
    postUrl: `${POST}B_126b1a6a6fdc08001441152191968479980X60`,
  },
  {
    id: 'burger',
    src: `${IMG}burger.webp`,
    alt: '芝士土豆泥汉堡，双层肉饼和煎蛋',
    title: '土豆泥汉堡',
    note: '馨园 · 快乐星',
    postUrl: `${POST}B_1919c76a0cbc0c001441152196015403690X60`,
  },
  {
    id: 'mala',
    src: `${IMG}mala.webp`,
    alt: '红汤麻辣烫，配菜、鹌鹑蛋和汤面',
    title: '麻辣烫',
    note: '校内窗口',
    postUrl: `${POST}B_ad56266ad04f06001441152191438457840X60`,
  },
  {
    id: 'liangpi',
    src: `${IMG}liangpi.webp`,
    alt: '白碗凉皮，黄瓜丝配辣椒油',
    title: '凉皮',
    note: '泰园三楼',
    postUrl: `${POST}B_7ee3986a1afe0c001441152191438457840X60`,
  },
  {
    id: 'riceball',
    src: `${IMG}riceball.webp`,
    alt: '食堂不锈钢餐盘：煎蛋、青菜、鸡块和紫米饭',
    title: '自选一餐',
    note: '雀园 · 自选',
    postUrl: `${POST}B_383c296a5db506001441152186940187750X60`,
  },
]
