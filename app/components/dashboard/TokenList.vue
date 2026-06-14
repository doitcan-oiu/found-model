<script setup>
// 令牌列表（API Key）
const QUOTA_PER_UNIT = 500000
const PAGE_SIZE = 10

const page = ref(1)
const createOpen = ref(false)

const { data: res, pending, error, refresh } = await useFetch('/api/token', {
  query: { page, size: PAGE_SIZE },
  lazy: true,
  server: false
})

const total = computed(() => res.value?.data?.total ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))

const tokens = computed(() => {
  const items = res.value?.data?.items ?? []
  return items.map((it) => {
    const remain = (it.remain_quota || 0) / QUOTA_PER_UNIT
    const used = (it.used_quota || 0) / QUOTA_PER_UNIT
    return {
      id: it.id,
      name: it.name,
      key: it.key,
      enabled: it.status === 1,
      group: it.group || '默认',
      unlimited: it.unlimited_quota,
      remain,
      total: remain + used,
      created: formatDate(it.created_time),
      accessed: it.accessed_time ? formatDate(it.accessed_time) : '从未使用'
    }
  })
})

function formatDate(ts) {
  if (!ts || ts < 0) return ''
  const d = new Date(ts * 1000)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function formatUsd(n) {
  return '$' + (n || 0).toFixed(2)
}

const message = useMessage()
const { copy } = useCopy()

// 复制完整密钥：先取 key，再复制（兼容非 HTTPS）
const copyingId = ref(null)
async function copyKey(t) {
  copyingId.value = t.id
  try {
    const res = await $fetch(`/api/token/${t.id}/key`, { method: 'POST' })
    const key = res?.data?.key
    if (!key) throw new Error('no key')
    const ok = await copy(key)
    if (ok) message.success('已复制', '完整密钥已复制到剪贴板')
    else message.error('复制失败', '请手动复制')
  } catch (err) {
    message.error('复制失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    copyingId.value = null
  }
}

const cols = 'md:grid-cols-[1.2fr_1.7fr_0.8fr_1.1fr_1fr_1.4fr]'

// 启用 / 禁用
const togglingId = ref(null)
async function toggleStatus(t) {
  togglingId.value = t.id
  const nextStatus = t.enabled ? 2 : 1
  try {
    await $fetch('/api/token/status', {
      method: 'PUT',
      body: { id: t.id, status: nextStatus }
    })
    message.success(nextStatus === 1 ? '已启用' : '已禁用')
    await refresh()
  } catch (err) {
    message.error('操作失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    togglingId.value = null
  }
}

// 删除（先弹确认框）
const deleteOpen = ref(false)
const deleteTarget = ref(null)
const deleting = ref(false)

function askDelete(t) {
  deleteTarget.value = t
  deleteOpen.value = true
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await $fetch(`/api/token/${deleteTarget.value.id}`, { method: 'DELETE' })
    message.success('已删除', `密钥「${deleteTarget.value.name}」已删除`)
    deleteOpen.value = false
    await refresh()
  } catch (err) {
    message.error('删除失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    deleting.value = false
  }
}

</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">令牌列表</h2>
      <div class="flex items-center gap-4">
        <span class="hidden text-[14px] text-[#616161] sm:inline">共 {{ total }} 个密钥</span>
        <button
          class="inline-flex shrink-0 items-center gap-1.5 rounded-[32px] bg-[#17171c] px-4 py-2 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black"
          @click="createOpen = true"
        >
          <span class="text-[16px] leading-none">+</span> 创建密钥
        </button>
      </div>
    </div>

    <!-- 创建令牌弹窗 -->
    <DashboardCreateTokenModal v-model:open="createOpen" @created="refresh" />

    <div class="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
      <!-- 表头 -->
      <div class="hidden items-center gap-4 border-b border-[#d9d9dd] px-6 py-4 md:grid" :class="cols">
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">名称</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">密钥</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">分组</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">剩余 / 总额度</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">创建时间</span>
        <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">操作</span>
      </div>

      <!-- 加载骨架 -->
      <template v-if="pending">
        <div v-for="i in 3" :key="i" class="flex items-center gap-4 border-b border-[#e5e7eb] px-6 py-5 last:border-0">
          <div class="h-4 flex-1 animate-pulse rounded bg-[#eeece7]"></div>
        </div>
      </template>

      <!-- 错误 -->
      <p v-else-if="error" class="px-6 py-8 text-center text-[14px] text-[#b30000]">令牌加载失败，请稍后重试。</p>

      <!-- 空 -->
      <p v-else-if="!tokens.length" class="px-6 py-12 text-center text-[14px] text-[#93939f]">还没有创建任何密钥。</p>

      <!-- 令牌行 -->
      <template v-else>
        <div
          v-for="(t, idx) in tokens"
          :key="t.id"
          class="grid grid-cols-1 gap-2 px-6 py-5 md:items-center md:gap-4"
          :class="[cols, { 'border-b border-[#e5e7eb]': idx < tokens.length - 1 }]"
        >
          <!-- 名称 + 状态 -->
          <div class="flex items-center gap-2">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">{{ t.name }}</span>
            <span
              class="shrink-0 rounded-full px-2.5 py-0.5 text-[12px]"
              :class="t.enabled ? 'bg-[#edfce9] text-[#003c33]' : 'bg-[#eeece7] text-[#75758a]'"
            >{{ t.enabled ? '启用' : '已停用' }}</span>
          </div>
          <!-- 密钥 -->
          <code class="text-[14px] tracking-[0.28px] text-[#616161] break-all">{{ t.key }}</code>
          <!-- 分组 -->
          <span class="text-[14px] leading-[1.4] text-[#616161]">{{ t.group }}</span>
          <!-- 额度 -->
          <span class="text-[14px] leading-[1.4] text-[#616161]">
            <template v-if="t.unlimited">无限额度</template>
            <template v-else>{{ formatUsd(t.remain) }} / {{ formatUsd(t.total) }}</template>
          </span>
          <!-- 创建时间 -->
          <span class="text-[14px] leading-[1.4] text-[#616161]">{{ t.created }}</span>
          <!-- 操作 -->
          <div class="flex shrink-0 gap-2 md:justify-end">
            <button
              class="shrink-0 whitespace-nowrap rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7] disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="copyingId === t.id"
              @click="copyKey(t)"
            >{{ copyingId === t.id ? '复制中…' : '复制' }}</button>
            <button
              class="shrink-0 whitespace-nowrap rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7] disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="togglingId === t.id"
              @click="toggleStatus(t)"
            >{{ t.enabled ? '禁用' : '启用' }}</button>
            <button class="shrink-0 whitespace-nowrap rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#b30000] transition-colors hover:bg-[#eeece7]" @click="askDelete(t)">删除</button>
          </div>
        </div>
      </template>
    </div>

    <!-- 分页 -->
    <div v-if="!pending && totalPages > 1" class="mt-6 flex items-center justify-between">
      <span class="text-[14px] text-[#616161]">第 {{ page }} / {{ totalPages }} 页，共 {{ total }} 个</span>
      <div class="flex items-center gap-1">
        <button
          class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:text-[#93939f] enabled:hover:bg-[#eeece7]"
          :disabled="page <= 1"
          @click="page--"
        >上一页</button>
        <button
          class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:text-[#93939f] enabled:hover:bg-[#eeece7]"
          :disabled="page >= totalPages"
          @click="page++"
        >下一页</button>
      </div>
    </div>

    <p class="mt-4 text-[12px] leading-[1.4] text-[#93939f]">
      请勿在客户端代码或公开仓库中暴露密钥。如怀疑泄露，请立即删除并重新创建。
    </p>

    <!-- 删除确认弹窗 -->
    <UModal v-model:open="deleteOpen" title="删除密钥">
      <template #body>
        <p class="text-[16px] leading-[1.6] text-[#17171c]">
          确定要删除密钥「{{ deleteTarget?.name }}」吗？删除后使用该密钥的应用将无法继续调用，且不可恢复。
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            class="rounded-[30px] border border-[#d9d9dd] px-4 py-2 text-[14px] font-medium text-[#17171c] transition-colors hover:bg-[#eeece7]"
            @click="deleteOpen = false"
          >取消</button>
          <button
            class="rounded-[32px] bg-[#b30000] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#8f0000] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="deleting"
            @click="confirmDelete"
          >{{ deleting ? '删除中…' : '确认删除' }}</button>
        </div>
      </template>
    </UModal>
  </section>
</template>
