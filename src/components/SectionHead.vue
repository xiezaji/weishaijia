<script setup lang="ts">
withDefaults(defineProps<{ eyebrow: string; title: string; aside?: string }>(), { aside: '' })
</script>

<template>
  <div class="sec-head">
    <div class="sec-head-main">
      <div class="eyebrow">{{ eyebrow }}</div>
      <h2 class="sec-title">{{ title }}</h2>
    </div>
    <div v-if="aside" class="sec-aside">{{ aside }}</div>
  </div>
</template>
