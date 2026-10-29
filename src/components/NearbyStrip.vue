<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { distanceLabel, nearbyMeta, nearbyShops } from '../data/nearby'
import AppIcon from './AppIcon.vue'

const track = ref<HTMLElement | null>(null)
let timer: number | undefined
let resumeTimer: number | undefined
let paused = false

function advance(): void {
  const el = track.value
  if (!el || paused) return
  const card = el.querySelector<HTMLElement>('.ncard')
  if (!card) return
  const max = el.scrollWidth - el.clientWidth
  if (el.scrollLeft >= max - 4) {
    el.scrollTo({ left: 0, behavior: 'auto' })
  } else {
    el.scrollTo({ left: Math.min(el.scrollLeft + card.offsetWidth + 10, max), behavior: 'smooth' })
  }
}

function pause(): void {
  paused = true
  window.clearTimeout(resumeTimer)
}

function resume(): void {
  window.clearTimeout(resumeTimer)
  resumeTimer = window.setTimeout(() => {
    paused = false
  }, 2600)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(advance, 4600)
})

onUnmounted(() => {
  window.clearInterval(timer)
  window.clearTimeout(resumeTimer)
})
</script>

<template>
  <section class="home-sec home-nearby" aria-labelledby="nearby-title">
    <header class="home-sec-head">
      <h2 id="nearby-title">周边美食</h2>
      <span>高德评分 · {{ nearbyShops.length }} 家</span>
    </header>
    <div
      ref="track"
      class="nearby-track"
      tabindex="0"
      role="region"
      aria-label="校外美食店铺，可横向滚动"
      @pointerdown="pause"
      @pointerup="resume"
      @pointerleave="resume"
      @focusin="pause"
      @focusout="resume"
    >
      <RouterLink
        v-for="shop in nearbyShops"
        :key="shop.id"
        class="ncard"
        :to="`/shop/${shop.id}`"
      >
        <span class="ncard-top">
          <span class="ncard-score"><b class="num">{{ shop.score.toFixed(1) }}</b><i>高德</i></span>
          <span class="ncard-dist num">{{ distanceLabel(shop.distance) }}</span>
        </span>
        <span class="ncard-name">{{ shop.name }}</span>
        <span class="ncard-cat">{{ shop.category }}</span>
        <span class="ncard-tags">{{ shop.tags.join(' / ') }}</span>
        <span class="ncard-foot">
          <span class="ncard-price num">人均 ¥{{ shop.avgPrice }}</span>
          <AppIcon name="chevron" :size="11" />
        </span>
      </RouterLink>
    </div>
    <p class="nearby-note">{{ nearbyMeta.note }}</p>
  </section>
</template>
