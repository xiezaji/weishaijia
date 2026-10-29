<script setup lang="ts">
import { computed, ref } from 'vue'
import { canteens } from '../data/catalog'
import { emptyFilters, filterNearby, filterWindows } from '../data/filters'
import { shopPick, windowPick, type PickItem } from '../data/picks'
import { nearbyMeta } from '../data/nearby'
import type { Window } from '../data/types'
import { usePageTitle } from '../composables/usePageTitle'
import WindowFilter from '../components/WindowFilter.vue'
import RandomPick from '../components/RandomPick.vue'
import WindowRow from '../components/WindowRow.vue'
import NearbyRow from '../components/NearbyRow.vue'
import EmptyState from '../components/EmptyState.vue'

usePageTitle(() => '筛选')

const filters = ref(emptyFilters())
const outside = computed(() => filters.value.place === 'outside')
const showShops = computed(() => outside.value || filters.value.place === 'all')

const matches = computed(() =>
  outside.value
    ? []
    : filterWindows(filters.value)
        .slice()
        .sort(
          (a, b) =>
            canteens.findIndex((c) => c.id === a.canteenId) -
              canteens.findIndex((c) => c.id === b.canteenId) ||
            (a.floor ?? 99) - (b.floor ?? 99) ||
            (a.officialRank ?? 99) - (b.officialRank ?? 99),
        ),
)

const shops = computed(() => (showShops.value ? filterNearby(filters.value) : []))
const pool = computed<PickItem[]>(() =>
  outside.value
    ? shops.value.map(shopPick)
    : filters.value.place === 'all'
      ? [...matches.value.map(windowPick), ...shops.value.map(shopPick)]
      : matches.value.map(windowPick),
)
const total = computed(() => matches.value.length + shops.value.length)

const groups = computed(() =>
  canteens
    .map((canteen) => ({
      canteen,
      items: matches.value.filter((win: Window) => win.canteenId === canteen.id),
    }))
    .filter((group) => group.items.length > 0),
)
</script>

<template>
  <div class="filterpage">
    <header class="fp-head">
      <div class="eyebrow">FILTER</div>
      <h1>按条件挑一家</h1>
      <p>选地点、人均和品类，再从结果里随机抽一家。地点选「全部」会同时列出校外店铺，选「校外」只看校外。</p>
    </header>

    <WindowFilter v-model="filters" />
    <RandomPick :pool="pool" />

    <div class="fp-summary">
      <template v-if="outside">
        找到 <b class="num">{{ shops.length }}</b> 家校外店铺
      </template>
      <template v-else>
        找到 <b class="num">{{ matches.length }}</b> 家窗口
        <template v-if="shops.length">
          <span class="fp-summary-sep" aria-hidden="true">·</span>
          校外 <b class="num">{{ shops.length }}</b> 家
        </template>
      </template>
    </div>

    <EmptyState
      v-if="!total"
      :title="outside ? '没有符合条件的店铺' : '没有符合条件的窗口'"
      :description="
        outside ? '试试放宽价格或品类，或者回到食堂里看看。' : '试试放宽价格或品类，或者换一个食堂。'
      "
    />

    <template v-else>
      <div v-if="!outside && matches.length" class="fp-body">
        <template v-for="group in groups" :key="group.canteen.id">
          <div class="floor-divider">
            <span>{{ group.canteen.name }}</span>
            <i aria-hidden="true"></i>
            <span>{{ group.items.length }}</span>
          </div>
          <WindowRow
            v-for="win in group.items"
            :key="win.id"
            :window="win"
            :canteen="group.canteen"
          />
        </template>
        <p class="footnote">价格区间按窗口在售菜品统计；带「参考」的价格尚未实地核实，以现场为准。</p>
      </div>

      <p v-else-if="!outside" class="fp-none">校内没有符合条件的窗口，下面看看校外。</p>

      <div v-if="shops.length" class="fp-body fp-shops">
        <div class="floor-divider">
          <span>校外美食</span>
          <i aria-hidden="true"></i>
          <span>{{ shops.length }}</span>
        </div>
        <NearbyRow v-for="shop in shops" :key="shop.id" :shop="shop" />
        <p class="footnote">{{ nearbyMeta.note }}</p>
      </div>
    </template>
  </div>
</template>
