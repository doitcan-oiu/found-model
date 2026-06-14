// 模型定价信息
// GET /api/pricing
// 返回 { models, vendors, groupRatio, usableGroup }

import { getPricing } from '../services/pricing'

export default defineEventHandler(async (event) => {
  const res = await getPricing(event)
  return apiSuccess({
    models: res?.data ?? [],
    vendors: res?.vendors ?? [],
    groupRatio: res?.group_ratio ?? {},
    usableGroup: res?.usable_group ?? {}
  })
})
