<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { APP } from '../config'
import type { Canteen, Window } from '../data/types'
import { floorName } from '../utils/format'
import { copyText } from '../utils/clipboard'
import { toast } from '../composables/useToast'
import AppIcon from './AppIcon.vue'

const props = defineProps<{
  open: boolean
  window: Window
  canteen: Canteen
}>()

const emit = defineEmits<{ close: [] }>()

const KINDS = ['价格有误', '位置有误', '菜品变动', '其他']
const kind = ref(KINDS[0])
const price = ref('')
const note = ref('')
const panel = ref<HTMLElement | null>(null)
let previousOverflow = ''
let previousFocus: HTMLElement | null = null

const priceValid = computed(() => !price.value.trim() || /^\d+(\.\d{1,2})?$/.test(price.value.trim()))

const reportText = computed(() =>  [
    '【崴食家 · 信息反馈】',
    `食堂：${props.canteen.name}`,
    `楼层：${floorName(props.window.floor)}`,
    `窗口：${props.window.name}`,
    `类型：${kind.value}`,
    price.value ? `价格：¥${price.value}` : '',
    note.value.trim() ? `备注：${note.value.trim()}` : '',
    `时间：${new Date().toLocaleString('zh-CN', { hour12: false })}`,
  ]
    .filter(Boolean)
    .join('\n'),
)

watch(
  () => props.open,
  async (open) => {
    if (open) {
      kind.value = KINDS[0]
      price.value = ''
      note.value = ''
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      await nextTick()
      panel.value?.focus()
    } else {
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus()
      previousFocus = null
    }
  },
)

function close(): void {
  emit('close')
}

function onKeydown(event: KeyboardEvent): void {
  if (!props.open) return
  if (event.key === 'Escape') {
    close()
    return
  }
  if (event.key !== 'Tab' || !panel.value) return
  const focusable = [...panel.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), input, textarea, a[href]',
  )]
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

async function copyReport(): Promise<void> {
  if (price.value && !/^\d+(\.\d{1,2})?$/.test(price.value.trim())) {
    toast('价格请填写数字，例如 14')
    return
  }
  const ok = await copyText(reportText.value)
  toast(ok ? '反馈已复制，发送给维护者即可' : '复制失败，请手动选择文本')
  if (ok) close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="open" class="sheet-mask" @click.self="close">
        <section
          ref="panel"
          class="sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-title"
          tabindex="-1"
          @click.stop
        >
          <header class="sheet-head">
            <div>
              <div class="eyebrow">REPORT</div>
              <h2 id="report-title">报错 / 补充</h2>
              <p>{{ canteen.name }} · {{ floorName(window.floor) }} · {{ window.name }}</p>
            </div>
            <button class="sheet-close" type="button" aria-label="关闭" @click="close">
              <AppIcon name="close" :size="16" />
            </button>
          </header>

          <div class="sheet-label">问题类型</div>
          <div class="sheet-types">
            <button
              v-for="item in KINDS"
              :key="item"
              class="type-chip"
              :class="{ on: kind === item }"
              type="button"
              @click="kind = item"
            >
              {{ item }}
            </button>
          </div>

          <label class="sheet-label" for="report-price">正确价格（可选，元）</label>
          <input
            id="report-price"
            v-model="price"
            class="sheet-field"
            inputmode="decimal"
            placeholder="例如 14"
          />
          <p v-if="!priceValid" class="sheet-error">请输入数字，可带一位小数，例如 14 或 13.5。</p>

          <label class="sheet-label" for="report-note">补充说明（可选）</label>
          <textarea
            id="report-note"
            v-model="note"
            class="sheet-field sheet-area"
            maxlength="200"
            placeholder="例如：窗口搬到兰州拉面旁边了"
          ></textarea>

          <div class="sheet-context">
            <AppIcon name="info" :size="15" />
            <span>{{ APP.feedbackHint }}</span>
          </div>

          <div class="sheet-foot">
            <button class="btn secondary" type="button" @click="close">取消</button>
            <button class="btn primary" type="button" :disabled="!priceValid" @click="copyReport">复制反馈</button>
          </div>
          <p class="sheet-hint">复制后请发送给崴食家维护者；本页面不会自动提交。</p>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
