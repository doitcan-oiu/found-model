// 创建令牌
// POST /api/token
// body: { name, expired_time, unlimited_quota, remain_quota, group, count, ... }

import { createToken } from '../../services/token'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { count = 1, ...rest } = body || {}

  if (!rest.name) {
    apiError('令牌名称不能为空')
  }

  // 组装 NewApi 所需字段，给默认值兜底
  const payload = {
    name: rest.name,
    expired_time: rest.expired_time ?? -1,
    unlimited_quota: rest.unlimited_quota ?? true,
    remain_quota: rest.remain_quota ?? 0,
    remain_amount: rest.remain_amount ?? 0,
    model_limits_enabled: rest.model_limits_enabled ?? false,
    model_limits: rest.model_limits ?? '',
    cross_group_retry: rest.cross_group_retry ?? false,
    group: rest.group ?? '',
    allow_ips: rest.allow_ips ?? ''
  }

  const data = await createToken(event, payload, Number(count) || 1)
  return apiSuccess(data, '创建成功')
})
