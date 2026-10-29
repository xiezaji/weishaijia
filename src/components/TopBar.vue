<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { topbarTitle } from '../composables/usePageTitle'

const route = useRoute()
const router = useRouter()

const title = computed(() => topbarTitle.value ?? (route.meta.title as string | undefined) ?? '崴食家')

function goBack(): void {
  if (window.history.state?.back) router.back()
  else router.push('/')
}
</script>

<template>
  <header class="topbar">
    <button class="topbar-back" type="button" aria-label="返回" @click="goBack">
      <AppIcon name="back" :size="18" />
    </button>
    <span class="topbar-sep" aria-hidden="true"></span>
    <span class="topbar-page">{{ title }}</span>
    <span class="topbar-fill"></span>
    <span class="topbar-chip">BETA 0.1</span>
  </header>
</template>
