<script setup lang="ts">
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: string
  }>(),
  { description: '', icon: 'search' },
)
</script>

<template>
  <div class="empty">
    <div class="empty-ic">
      <AppIcon :name="icon" :size="20" />
    </div>
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    <slot />
  </div>
</template>
