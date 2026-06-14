<script setup>
// 数据看板（仅客户端请求，避免慢接口阻塞 SSR）
// 额度换算：500000 quota = 1 元
const QUOTA_PER_YUAN = 500000

// 本月时间范围（起始为本月 1 号 0 点，结束为当前）
const now = new Date()
const monthStart = Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000)
const nowTs = Math.floor(now.getTime() / 1000)

// lazy + server:false：不在 SSR 阶段请求，客户端挂载后再拉取
const { data: res, pending, error } = await useFetch('/api/dashboard/data', {
  query: {
    start_timestamp: monthStart,
    end_timestamp: nowTs,
    default_time: 'day'
  },
  lazy: true,
  server: false
})

const records = computed(() => res.value?.data ?? [])

// 汇总指标
const stats = computed(() => {
  let count = 0
  let tokens = 0
  let quota = 0
  const models = new Set()

  for (const item of records.value) {
    count += item.count || 0
    tokens += item.token_used || 0
    quota += item.quota || 0
    if (item.model_name) models.add(item.model_name)
  }

  return {
    count,
    tokens,
    cost: quota / QUOTA_PER_YUAN,
    modelCount: models.size
  }
})

// 格式化
function formatNumber(n) {
  return (n || 0).toLocaleString('zh-CN')
}

function formatTokens(n) {
  if (n >= 1e8) return (n / 1e8).toFixed(2) + ' 亿'
  if (n >= 1e4) return (n / 1e4).toFixed(2) + ' 万'
  return formatNumber(n)
}

function formatYuan(n) {
  return '$' + (n || 0).toFixed(2)
}

const cards = computed(() => [
  { label: '调用次数', value: formatNumber(stats.value.count), hint: '次请求' },
  { label: '消耗 Tokens', value: formatTokens(stats.value.tokens), hint: '输入 + 输出' },
  { label: '使用模型', value: String(stats.value.modelCount), hint: '个模型' },
  { label: '消费金额', value: formatYuan(stats.value.cost), hint: '本月累计' }
])
</script>

<template>
  <section>
    <div class="flex items-end justify-between">
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">数据看板</h2>
      <span class="text-[14px] text-[#616161]">本月</span>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- 加载骨架 -->
      <template v-if="pending">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-lg border border-[#e5e7eb] bg-white p-6"
        >
          <div class="h-3.5 w-20 animate-pulse rounded bg-[#eeece7]"></div>
          <div class="mt-4 h-8 w-28 animate-pulse rounded bg-[#eeece7]"></div>
          <div class="mt-3 h-3.5 w-16 animate-pulse rounded bg-[#eeece7]"></div>
        </div>
      </template>

      <!-- 数据卡片 -->
      <template v-else>
        <div
          v-for="card in cards"
          :key="card.label"
          class="rounded-lg border border-[#e5e7eb] bg-white p-6"
        >
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">{{ card.label }}</p>
          <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">{{ card.value }}</p>
          <p class="mt-1 text-[14px] text-[#616161]">{{ card.hint }}</p>
        </div>
      </template>
    </div>

    <!-- 错误提示 -->
    <p v-if="error" class="mt-4 text-[14px] leading-[1.4] text-[#b30000]">
      数据加载失败，请稍后重试。
    </p>
  </section>
</template>
