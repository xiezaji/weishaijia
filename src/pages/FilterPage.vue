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

const shops = computed(() => (outside.value ? filterNearby(filters.value) : []))
const pool = computed<PickItem[]>(() =>
  outside.value ? shops.value.map(shopPick) : matches.value.map(windowPick),
)
const total = computed(() => (outside.value ? shops.value.length : matches.value.length))

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
      <p>选地点、人均和品类，再从结果里随机抽一家。地点选「校外」就切到周边高德评分店铺。</p>
    </header>

    <WindowFilter v-model="filters" />
    <RandomPick :pool="pool" />

    <div class="fp-summary">
      找到 <b class="num">{{ total }}</b> 家{{ outside ? '校外店铺' : '窗口' }}
    </div>

    <EmptyState
      v-if="!total"
      :title="outside ? '没有符合条件的店铺' : '没有符合条件的窗口'"
      :description="
        outside ? '试试放宽价格或品类，或者回到食堂里看看。' : '试试放宽价格或品类，或者换一个食堂。'
      "
    />

    <div v-else-if="outside" class="fp-body">
      <NearbyRow v-for="shop in shops" :key="shop.id" :shop="shop" />
      <p class="footnote">{{ nearbyMeta.note }}</p>
    </div>

    <div v-else class="fp-body">
      <template v-for="group in groups" :key="group.canteen.id">
        <div class="floor-divider">
          <span>{{ group.canteen.name }}</span>
          <i aria-hidden="true"></i>
          <span>{{ group.items.length }}</span>
        </div>
        <WindowRow v-for="win in group.items" :key="win.id" :window="win" :canteen="group.canteen" />
      </template>
      <p class="footnote">价格区间按窗口在售菜品统计；带「参考」的价格尚未实地核实，以现场为准。</p>
    </div>
  </div>
</template>
