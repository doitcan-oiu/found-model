<script setup>
// 额度换算：500000 quota = $1
const QUOTA_PER_UNIT = 500000
const PAGE_SIZE = 10

// 今日范围：今天 0 点 ~ 现在
const now = new Date()
const todayStart = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000)
const nowTs = Math.floor(now.getTime() / 1000)

const page = ref(1)

const { data: res, pending, error } = await useFetch('/api/log/self', {
  query: {
    page,
    page_size: PAGE_SIZE,
    start_timestamp: todayStart,
    end_timestamp: nowTs
  },
  lazy: true,
  server: false
})

const total = computed(() => res.value?.data?.total ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))

// 解析每条记录（含 other JSON）
const records = computed(() => {
  const items = res.value?.data?.items ?? []
  return items.map((it) => {
    let other = {}
    try {
      other = it.other ? JSON.parse(it.other) : {}
    } catch {
      other = {}
    }

    const input = it.prompt_tokens || 0
    const output = it.completion_tokens || 0
    const cacheRead = other.cache_tokens || 0
    const cacheWrite = other.cache_write_tokens || other.cache_creation_tokens || 0

    return {
      id: it.id,
      time: formatTime(it.created_at),
      model: it.model_name,
      input,
      output,
      cacheRead,
      cacheWrite,
      cost: (it.quota || 0) / QUOTA_PER_UNIT,
      // 详情
      requestId: it.request_id,
      channel: it.channel_name || ('#' + it.channel),
      group: it.group,
      tokenName: it.token_name,
      useTime: it.use_time,
      frt: other.frt,
      // 各项 1M tokens 单价（$）
      prices: buildPrices(other),
      // 计费过程
      billing: buildBilling({ input, output, cacheRead, cacheWrite, other, quota: it.quota || 0 })
    }
  })
})

// 各项每 1M tokens 最终单价（$）：ratio * (1e6 / 500000) * 分组倍率
function buildPrices(other) {
  const factor = 1e6 / QUOTA_PER_UNIT
  const mr = other.model_ratio
  if (mr == null) return null
  // 分组倍率：user_group_ratio >= 0 时优先，否则用 group_ratio
  let groupRatio = other.group_ratio != null ? other.group_ratio : 1
  if (other.user_group_ratio != null && other.user_group_ratio >= 0) groupRatio = other.user_group_ratio
  const base = mr * factor * groupRatio
  return {
    input: base,
    output: other.completion_ratio != null ? base * other.completion_ratio : null,
    cacheRead: other.cache_ratio != null ? base * other.cache_ratio : null,
    cacheWrite: other.cache_creation_ratio != null ? base * other.cache_creation_ratio : null
  }
}

// 构造计费过程
// 价格基准：500000 quota = $1，故每 1M tokens 单价 = ratio * (1e6 / 500000) = ratio * 2
function buildBilling({ input, output, cacheRead, cacheWrite, other, quota }) {
  const factor = 1e6 / QUOTA_PER_UNIT
  const mr = other.model_ratio
  // 分组倍率：user_group_ratio >= 0 时优先，否则用 group_ratio
  let groupRatio = other.group_ratio
  if (other.user_group_ratio != null && other.user_group_ratio >= 0) groupRatio = other.user_group_ratio

  const terms = []
  if (mr != null) {
    if (input > 0) terms.push({ label: '提示', tokens: input, price: mr * factor })
    if (cacheWrite > 0 && other.cache_creation_ratio != null) {
      terms.push({ label: '缓存创建', tokens: cacheWrite, price: mr * other.cache_creation_ratio * factor })
    }
    if (cacheRead > 0 && other.cache_ratio != null) {
      terms.push({ label: '缓存读取', tokens: cacheRead, price: mr * other.cache_ratio * factor })
    }
    if (output > 0 && other.completion_ratio != null) {
      terms.push({ label: '补全', tokens: output, price: mr * other.completion_ratio * factor })
    }
  }

  return {
    terms,
    groupRatio,
    total: quota / QUOTA_PER_UNIT
  }
}

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts * 1000)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

function formatNumber(n) {
  return (n || 0).toLocaleString('zh-CN')
}

