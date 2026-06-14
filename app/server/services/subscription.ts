// 订阅相关业务封装
// 对接 NewApi 用户端订阅接口

// 获取订阅套餐列表
// NewApi 接口：GET /api/subscription/plans（携带当前用户 session）
export async function getSubscriptionPlans(event) {
  return await newApiUserFetch(event, '/api/subscription/plans', { method: 'GET' })
}

// 获取当前用户的订阅情况
// NewApi 接口：GET /api/subscription/self（携带当前用户 session）
export async function getSelfSubscription(event) {
  return await newApiUserFetch(event, '/api/subscription/self', { method: 'GET' })
}

// 管理端：给指定用户添加订阅（需 Access Token）
// NewApi 接口：POST /api/subscription/admin/users/{userId}/subscriptions
export async function grantSubscription(userId, planId) {
  return await newApiFetch(`/api/subscription/admin/users/${userId}/subscriptions`, {
    method: 'POST',
    body: { plan_id: Number(planId) }
  })
}
