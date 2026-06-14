// 新增工单回复
// POST /api/tickets/:id/replies
// body: { content }
// 工单本人或管理员均可回复

import { getTicket, addReply } from '../../../services/ticket'
import { getAuthUser } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = getAuthUser(event)
  if (!user) apiError('未登录或登录已过期', 401)

  const id = getRouterParam(event, 'id')
  const ticket = getTicket(id)
  if (!ticket) apiError('工单不存在', 404)

  const isStaff = Number(user.role) >= 10
  if (!isStaff && String(ticket.user_id) !== String(user.id)) {
    apiError('无权回复该工单', 403)
  }

  const body = await readBody(event)
  const content = (body?.content || '').trim()
  if (!content) apiError('回复内容不能为空')

  const res = addReply({
    ticketId: id,
    userId: user.id,
    username: user.username,
    isStaff,
    content
  })

  return apiSuccess(res, '回复成功')
})
