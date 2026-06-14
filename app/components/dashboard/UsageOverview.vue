<script setup>
// 概览统计：今日花费 / RPM / TPM
const QUOTA_PER_UNIT = 500000

const now = new Date()
const todayStart = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000)
const nowTs = Math.floor(now.getTime() / 1000)

const { data: res, pending } = await useFetch('/api/log/self/stat', {
  query: {
    start_timestamp: todayStart,
    end_timestamp: nowTs
  },
  lazy: true,
  server: false
})

const stat = computed(() => res.value?.data ?? { quota: 0, rpm: 0, tpm: 0 })

function formatNumber(n) {
  return (n || 0).toLocaleString('zh-CN')
}

const cards = computed(() => [
  { label: '今日花费', value: '$' + (stat.value.quota / QUOTA_PER_UNIT).toFixed(4), hint: '今日累计消费' },
  { label: 'RPM', value: formatNumber(stat.value.rpm), hint: '每分钟请求数' },
  { label: 'TPM', value: formatNumber(stat.value.tpm), hint: '每分钟 Tokens 数' }
])
</script>

<template>
  <section class="grid grid-cols-1 gap-6 sm:grid-cols-3">
    <template v-if="pending">
      <div v-for="i in 3" :key="i" class="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <div class="h-3.5 w-20 animate-pulse rounded bg-[#eeece7]"></div>
        <div class="mt-4 h-8 w-28 animate-pulse rounded bg-[#eeece7]"></div>
        <div class="mt-3 h-3.5 w-24 animate-pulse rounded bg-[#eeece7]"></div>
      </div>
    </template>
    <template v-else>
      <div v-for="card in cards" :key="card.label" class="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">{{ card.label }}</p>
        <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">{{ card.value }}</p>
        <p class="mt-1 text-[14px] text-[#616161]">{{ card.hint }}</p>
      </div>
    </template>
  </section>
</template>
