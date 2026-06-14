<script setup>
const PAGE_SIZE = 10
const page = ref(1)
const createOpen = ref(false)

// 工单详情/回复弹窗
const detailOpen = ref(false)
const detailId = ref(null)
function openDetail(t) {
  detailId.value = t.id
  detailOpen.value = true
}

const { user } = useAuth()
const message = useMessage()
const isRoot = computed(() => Number(user.value?.role) >= 100)

// Root 看全部工单，普通用户看自己的
const endpoint = computed(() => (isRoot.value ? '/api/tickets/admin' : '/api/tickets'))

const { data: res, pending, error, refresh } = await useFetch(endpoint, {
  key: 'tickets',
  query: { page, page_size: PAGE_SIZE },
  lazy: true,
  server: false
})

const total = computed(() => res.value?.data?.total ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))

const typeText = { refund: '退款申请', usage: '使用问题' }
const statusMap = {
  pending: { label: '待审核', cls: 'bg-[#f1f5ff] text-[#1863dc]' },
  reviewing: { label: '审核中', cls: 'bg-[#f1f5ff] text-[#1863dc]' },
  processing: { label: '处理中', cls: 'bg-[#fff1ec] text-[#ff7759]' },
  done: { label: '已完成', cls: 'bg-[#edfce9] text-[#003c33]' },
  rejected: { label: '已拒绝', cls: 'bg-[#eeece7] text-[#75758a]' }
}

const tickets = computed(() => (res.value?.data?.items ?? []).map((t) => ({
  ...t,
  typeLabel: typeText[t.type] || t.type,
  statusKey: t.status,
  statusInfo: statusMap[t.status] || { label: t.status, cls: 'bg-[#eeece7] text-[#75758a]' },
  time: formatTime(t.created_at)
})))

// 管理端可流转的状态
const statusActions = [
  { value: 'reviewing', label: '审核中' },
  { value: 'processing', label: '处理中' },
  { value: 'done', label: '已完成' },
  { value: 'rejected', label: '已拒绝' }
]
const updatingId = ref(null)
async function changeStatus(t, status) {
  if (status === t.statusKey) return
  updatingId.value = t.id
  try {
    await $fetch(`/api/tickets/${t.id}/status`, { method: 'PUT', body: { status } })
    message.success('已更新', `工单 #${t.id} 状态已更新`)
    await refresh()
  } catch (err) {
    message.error('更新失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    updatingId.value = null
  }
}

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts * 1000)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}
</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">{{ isRoot ? '工单管理' : '我的工单' }}</h2>
      <button
        v-if="!isRoot"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-[32px] bg-[#17171c] px-4 py-2 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black"
        @click="createOpen = true"
      >
        <span class="text-[16px] leading-none">+</span> 提交工单
      </button>
    </div>

    <DashboardCreateTicketModal v-model:open="createOpen" @created="refresh" />
    <DashboardTicketDetailModal v-model:open="detailOpen" :ticket-id="detailId" @replied="refresh" />

    <div class="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
      <!-- 表头 -->
      <div class="hidden gap-4 border-b border-[#d9d9dd] px-6 py-4 md:grid" :class="isRoot ? 'grid-cols-[2fr_1fr_1fr_1.2fr_1.4fr]' : 'grid-cols-[2fr_1fr_1fr_1.2fr]'">
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">标题</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">类型</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">状态</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]" :class="{ 'text-right': !isRoot }">提交时间</span>
        <span v-if="isRoot" class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">操作</span>
      </div>

      <!-- 加载骨架 -->
      <template v-if="pending">
        <div v-for="i in 3" :key="i" class="flex items-center gap-4 border-b border-[#e5e7eb] px-6 py-5 last:border-0">
          <div class="h-4 flex-1 animate-pulse rounded bg-[#eeece7]"></div>
        </div>
      </template>

      <!-- 错误 -->
      <p v-else-if="error" class="px-6 py-8 text-center text-[14px] text-[#b30000]">工单加载失败，请稍后重试。</p>

      <!-- 空 -->
      <p v-else-if="!tickets.length" class="px-6 py-12 text-center text-[14px] text-[#93939f]">还没有提交过工单。</p>

      <!-- 工单行 -->
      <template v-else>
        <div
          v-for="(t, idx) in tickets"
          :key="t.id"
          class="grid cursor-pointer grid-cols-1 gap-2 px-6 py-5 transition-colors hover:bg-[#faf9f7] md:items-center md:gap-4"
          :class="[isRoot ? 'md:grid-cols-[2fr_1fr_1fr_1.2fr_1.4fr]' : 'md:grid-cols-[2fr_1fr_1fr_1.2fr]', { 'border-b border-[#e5e7eb]': idx < tickets.length - 1 }]"
          @click="openDetail(t)"
        >
          <div>
            <p class="text-[16px] leading-[1.5] text-[#17171c]">{{ t.title }}</p>
            <p v-if="t.subscription_name" class="mt-0.5 text-[12px] text-[#93939f]">订阅：{{ t.subscription_name }}</p>
            <p v-if="isRoot && t.alipay_account" class="mt-0.5 text-[12px] text-[#93939f]">支付宝：{{ t.alipay_account }}（{{ t.alipay_name }}）</p>
            <p v-if="isRoot" class="mt-0.5 text-[12px] text-[#93939f]">用户：{{ t.username }} · #{{ t.id }}</p>
          </div>
          <span class="text-[14px] text-[#616161]">{{ t.typeLabel }}</span>
          <div>
            <span class="rounded-full px-2.5 py-0.5 text-[12px]" :class="t.statusInfo.cls">{{ t.statusInfo.label }}</span>
          </div>
          <span class="text-[14px] text-[#616161]" :class="{ 'md:text-right': !isRoot }">{{ t.time }}</span>
          <!-- 管理端状态流转 -->
          <div v-if="isRoot" class="flex flex-wrap gap-1.5 md:justify-end" @click.stop>
            <button
              v-for="a in statusActions"
              :key="a.value"
              class="rounded-[30px] border px-2.5 py-1 text-[12px] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              :class="a.value === t.statusKey ? 'border-[#17171c] bg-[#17171c] text-white' : 'border-[#d9d9dd] text-[#17171c] hover:bg-[#eeece7]'"
              :disabled="updatingId === t.id || a.value === t.statusKey"
              @click="changeStatus(t, a.value)"
            >{{ a.label }}</button>
          </div>
        </div>
      </template>
    </div>

    <!-- 分页 -->
    <div v-if="!pending && totalPages > 1" class="mt-6 flex items-center justify-between">
      <span class="text-[14px] text-[#616161]">第 {{ page }} / {{ totalPages }} 页，共 {{ total }} 条</span>
      <div class="flex items-center gap-1">
        <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:text-[#93939f] enabled:hover:bg-[#eeece7]" :disabled="page <= 1" @click="page--">上一页</button>
        <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:text-[#93939f] enabled:hover:bg-[#eeece7]" :disabled="page >= totalPages" @click="page++">下一页</button>
      </div>
    </div>
  </section>
</template>
