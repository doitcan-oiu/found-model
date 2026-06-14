// 兑换订阅
// POST /api/subscription/redeem
// body: { code }
// 校验本地兑换码 -> 调 NewApi 管理端给当前用户发放订阅 -> 标记已使用
// 防撞库：连续失败 10 次锁定该用户的兑换功能

import { findUnusedCode, markCodeUsed, isRedeemBlocked, recordFail, resetFails, MAX_FAILS } from '../../services/redemption'
import { grantSubscription } from '../../services/subscription'
import { getAuthUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = getAuthUser(event)
  if (!user) apiError('未登录或登录已过期', 401)

  // 已锁定直接拒绝
  if (isRedeemBlocked(user.id)) {
    apiError('因连续兑换失败次数过多，兑换功能已被锁定，请联系客服处理', 403)
  }

  const body = await readBody(event)
  const code = (body?.code || '').trim()
  if (!code) apiError('请输入兑换码')

  const record = findUnusedCode(code)
  if (!record) {
    const { blocked, fails } = recordFail(user.id)
    if (blocked) {
      apiError('因连续兑换失败次数过多，兑换功能已被锁定，请联系客服处理', 403)
    }
    apiError(`兑换码无效或已被使用（已失败 ${fails}/${MAX_FAILS} 次，达到上限将锁定兑换）`)
  }

  // 调管理端给当前用户发放订阅
  await grantSubscription(user.id, record.plan_id)

  // 标记已使用（带 unused 条件，防并发重复兑换）
  const res = markCodeUsed(code, user.id)
  if (!res.changes) apiError('兑换码已被使用')

  // 成功，重置失败计数
  resetFails(user.id)

  return apiSuccess({ planName: record.plan_name }, `兑换成功，已开通「${record.plan_name || '订阅'}」`)
})
