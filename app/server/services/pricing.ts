// 模型定价 / 厂商分组业务封装
// 对接 NewApi 用户端定价接口

// 获取定价信息（厂商、模型、分组倍率等）
// NewApi 接口：GET /api/pricing（携带当前用户 session）
// raw：返回整个响应体（data 之外还有 vendors / group_ratio / usable_group 等顶层字段）
export async function getPricing(event) {
  return await newApiUserFetch(event, '/api/pricing', { method: 'GET', raw: true })
}
