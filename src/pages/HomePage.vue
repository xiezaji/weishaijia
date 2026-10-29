<script setup lang="ts">
import { computed, ref } from 'vue'
import { APP } from '../config'
import {
  canteens,
  getCanteen,
  getCanteenFloors,
  priceRangeOf,
  rankedWindowsOf,
  windowsOf,
} from '../data/catalog'
import { emptyFilters, filterNearby, filterWindows } from '../data/filters'
import type { Canteen, CanteenId, Window } from '../data/types'
import { shopPick, windowPick, type PickItem } from '../data/picks'
import { floorLabel, formatRange } from '../utils/format'
import { usePageTitle } from '../composables/usePageTitle'
import AppIcon from '../components/AppIcon.vue'
import PlateStrip from '../components/PlateStrip.vue'
import NearbyStrip from '../components/NearbyStrip.vue'
import WindowFilter from '../components/WindowFilter.vue'
import RandomPick from '../components/RandomPick.vue'

usePageTitle(() => '山威食堂窗口目录')

const filters = ref(emptyFilters())
const outside = computed(() => filters.value.place === 'outside')
const pool = computed<PickItem[]>(() =>
  outside.value ? filterNearby(filters.value).map(shopPick) : filterWindows(filters.value).map(windowPick),
)

const top = canteens
  .map((canteen) => rankedWindowsOf(canteen.id)[0])
  .filter((win): win is Window => Boolean(win))

function canteenOf(win: Window): Canteen {
  return getCanteen(win.canteenId) ?? canteens[0]
}

function windowCount(id: CanteenId): number {
  return windowsOf(id).length
}

function floorCount(id: CanteenId): string {
  const count = getCanteenFloors(id).length
  return count ? `${count} 层` : '楼层待定'
}

function rangeOf(win: Window): string {
  return formatRange(priceRangeOf(win))
}
</script>

<template>
  <div class="home">
    <header class="home-mast">
      <span class="home-mast-brand">
        <span class="home-logo">崴食家</span>
        <span class="home-latin">WEIHAI CANTEEN INDEX</span>
      </span>
      <span class="home-issue">NO. 01 / {{ APP.updatedAt.slice(0, 4) }} 秋</span>
    </header>

    <section class="home-hero">
      <p class="home-kicker">山威干饭指南</p>
      <h1>今天，<span class="home-red">吃点好的</span>。</h1>
    </section>

    <PlateStrip />

    <section class="home-sec home-pick" aria-labelledby="pick-title">
      <header class="home-sec-head">
        <h2 id="pick-title">这顿吃啥</h2>
      </header>
      <WindowFilter v-model="filters" />
      <RandomPick :pool="pool" />
    </section>

    <section class="home-sec">
      <header class="home-sec-head">
        <h2>各食堂榜首</h2>
        <span>官方榜 {{ APP.official.edition }}</span>
      </header>
      <ol class="home-rank">
        <li v-for="win in top" :key="win.id">
          <RouterLink :to="`/canteen/${win.canteenId}/window/${win.id}`">
            <span class="home-rank-no num">{{ canteenOf(win).index }}</span>
            <span class="home-rank-body">
              <b>{{ win.name }}</b>
              <small>
                {{ canteenOf(win).name }} · {{ floorLabel(win.floor) }} ·
                {{ win.tags.slice(0, 2).join(' / ') }}
              </small>
            </span>
            <span class="home-rank-price num">{{ rangeOf(win) }}</span>
          </RouterLink>
        </li>
      </ol>
      <p class="home-note">每个食堂取官方榜第 1 名；各食堂榜单独立，不作跨食堂比较。</p>
    </section>

    <section class="home-sec">
      <header class="home-sec-head">
        <h2>食堂索引</h2>
        <span>{{ String(canteens.length).padStart(2, '0') }} CANTEENS</span>
      </header>
      <RouterLink
        v-for="canteen in canteens"
        :key="canteen.id"
        :to="`/canteen/${canteen.id}`"
        class="home-index-row"
      >
        <span class="home-index-no">{{ canteen.index }}</span>
        <span class="home-index-name">{{ canteen.name }}</span>
        <span class="home-index-meta">{{ windowCount(canteen.id) }} 窗口 · {{ floorCount(canteen.id) }}</span>
        <AppIcon name="arrow" :size="15" class="home-index-arrow" />
      </RouterLink>
    </section>

    <NearbyStrip />

    <footer class="home-foot">
      <p>
        学生自发整理的非官方目录。带「参考」的价格尚未实地核实，所有价格、楼层与营业状态以现场为准。<RouterLink
          to="/about"
          >数据说明 →</RouterLink
        >
      </p>
      <p class="home-foot-meta">崴食家 v{{ APP.version }} · {{ APP.updatedAt }} · 非官方项目</p>
    </footer>
  </div>
</template>
