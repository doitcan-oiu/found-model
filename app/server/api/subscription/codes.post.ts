// 生成订阅兑换码（仅 Root）
// POST /api/subscription/codes
// body: { planId, planName, count }

import { generateCodes } from '../../services/redemption'
import { requireRoot } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  requireRoot(event)
  const body = await readBody(event)
  const planId = body?.planId
  const count = Math.min(Number(body?.count) || 0, 1000)

  if (!planId) apiError('请选择订阅套餐')
  if (count < 1) apiError('数量至少为 1')

  const codes = generateCodes({ planId, planName: body?.planName, count })
  return apiSuccess({ codes }, `已生成 ${codes.length} 个兑换码`)
})
