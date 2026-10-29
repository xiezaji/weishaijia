<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import BottomNav from './components/BottomNav.vue'
import ToastHost from './components/ToastHost.vue'

const route = useRoute()
const showTopbar = computed(() => route.meta.hideTopbar !== true)
</script>

<template>
  <div class="app-frame">
    <TopBar v-if="showTopbar" />
    <main class="app-main">
      <RouterView v-slot="{ Component, route: current }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="current.fullPath.split('?')[0]" />
        </Transition>
      </RouterView>
    </main>
    <BottomNav />
    <ToastHost />
  </div>
</template>
