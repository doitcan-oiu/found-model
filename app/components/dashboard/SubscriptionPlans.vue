<script setup>
// 额度换算：500000 quota = $1
const QUOTA_PER_UNIT = 500000

const { data: res, pending, error } = await useFetch('/api/subscription/plans', {
  key: 'subscription-plans',
  lazy: true,
  server: false
})

// 货币符号
const currencySymbol = { USD: '$', CNY: '¥', EUR: '€' }
// 周期单位
const durationText = { month: '月', day: '天', year: '年', week: '周' }

const plans = computed(() => {
  const list = res.value?.data ?? []
  return list.map((item) => {
    const p = item.plan || item
    const [name, tag] = (p.title || '').split('#')
    return {
      id: p.id,
      name: name || p.title,
      tag: tag || '',
      // subtitle 用 <br> 分隔，拆成一行行特性
      features: (p.subtitle || '').split(/<br\s*\/?>/i).map((s) => s.trim()).filter(Boolean),
      symbol: currencySymbol[p.currency] || '',
      price: p.price_amount,
      unit: durationText[p.duration_unit] || p.duration_unit,
      durationValue: p.duration_value || 1,
      // 总额度：total_amount 折算为美元
      totalQuota: Math.round((p.total_amount || 0) / QUOTA_PER_UNIT)
    }
  })
})

// 默认中间套餐为最受欢迎
const popularIndex = computed(() => (plans.value.length ? Math.floor(plans.value.length / 2) : -1))

function periodLabel(plan) {
  return plan.durationValue > 1 ? `/ ${plan.durationValue} ${plan.unit}` : `/ ${plan.unit}`
}
</script>

<template>
  <section>
    <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">订阅套餐</h2>

    <!-- 加载骨架 -->
    <div v-if="pending" class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div v-for="i in 3" :key="i" class="rounded-lg border border-[#e5e7eb] bg-white p-8">
        <div class="h-4 w-16 animate-pulse rounded bg-[#eeece7]"></div>
        <div class="mt-3 h-6 w-24 animate-pulse rounded bg-[#eeece7]"></div>
        <div class="mt-4 h-10 w-20 animate-pulse rounded bg-[#eeece7]"></div>
        <div class="mt-6 space-y-3">
          <div v-for="j in 4" :key="j" class="h-4 w-full animate-pulse rounded bg-[#eeece7]"></div>
        </div>
        <div class="mt-8 h-11 w-full animate-pulse rounded-full bg-[#eeece7]"></div>
      </div>
    </div>

    <!-- 错误 -->
    <p v-else-if="error" class="mt-8 text-[14px] leading-[1.4] text-[#b30000]">套餐加载失败，请稍后重试。</p>

    <!-- 空 -->
    <p v-else-if="!plans.length" class="mt-8 text-[14px] leading-[1.4] text-[#93939f]">暂无可用套餐。</p>

    <!-- 套餐卡片 -->
    <div v-else class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div
        v-for="(plan, idx) in plans"
        :key="plan.id"
        class="flex flex-col rounded-lg border p-8"
        :class="idx === popularIndex
          ? 'border-[#17171c] bg-[#003c33] text-white'
          : 'border-[#e5e7eb] bg-[#eeece7]'"
      >
        <!-- 标签行 -->
        <div class="flex items-center justify-between">
          <p
            class="text-[14px] uppercase tracking-[0.28px]"
            :class="idx === popularIndex ? 'text-[#edfce9]' : 'text-[#75758a]'"
          >{{ plan.tag }}</p>
          <span
            v-if="idx === popularIndex"
            class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]"
          >最受欢迎</span>
        </div>

        <!-- 名称 -->
        <h3
          class="mt-2 text-[24px] leading-[1.3]"
          :class="idx === popularIndex ? 'text-white' : 'text-[#17171c]'"
        >{{ plan.name }}</h3>

        <!-- 价格 -->
        <div class="mt-4 flex items-end gap-1">
          <span
            class="text-[48px] leading-none tracking-[-0.48px]"
            :class="idx === popularIndex ? 'text-white' : 'text-[#17171c]'"
          >￥{{ plan.price }}</span>
          <span
            class="pb-1 text-[14px]"
            :class="idx === popularIndex ? 'text-[#edfce9]' : 'text-[#616161]'"
          >{{ periodLabel(plan) }}</span>
        </div>

        <!-- 分隔线 -->
        <div
          class="my-6 h-px w-full"
          :class="idx === popularIndex ? 'bg-white/20' : 'bg-[#d9d9dd]'"
        ></div>

        <!-- 特性（一行一个） -->
        <ul
          class="flex-1 space-y-3 text-[16px] leading-[1.5]"
          :class="idx === popularIndex ? 'text-[#edfce9]' : 'text-[#212121]'"
        >
          <li class="flex gap-2 font-medium">
            <span :class="idx === popularIndex ? 'text-white' : 'text-[#003c33]'">✓</span>
            总额度：{{ plan.symbol }}{{ plan.totalQuota.toLocaleString('zh-CN') }}
          </li>
          <li v-for="(feat, i) in plan.features" :key="i" class="flex gap-2">
            <span :class="idx === popularIndex ? 'text-white' : 'text-[#003c33]'">✓</span>
            {{ feat }}
          </li>
        </ul>

        <!-- 按钮 -->
        <button
          class="mt-8 w-full rounded-[32px] px-6 py-3 text-[14px] font-medium leading-[1.71] transition-colors"
          :class="idx === popularIndex
            ? 'bg-white text-[#17171c] hover:bg-[#eeece7]'
            : 'border border-[#17171c] bg-transparent text-[#17171c] hover:bg-[#17171c] hover:text-white'"
        >
          选择{{ plan.name }}
        </button>
      </div>
    </div>
  </section>
</template>
