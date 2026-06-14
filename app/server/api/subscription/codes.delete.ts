// 一键删除所有兑换码（仅 Root）
// DELETE /api/subscription/codes

import { clearAllCodes } from '../../services/redemption'
import { requireRoot } from '../../utils/auth'

export default defineEventHandler((event) => {
  requireRoot(event)
  const res = clearAllCodes()
  return apiSuccess(res, `已删除 ${res.deleted} 个兑换码`)
})
