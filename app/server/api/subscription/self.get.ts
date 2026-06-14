// 当前用户订阅情况
// GET /api/subscription/self
// 返回用户已购订阅（用当前登录会话向 NewApi 请求）

import { getSelfSubscription } from '../../services/subscription'

export default defineEventHandler(async (event) => {
  const data = await getSelfSubscription(event)
  return apiSuccess(data ?? { subscriptions: [], all_subscriptions: [] })
})
