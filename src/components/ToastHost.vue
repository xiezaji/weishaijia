<script setup lang="ts">
import { toastItems } from '../composables/useToast'
</script>

<template>
  <Teleport to="body">
    <div class="toast-host" role="status" aria-live="polite">
      <TransitionGroup name="toast">
        <div v-for="item in toastItems" :key="item.id" class="toast">{{ item.message }}</div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
