<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'

const route = useRoute()

const active = computed(() => {
  if (route.path === '/filter') return 'filter'
  if (route.path === '/about') return 'about'
  return 'home'
})

const items = [
  { key: 'home', label: '首页', icon: 'grid', to: '/' },
  { key: 'filter', label: '筛选', icon: 'compass', to: '/filter' },
  { key: 'about', label: '关于', icon: 'info', to: '/about' },
]
</script>

<template>
  <nav class="bnav" aria-label="主导航">
    <div class="bnav-inner">
      <RouterLink
        v-for="item in items"
        :key="item.key"
        :to="item.to"
        class="bnav-item"
        :class="{ on: active === item.key }"
        :aria-current="active === item.key ? 'page' : undefined"
      >
        <span class="ind" aria-hidden="true"></span>
        <AppIcon :name="item.icon" :size="19" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