function formatUsd(n) {
  return '$' + (n || 0).toFixed(4)
}
</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">今日消费</h2>
      <span class="text-[14px] text-[#616161]">共 {{ total }} 条</span>
    </div>

    <div class="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
      <!-- 表头 -->
      <div class="hidden grid-cols-[1.6fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_28px] gap-4 border-b border-[#d9d9dd] px-6 py-4 md:grid">
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">时间</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">模型</span>
        <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">输入</span>
        <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">输出</span>
        <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">缓存读</span>
        <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">缓存写</span>
        <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">费用</span>
        <span></span>
      </div>

      <!-- 加载骨架 -->
      <template v-if="pending">
        <div v-for="i in 5" :key="i" class="flex items-center gap-4 border-b border-[#e5e7eb] px-6 py-5 last:border-0">
          <div class="h-4 flex-1 animate-pulse rounded bg-[#eeece7]"></div>
        </div>
      </template>

      <!-- 错误 -->
      <p v-else-if="error" class="px-6 py-8 text-center text-[14px] text-[#b30000]">消费记录加载失败，请稍后重试。</p>

      <!-- 空 -->
      <p v-else-if="!records.length" class="px-6 py-12 text-center text-[14px] text-[#93939f]">今日暂无消费记录。</p>

      <!-- 记录列表 -->
      <template v-else>
        <details v-for="rec in records" :key="rec.id" class="group border-b border-[#e5e7eb] last:border-0">
          <summary class="grid cursor-pointer grid-cols-2 gap-x-4 gap-y-2 px-6 py-4 marker:content-none hover:bg-[#faf9f7] md:grid-cols-[1.6fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_28px] md:items-center md:gap-4">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">{{ rec.time }}</span>
            <span class="text-[14px] leading-[1.4] text-[#616161]">{{ rec.model }}</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输入 </span>{{ formatNumber(rec.input) }}</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输出 </span>{{ formatNumber(rec.output) }}</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存读 </span>{{ formatNumber(rec.cacheRead) }}</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存写 </span>{{ formatNumber(rec.cacheWrite) }}</span>
            <span class="text-[16px] leading-[1.5] text-[#17171c] md:text-right">{{ formatUsd(rec.cost) }}</span>
            <span class="hidden text-[#93939f] transition-transform group-open:rotate-45 md:flex md:justify-end">+</span>
          </summary>
          <!-- 计费详情 -->
          <div class="border-t border-[#e5e7eb] bg-[#faf9f7] px-6 py-5">
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">请求信息</p>
                <dl class="mt-2 space-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between gap-4"><dt class="text-[#616161]">请求 ID</dt><dd class="truncate text-[#17171c]">{{ rec.requestId }}</dd></div>
                  <div class="flex justify-between gap-4"><dt class="text-[#616161]">渠道</dt><dd class="text-[#17171c]">{{ rec.channel }}</dd></div>
                  <div class="flex justify-between gap-4"><dt class="text-[#616161]">分组</dt><dd class="text-[#17171c]">{{ rec.group }}</dd></div>
                  <div class="flex justify-between gap-4"><dt class="text-[#616161]">令牌</dt><dd class="text-[#17171c]">{{ rec.tokenName }}</dd></div>
                  <div v-if="rec.useTime != null" class="flex justify-between gap-4"><dt class="text-[#616161]">耗时</dt><dd class="text-[#17171c]">{{ rec.useTime }}s<span v-if="rec.frt"> · 首字 {{ rec.frt }}ms</span></dd></div>
                </dl>
              </div>
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">最终单价（每 1M tokens，含分组倍率）</p>
                <dl v-if="rec.prices" class="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between gap-2"><dt class="text-[#616161]">输入</dt><dd class="text-[#17171c]">${{ rec.prices.input.toFixed(6) }}</dd></div>
                  <div v-if="rec.prices.output != null" class="flex justify-between gap-2"><dt class="text-[#616161]">输出</dt><dd class="text-[#17171c]">${{ rec.prices.output.toFixed(6) }}</dd></div>
                  <div v-if="rec.prices.cacheRead != null" class="flex justify-between gap-2"><dt class="text-[#616161]">缓存读</dt><dd class="text-[#17171c]">${{ rec.prices.cacheRead.toFixed(6) }}</dd></div>
                  <div v-if="rec.prices.cacheWrite != null" class="flex justify-between gap-2"><dt class="text-[#616161]">缓存写</dt><dd class="text-[#17171c]">${{ rec.prices.cacheWrite.toFixed(6) }}</dd></div>
                </dl>

                <p class="mt-4 text-[12px] uppercase tracking-[0.28px] text-[#75758a]">计费过程</p>
                <p class="mt-2 text-[14px] leading-[1.7] text-[#17171c]">
                  <template v-for="(t, i) in rec.billing.terms" :key="i">
                    <span v-if="i > 0" class="text-[#75758a]"> + </span>{{ t.label }} {{ formatNumber(t.tokens) }} tokens / 1M tokens × ${{ t.price.toFixed(6) }}</template>
                  <span v-if="rec.billing.groupRatio != null" class="text-[#75758a]"> × 分组倍率 {{ rec.billing.groupRatio }}</span>
                  <span class="text-[#75758a]"> = </span><span class="font-medium">{{ formatUsd(rec.billing.total) }}</span>
                </p>
              </div>
            </div>
          </div>
        </details>
      </template>
    </div>

    <!-- 分页 -->
    <div v-if="!pending && totalPages > 1" class="mt-6 flex items-center justify-between">
      <span class="text-[14px] text-[#616161]">第 {{ page }} / {{ totalPages }} 页，共 {{ total }} 条</span>
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
  </section>
</template>
