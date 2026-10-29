<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { APP } from '../config'
import { amapUrl, distanceLabel, getShop, nearbyMeta } from '../data/nearby'
import { usePageTitle } from '../composables/usePageTitle'
import { copyText } from '../utils/clipboard'
import { toast } from '../composables/useToast'
import AppIcon from '../components/AppIcon.vue'
import SectionHead from '../components/SectionHead.vue'
import PhotoGrid from '../components/PhotoGrid.vue'
import ReviewBlock from '../components/ReviewBlock.vue'
import EmptyState from '../components/EmptyState.vue'

const route = useRoute()
const shop = computed(() => getShop(String(route.params.shopId)))

usePageTitle(() => shop.value?.name ?? '店铺未找到')

async function share(): Promise<void> {
  const ok = await copyText(window.location.href)
  toast(ok ? '链接已复制' : '复制失败，请手动复制地址栏')
}
</script>

<template>
  <div v-if="shop" class="wpage">
    <nav class="crumbs" aria-label="面包屑">
      <RouterLink to="/">首页</RouterLink>
      <AppIcon name="chevron" :size="10" />
      <span class="crumbs-now">{{ shop.name }}</span>
    </nav>

    <header class="whero">
      <div class="whero-top">
        <div class="eyebrow">OUTSIDE · 高德地图</div>
      </div>

      <div class="whero-head">
        <div class="shop-score">
          <b class="num">{{ shop.score.toFixed(1) }}</b>
          <span>高德评分</span>
        </div>
        <div class="whero-titlewrap">
          <h1>{{ shop.name }}</h1>
          <div class="whero-tags">
            <span v-for="tag in shop.tags" :key="tag" class="wtag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <p class="whero-pos">
        <AppIcon name="location" :size="15" />
        <span>{{ shop.area }} · 校外店铺，评分与人均来自高德地图</span>
      </p>

      <div class="wmeta">
        <div>
          <span>人均</span>
          <b>¥{{ shop.avgPrice }}</b>
        </div>
        <div>
          <span>类型</span>
          <b>{{ shop.category }}</b>
        </div>
        <div>
          <span>距离</span>
          <b>{{ distanceLabel(shop.distance) }}</b>
        </div>
      </div>

      <div class="wactions">
        <a class="btn primary" :href="amapUrl(shop)" target="_blank" rel="noopener noreferrer">
          在高德地图查看
          <AppIcon name="external" :size="14" />
        </a>
        <button class="btn secondary" type="button" @click="share">
          <AppIcon name="share" :size="15" />
          分享
        </button>
      </div>
    </header>

    <PhotoGrid
      title="店铺照片"
      :photos="[]"
      empty-title="还没有店铺照片"
      empty-copy="只收录画面中没有人物的实拍，并附原帖链接；这家店暂时没有可用照片。"
    />

    <section class="section wsection">
      <SectionHead eyebrow="POSTS" title="热门帖子" aside="腾讯频道" />
      <div class="review-empty">
        <p class="review-empty-title">还没有收录相关帖子</p>
        <p class="review-empty-copy">
          频道和小红书里暂时没有这家店的分享，等有同学发帖，会连同原帖链接整理到这里。
        </p>
      </div>
      <p class="footnote">帖子来自公开分享，保留原帖链接与出处；内容可能过时，仅作参考。</p>
    </section>

    <ReviewBlock :target="shop.name" />

    <section class="section wsection">
      <SectionHead eyebrow="SOURCE" title="数据来源" />
      <div class="sources">
        <div class="source-row">
          <span class="source-k">高德</span>
          <span class="source-v">
            <a :href="amapUrl(shop)" target="_blank" rel="noopener noreferrer">
              高德地图 · {{ shop.name }}
              <AppIcon name="external" :size="10" />
            </a>
          </span>
        </div>
      </div>

      <div class="source-note">
        <p><span>采集时间</span>{{ nearbyMeta.collectedAt }}</p>
        <p><span>评分口径</span>高德地图公开评分，仅供参考</p>
        <p><span>价格口径</span>人均来自高德公开数据，以门店现场为准</p>
      </div>

      <p class="footnote">{{ nearbyMeta.note }}</p>
    </section>

    <footer class="foot">崴食家 v{{ APP.version }} · 信息仅供参考 · 以现场为准</footer>
  </div>

  <div v-else class="notfound">
    <EmptyState title="没有这家店" description="链接可能已经失效，或者店铺编号写错了。">
      <RouterLink class="btn primary empty-action" to="/">回到首页</RouterLink>
    </EmptyState>
  </div>
</template>
