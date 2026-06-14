<script setup>
// 各渠道可用额度（基于 /api/pricing）
const QUOTA_PER_UNIT = 500000

const { data: res, pending, error } = await useFetch('/api/pricing', {
  key: 'pricing',
  lazy: true,
  server: false
})

// 套餐列表（与 SubscriptionPlans 同 key 复用，用于折算价格区间）
const { data: planRes } = await useFetch('/api/subscription/plans', {
  key: 'subscription-plans',
  lazy: true,
  server: false
})

// 当前用户已拥有的订阅（用于按已购套餐折算实际倍率）
const { subscriptions } = useMySubscription()

const models = computed(() => res.value?.data?.models ?? [])
const vendors = computed(() => res.value?.data?.vendors ?? [])
const groupRatio = computed(() => res.value?.data?.groupRatio ?? {})
const usableGroup = computed(() => res.value?.data?.usableGroup ?? {})

// 套餐单价表：plan_id -> ¥/$（price_amount / 到账额度）
const planRateMap = computed(() => {
  const map = {}
  for (const item of planRes.value?.data ?? []) {
    const p = item.plan || item
    const credit = (p.total_amount || 0) / QUOTA_PER_UNIT
    if (credit > 0 && p.price_amount > 0) map[String(p.id)] = p.price_amount / credit
  }
  return map
})

// 折算基准：每获得 $1 平台额度需付的价格区间（取自套餐最低/最高单价）
const baseRate = computed(() => {
  const rates = Object.values(planRateMap.value)
  if (!rates.length) return null
  return { min: Math.min(...rates), max: Math.max(...rates) }
})

// 当前用户已购套餐中最划算（¥/$ 最低）的单价；未订阅则为 null
const ownedBestRate = computed(() => {
  const rates = []
  for (const s of subscriptions.value) {
    const r = planRateMap.value[String(s.planId)]
    if (r != null) rates.push(r)
  }
  return rates.length ? Math.min(...rates) : null
})

// 是否中文名
function isChinese(s) {
  return /[一-龥]/.test(s || '')
}

// 只保留“有模型”的厂商，并排序：A-Z，中文名放最后
const activeVendors = computed(() => {
  const ids = new Set(models.value.map((m) => m.vendor_id))
  return vendors.value
    .filter((v) => ids.has(v.id))
    .slice()
    .sort((a, b) => {
      const ca = isChinese(a.name)
      const cb = isChinese(b.name)
      if (ca !== cb) return ca ? 1 : -1 // 中文排后
      return a.name.localeCompare(b.name, 'zh')
    })
})

// 当前选中厂商
const currentVendorId = ref(null)
watch(activeVendors, (list) => {
  if (list.length && currentVendorId.value == null) currentVendorId.value = list[0].id
}, { immediate: true })

// 当前厂商下的模型
const vendorModels = computed(() => models.value.filter((m) => m.vendor_id === currentVendorId.value))

// 接口类型友好名
const endpointLabels = { anthropic: 'Anthropic', openai: 'OpenAI', gemini: 'Gemini' }

// 按分组（渠道）聚合：分组 -> 该厂商在此分组可用的模型
const channels = computed(() => {
  const map = {}
  for (const m of vendorModels.value) {
    for (const g of (m.enable_groups || [])) {
      if (!map[g]) map[g] = { names: [], endpoints: new Set(), quotaTypes: new Set() }
      map[g].names.push(m.model_name)
      for (const e of (m.supported_endpoint_types || [])) map[g].endpoints.add(e)
      map[g].quotaTypes.add(m.quota_type)
    }
  }
  return Object.entries(map)
    .map(([group, info]) => {
      const ratio = groupRatio.value[group] ?? 1
      // 折算：每 $1 实际用量需付的价格区间 = 套餐单价区间 × 分组倍率
      let convert = null
      if (baseRate.value) {
        convert = {
          low: baseRate.value.min * ratio,
          high: baseRate.value.max * ratio
        }
      }
      // 计费方式：含 quota_type 0 => 按量，含 1 => 按次（可能两者都有）
      const billing = []
      if (info.quotaTypes.has(0)) billing.push('按量计费')
      if (info.quotaTypes.has(1)) billing.push('按次计费')
      return {
        group,
        ratio,
        // 实际倍率：按当前用户已购最划算套餐折算；未订阅则为 null（显示原始倍率）
        effectiveRatio: ownedBestRate.value != null ? ratio * ownedBestRate.value : null,
        convert,
        desc: usableGroup.value[group] || '',
        models: info.names,
        endpoints: [...info.endpoints].map((e) => endpointLabels[e] || e),
        billing
      }
    })
    .sort((a, b) => a.ratio - b.ratio)
})

