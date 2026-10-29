<script setup lang="ts">
import { distanceLabel, type NearbyShop } from '../data/nearby'
import AppIcon from './AppIcon.vue'

defineProps<{ shop: NearbyShop }>()
</script>

<template>
  <RouterLink class="nrow" :to="`/shop/${shop.id}`">
    <span class="nrow-score num">{{ shop.score.toFixed(1) }}</span>
    <span class="nrow-main">
      <b>{{ shop.name }}</b>
      <small>{{ shop.category }} · {{ shop.tags.join(' / ') }}</small>
    </span>
    <span class="nrow-meta">
      <b class="num">{{ distanceLabel(shop.distance) }}</b>
      <small class="num">¥{{ shop.avgPrice }}/人</small>
    </span>
    <AppIcon name="chevron" :size="13" class="nrow-icon" />
  </RouterLink>
</template>
