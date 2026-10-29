<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { APP } from '../config'
import { getCanteen, getCanteenFloors, rankedWindowsOf, windowsOf } from '../data/catalog'
import type { Window } from '../data/types'
import { floorLabel, floorName } from '../utils/format'
import { usePageTitle } from '../composables/usePageTitle'
import WindowRow from '../components/WindowRow.vue'
import EmptyState from '../components/EmptyState.vue'
import AppIcon from '../components/AppIcon.vue'

type FloorFilter = 'all' | 'tbd' | number

const route = useRoute()
const activeFloor = ref<FloorFilter>('all')

const canteen = computed(() => getCanteen(String(route.params.canteenId)))
const canteenWindows = computed(() => (canteen.value ? windowsOf(canteen.value.id) : []))
const floors = computed(() => (canteen.value ? getCanteenFloors(canteen.value.id) : []))
const hasUnknown = computed(() => canteenWindows.value.some((win) => win.floor === null))
const rankedCount = computed(() => (canteen.value ? rankedWindowsOf(canteen.value.id).length : 0))
const quoteCount = computed(() =>
  canteenWindows.value.reduce((total, win) => total + win.quotes.length, 0),
)

usePageTitle(() => canteen.value?.name ?? '食堂未找到')

watch(canteen, () => {
  activeFloor.value = 'all'
})

const filtered = computed(() => {
  if (activeFloor.value === 'all') return canteenWindows.value
  if (activeFloor.value === 'tbd') return canteenWindows.value.filter((win) => win.floor === null)
  return canteenWindows.value.filter((win) => win.floor === activeFloor.value)
})

interface Group {
  key: string
  label: string
  windows: Window[]
}

const groups = computed<Group[]>(() => {
  const map = new Map<number | null, Window[]>()
  filtered.value.forEach((win) => {
    const items = map.get(win.floor) ?? []
    items.push(win)
    map.set(win.floor, items)
  })
  return [...map.entries()]
    .sort(([a], [b]) => (a ?? 99) - (b ?? 99))
    .map(([floor, items]) => ({
      key: floor === null ? 'tbd' : `f${floor}`,
      label: floor === null ? '楼层待核实' : `${floorLabel(floor)} · ${floorName(floor)}`,
      windows: items,
    }))
})

function floorCount(floor: number): number {
  return canteenWindows.value.filter((win) => win.floor === floor).length
}

const heroStyle = computed(() => (canteen.value ? { '--ci': canteen.value.accentInk } : {}))
</script>

<template>
  <div v-if="!canteen" class="notfound">
    <EmptyState title="没有这个食堂" description="链接可能已经失效，或者食堂编号写错了。">
      <RouterLink class="btn primary empty-action" to="/">回到首页</RouterLink>
    </EmptyState>
  </div>

  <div v-else class="cpage" :style="heroStyle">
    <header class="chero">
      <div class="eyebrow">CANTEEN {{ canteen.index }}</div>
      <div class="chero-row">
        <div>
          <h1>{{ canteen.name }}</h1>
          <div class="chero-latin">{{ canteen.latin }}</div>
        </div>
        <div class="chero-count">
          <b class="num">{{ canteenWindows.length }}</b>
          <span>窗口</span>
        </div>
      </div>
      <p class="chero-intro">{{ canteen.intro }}</p>
      <div class="chero-meta">
        <span>{{ floors.length ? `${floors.length} 层可查` : '楼层待核实' }}</span>
        <span>官方上榜 {{ rankedCount }}</span>
        <span>频道口碑 {{ quoteCount }}</span>
      </div>
    </header>

    <div v-if="floors.length" class="floorbar" aria-label="按楼层筛选">
      <button
        class="floor-tab"
        :class="{ on: activeFloor === 'all' }"
        type="button"
        :aria-pressed="activeFloor === 'all'"
        @click="activeFloor = 'all'"
      >
        全部 <b>{{ canteenWindows.length }}</b>
      </button>
      <button
        v-for="floor in floors"
        :key="floor"
        class="floor-tab"
        :class="{ on: activeFloor === floor }"
        type="button"
        :aria-pressed="activeFloor === floor"
        @click="activeFloor = floor"
      >
        {{ floorLabel(floor) }} <b>{{ floorCount(floor) }}</b>
      </button>
      <button
        v-if="hasUnknown"
        class="floor-tab"
        :class="{ on: activeFloor === 'tbd' }"
        type="button"
        :aria-pressed="activeFloor === 'tbd'"
        @click="activeFloor = 'tbd'"
      >
        待核实 <b>{{ canteenWindows.filter((win) => win.floor === null).length }}</b>
      </button>
    </div>

    <div class="cbody">
      <div v-if="canteen.note" class="cnote">
        <AppIcon name="info" :size="15" />
        <span>{{ canteen.note }}</span>
      </div>

      <div class="wlist">
        <template v-for="group in groups" :key="group.key">
          <div class="floor-divider">
            <span>{{ group.label }}</span>
            <i aria-hidden="true"></i>
            <span>{{ group.windows.length }}</span>
          </div>
          <WindowRow
            v-for="win in group.windows"
            :key="win.id"
            :window="win"
            :canteen="canteen"
          />
        </template>
      </div>

      <p class="footnote">
        窗口按楼层与官方名次排序；“官榜 n”表示在该食堂官方榜中的名次（{{ APP.official.edition }}）。
      </p>

      <RouterLink class="cpage-more" to="/about">
        <span>
          <b>数据怎么来的？</b>
          <span>看数据来源、价格规则与纠错方式</span>
        </span>
        <AppIcon name="arrow" :size="15" />
      </RouterLink>
    </div>
  </div>
</template>
