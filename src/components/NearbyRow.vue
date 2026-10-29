<script setup lang="ts">
import { amapUrl, distanceLabel, type NearbyShop } from '../data/nearby'
import AppIcon from './AppIcon.vue'

defineProps<{ shop: NearbyShop }>()
</script>

<template>
  <a class="nrow" :href="amapUrl(shop)" target="_blank" rel="noopener noreferrer">
    <span class="nrow-score num">{{ shop.score.toFixed(1) }}</span>
    <span class="nrow-main">
      <b>{{ shop.name }}</b>
      <small>{{ shop.category }} · {{ shop.tags.join(' / ') }}</small>
    </span>
    <span class="nrow-meta">
      <b class="num">{{ distanceLabel(shop.distance) }}</b>
      <small class="num">¥{{ shop.avgPrice }}/人</small>
    </span>
    <AppIcon name="external" :size="13" class="nrow-icon" />
  </a>
</template>
