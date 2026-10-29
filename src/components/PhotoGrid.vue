<script setup lang="ts">
import type { Photo } from '../data/types'
import AppIcon from './AppIcon.vue'
import SectionHead from './SectionHead.vue'

defineProps<{
  title: string
  photos: Photo[]
  emptyTitle?: string
  emptyCopy?: string
}>()
</script>

<template>
  <section class="section wsection">
    <SectionHead eyebrow="PHOTOS" :title="title" :aside="photos.length ? `${photos.length} 张` : '待补充'" />
    <div v-if="photos.length" class="pgrid">
      <figure v-for="photo in photos" :key="photo.src" class="pfig">
        <img :src="photo.src" :alt="photo.alt" loading="lazy" width="900" height="1200" />
        <figcaption>
          <a :href="photo.postUrl" target="_blank" rel="noopener noreferrer">
            {{ photo.credit }}
            <AppIcon name="external" :size="10" />
          </a>
        </figcaption>
      </figure>
    </div>
    <div v-else-if="emptyTitle" class="review-empty">
      <p class="review-empty-title">{{ emptyTitle }}</p>
      <p v-if="emptyCopy" class="review-empty-copy">{{ emptyCopy }}</p>
    </div>
    <p class="footnote">照片来自原帖作者，只收录画面中没有人物的实拍，版权归原作者；如需删除请联系我们。</p>
  </section>
</template>