function fmtMoney(n) {
  return '¥' + (n || 0).toFixed(2)
}
</script>


<template>
  <section>
    <div class="flex flex-col gap-6">
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">各渠道可用额度</h2>

      <!-- 加载 -->
      <div v-if="pending" class="h-40 w-full animate-pulse rounded-lg bg-[#eeece7]"></div>
      <p v-else-if="error" class="text-[14px] text-[#b30000]">额度信息加载失败，请稍后重试。</p>

      <template v-else>
        <!-- 厂商选择 -->
        <div>
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">选择厂商</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button
              v-for="v in activeVendors"
              :key="v.id"
              class="rounded-[30px] border px-4 py-2 text-[14px] font-medium leading-[1.71] transition-colors"
              :class="v.id === currentVendorId
                ? 'border-[#17171c] bg-[#17171c] text-white'
                : 'border-[#d9d9dd] bg-transparent text-[#17171c] hover:bg-[#eeece7]'"
              @click="currentVendorId = v.id"
            >{{ v.name }}</button>
          </div>
        </div>

        <!-- 渠道卡片 -->
        <div v-if="channels.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(c, idx) in channels"
            :key="c.group"
            class="flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-6"
          >
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-[24px] leading-[1.3] text-[#17171c]">{{ c.group }}</h3>
              <span
                v-if="idx === 0"
                class="shrink-0 rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]"
              >最划算</span>
            </div>

            <!-- 折算 -->
            <div class="mt-3 flex items-center gap-1.5">
              <span v-if="c.convert" class="text-[14px] text-[#616161]">折算 {{ fmtMoney(c.convert.low) }} ~ {{ fmtMoney(c.convert.high) }} = $1</span>
              <span v-else class="text-[14px] text-[#616161]">分组倍率 {{ c.ratio }}x</span>
              <span class="group relative inline-flex">
                <span class="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[#93939f] text-[11px] text-[#93939f]">?</span>
                <span class="pointer-events-none absolute left-1/2 top-6 z-10 hidden w-64 -translate-x-1/2 rounded-[8px] bg-[#17171c] px-3 py-2 text-[12px] leading-[1.4] text-white group-hover:block">
                  <span class="font-medium">折算说明：</span>按套餐最低/最高单价 × 分组倍率（{{ c.ratio }}x）估算，即每消耗 $1 实际用量约需充值的人民币区间。
                </span>
              </span>
            </div>

            <!-- 关键信息 -->
            <div class="mt-4 grid grid-cols-2 gap-3">
              <div class="rounded-[8px] bg-[#eeece7] px-4 py-3">
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">分组倍率</p>
                <p class="mt-1 text-[20px] leading-[1.3] text-[#17171c]">
                  {{ (c.effectiveRatio ?? c.ratio).toFixed(2) }}x
                </p>
                <p v-if="c.effectiveRatio != null && c.effectiveRatio !== c.ratio" class="text-[12px] text-[#93939f]">原价 {{ c.ratio }}x</p>
              </div>
              <div class="rounded-[8px] bg-[#eeece7] px-4 py-3">
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">模型数量</p>
                <p class="mt-1 text-[20px] leading-[1.3] text-[#17171c]">{{ c.models.length }}</p>
              </div>
            </div>

            <!-- 计费方式 + 接口类型 -->
            <div class="mt-4 grid grid-cols-2 gap-3">
              <div v-if="c.billing.length">
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">计费方式</p>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="b in c.billing"
                    :key="b"
                    class="rounded-full px-2.5 py-0.5 text-[12px]"
                    :class="b === '按量计费' ? 'bg-[#f1f5ff] text-[#1863dc]' : 'bg-[#fff1ec] text-[#ff7759]'"
                  >{{ b }}</span>
                </div>
              </div>
              <div v-if="c.endpoints.length">
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">兼容接口</p>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="e in c.endpoints"
                    :key="e"
                    class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]"
                  >{{ e }}</span>
                </div>
              </div>
            </div>

            <!-- 可用模型 -->
            <div class="mt-4">
              <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">可用模型（{{ c.models.length }}）</p>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span
                  v-for="m in c.models"
                  :key="m"
                  class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]"
                >{{ m }}</span>
              </div>
            </div>

            <p v-if="c.desc" class="mt-4 flex-1 text-[14px] leading-[1.5] text-[#616161]">{{ c.desc }}</p>
          </div>
        </div>
        <p v-else class="text-[14px] text-[#93939f]">该厂商暂无可用渠道。</p>
      </template>
    </div>
  </section>
</template>
