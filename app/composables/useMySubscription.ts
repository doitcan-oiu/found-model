// 当前用户订阅信息（我的订阅 / 仪表盘订阅卡共用）
// 同时取 /api/subscription/self 与套餐列表，套餐列表用与 SubscriptionPlans 相同的 key 去重
// self 接口只返回 plan_id，本地用套餐列表映射出套餐名称，避免额外请求

export function useMySubscription() {
  // 额度换算：500000 quota = $1
  const QUOTA_PER_UNIT = 500000

  // 我的订阅
  const { data: selfRes, pending: selfPending, error: selfError, refresh } = useFetch('/api/subscription/self', {
    key: 'subscription-self',
    lazy: true,
    server: false
  })

  // 套餐列表（与 SubscriptionPlans 组件同 key，自动复用同一次请求）
  const { data: plansRes, pending: plansPending } = useFetch('/api/subscription/plans', {
    key: 'subscription-plans',
    lazy: true,
    server: false
  })

  const pending = computed(() => selfPending.value || plansPending.value)
  const error = computed(() => selfError.value)

  // plan_id -> 套餐名称
  const planMap = computed(() => {
    const map = {}
    for (const item of plansRes.value?.data ?? []) {
      const p = item.plan || item
      const [name] = (p.title || '').split('#')
      map[p.id] = name || p.title
    }
    return map
  })

  // 美元格式化
  function toUsd(quota) {
    return Math.round((quota || 0) / QUOTA_PER_UNIT)
  }

  // 我的订阅列表（合并套餐名）
  const subscriptions = computed(() => {
    const list = selfRes.value?.data?.subscriptions ?? []
    return list.map((item) => {
      const s = item.subscription || item
      const total = s.amount_total || 0
      const used = s.amount_used || 0
      return {
        id: s.id,
        planId: s.plan_id,
        planName: planMap.value[s.plan_id] || `套餐 #${s.plan_id}`,
        status: s.status,
        startTime: s.start_time,
        endTime: s.end_time,
        total,
        used,
        remaining: Math.max(0, total - used),
        totalUsd: toUsd(total),
        usedUsd: toUsd(used),
        remainingUsd: toUsd(Math.max(0, total - used)),
        percent: total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0
      }
    })
  })

  const hasSubscription = computed(() => subscriptions.value.length > 0)

  // 汇总（多个订阅叠加）
  const summary = computed(() => {
    let total = 0
    let used = 0
    for (const s of subscriptions.value) {
      total += s.total
      used += s.used
    }
    const remaining = Math.max(0, total - used)
    return {
      count: subscriptions.value.length,
      total,
      used,
      remaining,
      totalUsd: toUsd(total),
      usedUsd: toUsd(used),
      remainingUsd: toUsd(remaining),
      percent: total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0
    }
  })

  // 主订阅（取额度最大的一个，用于仪表盘卡片概览）
  const primary = computed(() => {
    if (!subscriptions.value.length) return null
    return [...subscriptions.value].sort((a, b) => b.total - a.total)[0]
  })

  // 格式化时间戳（秒）-> YYYY-MM-DD
  function formatDate(ts) {
    if (!ts) return ''
    const d = new Date(ts * 1000)
    if (Number.isNaN(d.getTime())) return ''
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  return { subscriptions, summary, primary, hasSubscription, pending, error, refresh, formatDate }
}
