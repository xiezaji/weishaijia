<script setup lang="ts">
import { computed } from 'vue'
import type { Canteen, Window } from '../data/types'
import { priceRangeOf } from '../data/catalog'
import { floorLabel, formatRange } from '../utils/format'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{
    window: Window
    canteen: Canteen
    showCanteen?: boolean
  }>(),
  { showCanteen: false },
)

const to = computed(() => `/canteen/${props.window.canteenId}/window/${props.window.id}`)

const subline = computed(() => {
  const parts: string[] = []
  if (props.showCanteen) parts.push(props.canteen.name, floorLabel(props.window.floor))
  parts.push(...props.window.tags)
  if (props.window.position && !props.showCanteen) parts.push(props.window.position)
  return parts.join(' · ')
})

const range = computed(() => formatRange(priceRangeOf(props.window)))

const accentStyle = computed(() => ({
  '--row-accent': props.canteen.accentInk,
  '--row-soft': props.canteen.accentSoft,
}))
</script>

<template>
  <RouterLink class="wrow" :to="to" :style="accentStyle">
    <span class="wrow-code">
      <b>{{ floorLabel(window.floor) }}</b>
      <span>{{ window.floor === null ? 'TBD' : 'FLOOR' }}</span>
    </span>
    <span class="wrow-body">
      <span class="wrow-top">
        <span class="wrow-name">{{ window.name }}</span>
        <span v-if="window.officialRank" class="wrow-rank">官榜 {{ window.officialRank }}</span>
      </span>
      <span class="wrow-sub">{{ subline }}</span>
    </span>
    <span class="wrow-side">
      <span class="wrow-price" :class="{ pending: range === '价格待补' }">{{ range }}</span>
      <AppIcon name="chevron" :size="15" class="wrow-arrow" />
    </span>
  </RouterLink>
</template>
