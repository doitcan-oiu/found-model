<script setup>
// 24 小时各模型花费趋势（ApexCharts）
// 额度换算：500000 quota = $1
const QUOTA_PER_UNIT = 500000

const now = new Date()
const startTs = Math.floor(now.getTime() / 1000) - 60 * 60 * 24
const nowTs = Math.floor(now.getTime() / 1000)

const { data: res, pending, error } = await useFetch('/api/data/self', {
  query: {
    start_timestamp: startTs,
    end_timestamp: nowTs,
    default_time: 'hour'
  },
  lazy: true,
  server: false
})

// 主题色板（循环使用）
const palette = ['#003c33', '#1863dc', '#ff7759', '#9b60aa', '#75758a', '#00a155']

function pad(n) {
  return String(n).padStart(2, '0')
}

// 生成近 24 小时、每小时一个桶（按整点对齐）
// 末尾推到“下一个整点”，让当前未结束的小时不顶在最右边
const buckets = computed(() => {
  const list = []
  const base = new Date()
  base.setMinutes(0, 0, 0)
  base.setHours(base.getHours() + 1) // 对齐到下一个整点
  for (let i = 23; i >= 0; i--) {
    const d = new Date(base.getTime() - i * 3600 * 1000)
    list.push(d.getTime())
  }
  return list
})

// X 轴分类标签（整点：HH:00，跨天首个点带日期）
const categories = computed(() => buckets.value.map((ms, idx) => {
  const d = new Date(ms)
  const prev = idx > 0 ? new Date(buckets.value[idx - 1]) : null
  // 0 点或当天首个刻度，显示日期
  if (d.getHours() === 0 || !prev || prev.getDate() !== d.getDate()) {
    return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:00`
  }
  return `${pad(d.getHours())}:00`
}))

// 按模型分组并落入对应小时桶
const series = computed(() => {
  const rows = res.value?.data ?? []
  const bk = buckets.value
  const byModel = {}
  for (const r of rows) {
    const name = r.model_name || '未知模型'
    if (!byModel[name]) byModel[name] = new Array(bk.length).fill(0)
    // 把记录时间对齐到所属整点小时，找到桶索引
    const hourMs = new Date((r.created_at || 0) * 1000).setMinutes(0, 0, 0)
    const idx = bk.indexOf(hourMs)
    if (idx >= 0) {
      byModel[name][idx] += (r.quota || 0) / QUOTA_PER_UNIT
    }
  }
  return Object.entries(byModel).map(([name, data]) => ({
    name,
    data: data.map((v) => Number(v.toFixed(6)))
  }))
})

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 340,
    fontFamily: 'inherit',
    stacked: true,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: true, speed: 400 }
  },
  colors: palette,
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      columnWidth: '60%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last'
    }
  },
  states: {
    hover: { filter: { type: 'lighten', value: 0.1 } }
  },
  grid: {
    borderColor: '#f2f2f2',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    padding: { left: 8, right: 8 }
  },
  xaxis: {
    categories: categories.value,
    tickAmount: 8,
    tickPlacement: 'on',
    labels: {
      rotate: 0,
      hideOverlappingLabels: true,
      style: { colors: '#93939f', fontSize: '12px' }
    },
    axisBorder: { color: '#d9d9dd' },
    axisTicks: { color: '#d9d9dd' }
  },
  yaxis: {
    labels: {
      style: { colors: '#93939f', fontSize: '12px' },
      formatter: (v) => '$' + (v || 0).toFixed(2)
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '13px',
    labels: { colors: '#616161' },
    markers: { width: 10, height: 10, radius: 12 },
    itemMargin: { horizontal: 8 }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: { formatter: (v) => '$' + (v || 0).toFixed(4) }
  }
}))
</script>

<template>
  <section>
    <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">24 小时花费趋势</h2>

    <div class="mt-6 rounded-lg border border-[#e5e7eb] bg-white p-6">
      <!-- 加载骨架 -->
      <div v-if="pending" class="h-[340px] w-full animate-pulse rounded bg-[#eeece7]"></div>

      <!-- 错误 -->
      <p v-else-if="error" class="py-24 text-center text-[14px] text-[#b30000]">趋势数据加载失败，请稍后重试。</p>

      <!-- 图表（无数据时也显示完整 24 小时坐标轴） -->
      <ClientOnly v-else>
        <apexchart type="bar" height="340" :options="chartOptions" :series="series" />
        <template #fallback>
          <div class="h-[340px] w-full animate-pulse rounded bg-[#eeece7]"></div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>
