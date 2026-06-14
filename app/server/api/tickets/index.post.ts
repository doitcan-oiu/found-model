// 创建工单
// POST /api/tickets
// body: { type, title, content, subscriptionId, subscriptionName, alipayAccount, alipayName }

import { createTicket } from '../../services/ticket'
import { getAuthUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = getAuthUser(event)
  if (!user) {
    apiError('未登录或登录已过期', 401)
  }

  const body = await readBody(event)
  const { type, title, content } = body || {}

  if (!['refund', 'usage'].includes(type)) {
    apiError('工单类型有误')
  }
  if (!title || !title.trim()) {
    apiError('请填写工单标题')
  }

  // 退款类型校验：必须选订阅 + 填支付宝账号与姓名
  if (type === 'refund') {
    if (!body.subscriptionId) apiError('请选择要退款的订阅')
    if (!body.alipayAccount || !body.alipayName) apiError('请填写支付宝账号与姓名')
  }

  const res = createTicket({
    userId: user.id,
    username: user.username,
    type,
    title: title.trim(),
    content,
    subscriptionId: body.subscriptionId,
    subscriptionName: body.subscriptionName,
    alipayAccount: body.alipayAccount,
    alipayName: body.alipayName
  })

  return apiSuccess(res, '工单已提交')
})
