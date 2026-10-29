<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { APP } from '../config'
import { getCanteen, getWindow, priceRangeOf } from '../data/catalog'
import type { Dish } from '../data/types'
import { floorLabel, floorName, formatRange } from '../utils/format'
import { usePageTitle } from '../composables/usePageTitle'
import { copyText } from '../utils/clipboard'
import { toast } from '../composables/useToast'
import AppIcon from '../components/AppIcon.vue'
import SectionHead from '../components/SectionHead.vue'
import DishRow from '../components/DishRow.vue'
import QuoteCard from '../components/QuoteCard.vue'
import EmptyState from '../components/EmptyState.vue'
import ReportSheet from '../components/ReportSheet.vue'

interface SourceLink {
  kind: string
  label: string
  url: string
}

const route = useRoute()
const reportOpen = ref(false)

const win = computed(() => getWindow(String(route.params.windowId)))
const canteen = computed(() => (win.value ? getCanteen(win.value.canteenId) : undefined))

usePageTitle(() => win.value?.name ?? '窗口未找到')

const grouped = computed(() => {
  const map = new Map<string, Dish[]>()
  win.value?.dishes.forEach((dish) => {
    const items = map.get(dish.category) ?? []
    items.push(dish)
    map.set(dish.category, items)
  })
  return [...map.entries()].map(([category, dishes]) => ({ category, dishes }))
})

const range = computed(() => (win.value ? formatRange(priceRangeOf(win.value)) : '价格待补'))
const statusLabel = computed(() => (win.value?.status === 'open' ? '在营' : '状态待核实'))
const metaKey = computed(() => (win.value?.officialRank ? '官方榜' : '数据'))
const metaValue = computed(() => {
  if (!win.value) return ''
  if (win.value.officialRank) return `第 ${win.value.officialRank} 名`
  return win.value.basis === 'channel' ? '频道整理' : '官方资料'
})
const basisText = computed(() => {
  if (!win.value) return ''
  if (win.value.basis === 'official') return '来自公开榜单，未实地核实'
  if (win.value.basis === 'channel') return '来自频道帖子，未实地核实'
  return '来自公开榜单与频道帖子，未实地核实'
})

const sourceLinks = computed<SourceLink[]>(() => {
  if (!win.value) return []
  const list: SourceLink[] = []
  const seen = new Set<string>()

  const add = (kind: string, label: string, url: string) => {
    if (seen.has(url)) return
    seen.add(url)
    list.push({ kind, label, url })
  }

  if (win.value.officialSource && win.value.officialUrl) {
    add('官方', win.value.officialSource, win.value.officialUrl)
  }
  if (win.value.sourceName && win.value.sourceUrl) {
    add('频道', win.value.sourceName, win.value.sourceUrl)
  }
  win.value.quotes.forEach((quote) => add('频道', quote.platform, quote.url))

  return list
})

const heroStyle = computed(() => (canteen.value ? { '--ci': canteen.value.accentInk } : {}))

async function share(): Promise<void> {
  const ok = await copyText(window.location.href)
  toast(ok ? '链接已复制' : '复制失败，请手动复制地址栏')
}
</script>

<template>
  <template v-if="win && canteen">
  <div class="wpage" :style="heroStyle">
    <nav class="crumbs" aria-label="面包屑">
      <RouterLink to="/">首页</RouterLink>
      <AppIcon name="chevron" :size="10" />
      <RouterLink :to="`/canteen/${canteen.id}`">{{ canteen.name }}</RouterLink>
      <AppIcon name="chevron" :size="10" />
      <span class="crumbs-now">{{ win.name }}</span>
    </nav>

    <header class="whero">
      <div class="whero-top">
        <div class="eyebrow">WINDOW · {{ canteen.name }}</div>
        <span class="status" :class="`is-${win.status}`">
          <i aria-hidden="true"></i>{{ statusLabel }}
        </span>
      </div>

      <div class="whero-head">
        <div class="whero-code">
          <b>{{ floorLabel(win.floor) }}</b>
          <span>FLOOR</span>
        </div>
        <div class="whero-titlewrap">
          <h1>{{ win.name }}</h1>
          <div class="whero-tags">
            <span v-for="tag in win.tags" :key="tag" class="wtag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <p class="whero-pos">
        <AppIcon name="location" :size="15" />
        <span>{{ win.position ?? '位置待补录，欢迎用下方“报错 / 补充”告诉我们。' }}</span>
      </p>

      <div class="wmeta">
        <div>
          <span>价格</span>
          <b>{{ range }}</b>
        </div>
        <div>
          <span>楼层</span>
          <b>{{ floorName(win.floor) }}</b>
        </div>
        <div>
          <span>{{ metaKey }}</span>
          <b>{{ metaValue }}</b>
        </div>
      </div>

      <div class="wactions">
        <button class="btn primary" type="button" @click="reportOpen = true">报错 / 补充</button>
        <button class="btn secondary" type="button" @click="share">
          <AppIcon name="share" :size="15" />
          分享
        </button>
      </div>

      <p v-if="win.alias" class="wnote">窗口别名：{{ win.alias }}</p>
      <p v-if="win.note" class="wnote">{{ win.note }}</p>
    </header>

    <section class="section wsection">
      <SectionHead eyebrow="MENU" title="价目表" :aside="`${win!.dishes.length} 项`" />
      <div class="menu">
        <template v-for="group in grouped" :key="group.category">
          <div class="menu-cat">{{ group.category }}</div>
          <DishRow v-for="dish in group.dishes" :key="dish.id" :dish="dish" />
        </template>
      </div>
      <p class="footnote">带「参考」标记的价格为演示估算，尚未实地核实；所有价格以窗口现场为准。</p>
    </section>

    <section v-if="win!.quotes.length" class="section wsection">
      <SectionHead eyebrow="VOICES" title="频道口碑" :aside="`${win!.quotes.length} 条`" />
      <QuoteCard v-for="quote in win!.quotes" :key="quote.id" :quote="quote" />
      <p class="footnote">引文来自腾讯频道公开帖子，已匿名化处理；内容可能过时，仅作参考。</p>
    </section>

    <section class="section wsection">
      <SectionHead eyebrow="SOURCE" title="数据来源" />
      <div class="sources">
        <div v-for="link in sourceLinks" :key="link.url" class="source-row">
          <span class="source-k">{{ link.kind }}</span>
          <span class="source-v">
            <a :href="link.url" target="_blank" rel="noopener noreferrer">
              {{ link.label }}
              <AppIcon name="external" :size="10" />
            </a>
          </span>
        </div>
        <div v-if="!sourceLinks.length" class="source-row">
          <span class="source-k">资料</span>
          <span class="source-v plain">后台整理，暂无公开链接</span>
        </div>
      </div>

      <div class="source-note">
        <p><span>整理时间</span>{{ win!.addedAt }}</p>
        <p><span>核实程度</span>{{ basisText }}</p>
        <p><span>价格口径</span>以窗口现场标价为准</p>
      </div>
    </section>

    <footer class="foot">崴食家 v{{ APP.version }} · 信息仅供参考 · 以现场为准</footer>

    <ReportSheet
      :open="reportOpen"
      :window="win!"
      :canteen="canteen!"
      @close="reportOpen = false"
    />
  </div>
  </template>

  <div v-else class="notfound">
    <EmptyState title="没有这个窗口" description="链接可能已经失效，或者窗口编号写错了。">
      <RouterLink class="btn primary empty-action" to="/">回到首页</RouterLink>
    </EmptyState>
  </div>
</template>
