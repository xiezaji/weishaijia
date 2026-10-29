<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { plates } from '../data/gallery'
import AppIcon from './AppIcon.vue'

const track = ref<HTMLElement | null>(null)
let timer: number | undefined
let resumeTimer: number | undefined
let pointerPaused = false

function advance(): void {
  const el = track.value
  if (!el || pointerPaused) return
  const slide = el.querySelector<HTMLElement>('.pslide')
  if (!slide) return
  const max = el.scrollWidth - el.clientWidth
  if (el.scrollLeft >= max - 4) {
    el.scrollTo({ left: 0, behavior: 'smooth' })
  } else {
    el.scrollTo({ left: Math.min(el.scrollLeft + slide.offsetWidth + 10, max), behavior: 'smooth' })
  }
}

function pause(): void {
  pointerPaused = true
  window.clearTimeout(resumeTimer)
}

function resume(): void {
  window.clearTimeout(resumeTimer)
  resumeTimer = window.setTimeout(() => {
    pointerPaused = false
  }, 2600)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(advance, 4200)
})

onUnmounted(() => {
  window.clearInterval(timer)
  window.clearTimeout(resumeTimer)
})
</script>

<template>
  <section class="plates">
    <div
      ref="track"
      class="plates-track"
      tabindex="0"
      role="region"
      aria-label="食堂菜品照片，可横向滚动"
      @pointerdown="pause"
      @pointerup="resume"
      @pointerleave="resume"
      @focusin="pause"
      @focusout="resume"
    >
      <figure v-for="plate in plates" :key="plate.id" class="pslide">
        <img :src="plate.src" :alt="plate.alt" loading="lazy" width="900" height="1200" />
        <figcaption>
          <span class="pslide-line">
            <span class="pslide-name">{{ plate.title }}</span>
            <span class="pslide-note">{{ plate.note }}</span>
          </span>
          <a class="pslide-src" :href="plate.postUrl" target="_blank" rel="noopener noreferrer">
            原帖
            <AppIcon name="external" :size="10" />
          </a>
        </figcaption>
      </figure>
    </div>
    <p class="plates-note">图片来自腾讯频道【小黄鸭星球】、【小红书】、【高德地图】等，版权归原作者。</p>
  </section>
</template>
