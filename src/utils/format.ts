export function formatPrice(price: number | null): string {
  if (price === null) return '待补'
  return `¥${Number.isInteger(price) ? price : price.toFixed(1)}`
}

export function formatRange(range: [number, number] | null): string {
  if (!range) return '价格待补'
  const [min, max] = range
  const short = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(1))
  if (min === max) return `¥${short(min)}`
  return `¥${short(min)}–${short(max)}`
}

export function floorLabel(floor: number | null): string {
  return floor === null ? '?' : `${floor}F`
}

export function floorName(floor: number | null): string {
  if (floor === null) return '楼层待核实'
  const names = ['', '一', '二', '三', '四', '五']
  return `${names[floor] ?? floor}楼`
}

export function dishCountLabel(count: number): string {
  return `${count} 道`
}
