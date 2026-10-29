<script setup lang="ts">
import type { Dish } from '../data/types'
import { formatPrice } from '../utils/format'

defineProps<{ dish: Dish }>()
</script>

<template>
  <div class="dish">
    <div class="dish-main">
      <div class="dish-name">
        <span>{{ dish.name }}</span>
        <span v-if="dish.estimated" class="dish-est">参考</span>
      </div>
      <div v-if="dish.priceNote" class="dish-note">{{ dish.priceNote }}</div>
    </div>
    <span class="dish-leader" aria-hidden="true"></span>
    <div class="dish-price" :class="{ pending: dish.price === null }">
      {{ dish.price === null ? '待补' : formatPrice(dish.price) }}
    </div>
  </div>
</template>
