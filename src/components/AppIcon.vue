<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 18 })

const ICONS: Record<string, string[]> = {
  search: ['M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z', 'm15.7 15.7 4.3 4.3'],
  back: ['M14.5 5 7.5 12l7 7'],
  arrow: ['M5 12h13', 'm12.5 6 6 6-6 6'],
  chevron: ['m9 6 6 6-6 6'],
  location: ['M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z', 'M14.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'],
  info: ['M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z', 'M12 11v5', 'M12 7.7v.4'],
  share: ['M12 15V3', 'M8 7l4-4 4 4', 'M5 13v6h14v-6'],
  alert: ['M12 4 3 20h18L12 4Z', 'M12 10v4', 'M12 17.2v.3'],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  check: ['m5 12 5 5L19 7'],
  bowl: [
    'M4 11h16a8 8 0 0 1-16 0Z',
    'M8 7c0-1.5 1-2 1-3',
    'M12 7c0-1.5 1-2 1-3',
    'M16 7c0-1.5 1-2 1-3',
  ],
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  compass: [
    'M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z',
    'm15.5 8.5-2 5-5 2 2-5 5-2Z',
  ],
  external: ['M14 4h6v6', 'M20 4l-8 8', 'M19 14v5H5V5h5'],
  clock: ['M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z', 'M12 7v5l3 2'],
}

const paths = computed(() => ICONS[props.name] ?? ICONS.info)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, index) in paths" :key="index" :d="d" />
  </svg>
</template>
