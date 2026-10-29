<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PickItem } from '../data/picks'
import AppIcon from './AppIcon.vue'

const props = defineProps<{ pool: PickItem[] }>()

const picked = ref<PickItem | null>(null)

watch(
  () => props.pool,
  () => {
    picked.value = null
  },
)

function roll(): void {
  if (!props.pool.length) return
  picked.value = props.pool[Math.floor(Math.random() * props.pool.length)] ?? null
}
</script>

<template>
  <div class="pick">
    <div class="pick-row">
      <button class="btn primary pick-btn" type="button" :disabled="!pool.length" @click="roll">
        <AppIcon name="compass" :size="16" />
        随机抽一家
      </button>
      <span class="pick-count"><b class="num">{{ pool.length }}</b> 家符合</span>
    </div>

    <div class="pick-live" aria-live="polite">
      <article v-if="picked" class="pick-card">
        <div class="pick-eyebrow">
          抽到这一家
          <span v-if="picked.score" class="pick-score num">高德 {{ picked.score.toFixed(1) }}</span>
        </div>
        <h3 class="pick-name">{{ picked.name }}</h3>
        <p class="pick-meta">{{ picked.meta }}</p>
        <div class="pick-foot">
          <span class="pick-tags">{{ picked.tags.join(' / ') }}</span>
          <RouterLink class="pick-go" :to="picked.href">
            去看看
            <AppIcon name="arrow" :size="14" />
          </RouterLink>
        </div>
      </article>
      <p v-else-if="!pool.length" class="pick-empty">没有符合条件的店，放宽一下条件再抽。</p>
    </div>
  </div>
</template>
