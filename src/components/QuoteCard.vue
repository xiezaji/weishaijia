<script setup lang="ts">
import type { Quote } from '../data/types'
import AppIcon from './AppIcon.vue'

defineProps<{ quote: Quote }>()
</script>

<template>
  <article class="quote">
    <p class="quote-text">{{ quote.text }}</p>
    <div class="quote-meta">
      <AppIcon name="bowl" :size="13" />
      <span>{{ quote.platform }}</span>
      <span class="quote-dot" aria-hidden="true">·</span>
      <span>{{ quote.date }}</span>
      <a class="quote-src" :href="quote.url" target="_blank" rel="noopener noreferrer">
        原帖
        <AppIcon name="external" :size="11" />
      </a>
    </div>
  </article>
</template>
