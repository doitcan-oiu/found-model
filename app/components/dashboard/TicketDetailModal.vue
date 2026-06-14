<script setup>
const open = defineModel('open', { type: Boolean, default: false })
const props = defineProps({ ticketId: { type: [Number, String], default: null } })
const emit = defineEmits(['replied'])

const { user } = useAuth()
const message = useMessage()
const isStaff = computed(() => Number(user.value?.role) >= 10)

const ticket = ref(null)
const replies = ref([])
const loading = ref(false)
const sending = ref(false)
const draft = ref('')
const threadEl = ref(null)

const typeText = { refund: '退款申请', usage: '使用问题' }

// 滚动对话区到底部
function scrollToBottom() {
  nextTick(() => {
    if (threadEl.value) threadEl.value.scrollTop = threadEl.value.scrollHeight
  })
}

// silent=true 时不显示骨架（用于轮询刷新）
async function load(silent = false) {
  if (!props.ticketId) return
  if (!silent) loading.value = true
  try {
    const res = await $fetch(`/api/tickets/${props.ticketId}/replies`)
    ticket.value = res.data.ticket
    const prevCount = replies.value.length
    replies.value = res.data.replies
    // 首次加载或有新消息时滚到底部
    if (!silent || replies.value.length !== prevCount) scrollToBottom()
  } catch (err) {
    if (!silent) message.error('加载失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    if (!silent) loading.value = false
  }
}

// 轮询：弹窗打开时每 5s 静默拉取新回复
let timer = null
function startPolling() {
  stopPolling()
  timer = setInterval(() => load(true), 5000)
}
function stopPolling() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(open, (v) => {
  if (v) {
    draft.value = ''
    load()
    startPolling()
  } else {
    stopPolling()
  }
})

onBeforeUnmount(stopPolling)

async function send() {
  const content = draft.value.trim()
  if (!content) return
  sending.value = true
  try {
    await $fetch(`/api/tickets/${props.ticketId}/replies`, { method: 'POST', body: { content } })
    draft.value = ''
    await load()
    emit('replied')
  } catch (err) {
    message.error('回复失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    sending.value = false
  }
}

function fmt(ts) {
  if (!ts) return ''
  const d = new Date(ts * 1000)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}
</script>

<template>
  <UModal v-model:open="open" :title="ticket?.title || '工单详情'" :ui="{ content: 'max-w-2xl' }">
    <template #body>
      <div v-if="loading" class="space-y-3">
        <div class="h-16 w-full animate-pulse rounded bg-[#eeece7]"></div>
        <div class="h-12 w-3/4 animate-pulse rounded bg-[#eeece7]"></div>
      </div>

      <div v-else-if="ticket" class="space-y-5">
        <!-- 工单信息 -->
        <div class="rounded-[8px] bg-[#faf9f7] p-4">
          <div class="flex flex-wrap items-center gap-2 text-[13px] text-[#616161]">
            <span class="rounded-full bg-[#eeece7] px-2.5 py-0.5">{{ typeText[ticket.type] || ticket.type }}</span>
            <span v-if="ticket.subscription_name">订阅：{{ ticket.subscription_name }}</span>
            <span v-if="isStaff && ticket.alipay_account">支付宝：{{ ticket.alipay_account }}（{{ ticket.alipay_name }}）</span>
          </div>
          <p v-if="ticket.content" class="mt-2 whitespace-pre-wrap text-[14px] leading-[1.6] text-[#17171c]">{{ ticket.content }}</p>
        </div>

        <!-- 对话 -->
        <div class="space-y-3">
          <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">对话记录</p>
          <p v-if="!replies.length" class="text-[14px] text-[#93939f]">暂无回复，发送第一条消息开始对话。</p>
          <div ref="threadEl" class="max-h-[40vh] space-y-3 overflow-y-auto pr-1">
            <div
              v-for="r in replies"
              :key="r.id"
              class="flex"
              :class="r.is_staff ? 'justify-start' : 'justify-end'"
            >
              <div class="max-w-[80%] rounded-[12px] px-4 py-2.5" :class="r.is_staff ? 'bg-[#eeece7]' : 'bg-[#003c33] text-white'">
                <p class="text-[12px]" :class="r.is_staff ? 'text-[#75758a]' : 'text-[#edfce9]'">
                  {{ r.is_staff ? '客服' : '我' }} · {{ fmt(r.created_at) }}
                </p>
                <p class="mt-1 whitespace-pre-wrap text-[14px] leading-[1.5]" :class="r.is_staff ? 'text-[#17171c]' : 'text-white'">{{ r.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full items-end gap-3">
        <UTextarea
          v-model="draft"
          :rows="2"
          placeholder="输入回复内容…"
          class="flex-1"
          :ui="{ base: 'w-full rounded-[4px] ring-[#d9d9dd] focus-visible:ring-[#9b60aa] focus-visible:ring-1' }"
        />
        <button
          class="shrink-0 rounded-[32px] bg-[#17171c] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="sending || !draft.trim()"
          @click="send"
        >{{ sending ? '发送中…' : '发送' }}</button>
      </div>
    </template>
  </UModal>
</template>
