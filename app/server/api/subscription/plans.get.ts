// 订阅套餐列表
// GET /api/subscription/plans
// 返回可购买的订阅套餐（用当前登录会话向 NewApi 请求）

import { getSubscriptionPlans } from '../../services/subscription'

export default defineEventHandler(async (event) => {
  const data = await getSubscriptionPlans(event)
  return apiSuccess(data ?? [])
})
