import { onUnmounted, ref, watchEffect } from 'vue'

export const topbarTitle = ref<string | null>(null)

export function usePageTitle(source: () => string): void {
  watchEffect(() => {
    const value = source()
    topbarTitle.value = value
    document.title = `${value} · 崴食家`
  })

  onUnmounted(() => {
    topbarTitle.value = null
  })
}
