<script setup lang="ts">
import { APP } from '../config'
import AppIcon from './AppIcon.vue'
import SectionHead from './SectionHead.vue'

defineProps<{ target: string }>()
</script>

<template>
  <section class="section wsection">
    <SectionHead eyebrow="REVIEWS" title="食客评价" aside="腾讯问卷" />
    <div class="review-empty">
      <p class="review-empty-title">还没有收录评价</p>
      <p class="review-empty-copy">
        {{ target }}的评价通过腾讯问卷收集，审核后整理到这里，不做实时评论区。
      </p>
      <a
        v-if="APP.reviewFormUrl"
        class="btn primary review-btn"
        :href="APP.reviewFormUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        去写评价
        <AppIcon name="external" :size="14" />
      </a>
      <button v-else class="btn secondary review-btn" type="button" disabled>
        写评价 · 即将开放
      </button>
    </div>
    <p class="footnote">评价仅代表提交者个人感受，不构成推荐；请勿填写手机号、微信号等个人信息。</p>
  </section>
</template>
