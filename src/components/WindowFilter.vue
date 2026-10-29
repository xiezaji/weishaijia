<script setup lang="ts">
import { FOOD_KINDS, PLACES, type FilterState } from '../data/filters'

const model = defineModel<FilterState>({ required: true })

function set<K extends keyof FilterState>(key: K, value: FilterState[K]): void {
  model.value = { ...model.value, [key]: value }
}

function setPrice(key: 'priceMin' | 'priceMax', event: Event): void {
  const raw = (event.target as HTMLInputElement).value.trim()
  const parsed = raw === '' ? null : Number(raw)
  set(key, parsed !== null && Number.isFinite(parsed) ? Math.max(0, parsed) : null)
}
</script>

<template>
  <div class="filter">
    <div class="fgroup" role="group" aria-label="地点">
      <span class="fgroup-label">地点</span>
      <div class="fchips">
        <button
          v-for="item in PLACES"
          :key="item.key"
          class="fchip"
          :class="{ on: model.place === item.key }"
          :aria-pressed="model.place === item.key"
          type="button"
          @click="set('place', item.key)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div class="fgroup" role="group" aria-label="人均价格">
      <span class="fgroup-label">人均</span>
      <div class="fprice">
        <label class="fprice-field">
          <span>最低</span>
          <input
            type="number"
            inputmode="decimal"
            min="0"
            step="1"
            placeholder="不限"
            aria-label="人均最低价格，单位元"
            :value="model.priceMin ?? ''"
            @input="setPrice('priceMin', $event)"
          />
          <span class="fprice-unit">元</span>
        </label>
        <span class="fprice-sep" aria-hidden="true">—</span>
        <label class="fprice-field">
          <span>最高</span>
          <input
            type="number"
            inputmode="decimal"
            min="0"
            step="1"
            placeholder="不限"
            aria-label="人均最高价格，单位元"
            :value="model.priceMax ?? ''"
            @input="setPrice('priceMax', $event)"
          />
          <span class="fprice-unit">元</span>
        </label>
      </div>
    </div>

    <div class="fgroup" role="group" aria-label="食物品类">
      <span class="fgroup-label">品类</span>
      <div class="fchips">
        <button
          v-for="item in FOOD_KINDS"
          :key="item.key"
          class="fchip"
          :class="{ on: model.food === item.key }"
          :aria-pressed="model.food === item.key"
          type="button"
          @click="set('food', item.key)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>
