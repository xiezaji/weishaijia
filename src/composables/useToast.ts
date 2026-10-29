import { ref } from 'vue'

interface ToastItem {
  id: number
  message: string
}

export const toastItems = ref<ToastItem[]>([])
let cursor = 0

export function toast(message: string): void {
  const id = ++cursor
  toastItems.value = [...toastItems.value, { id, message }]
  window.setTimeout(() => {
    toastItems.value = toastItems.value.filter((item) => item.id !== id)
  }, 2400)
}
