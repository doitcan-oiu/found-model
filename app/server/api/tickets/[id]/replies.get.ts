// 工单回复列表
// GET /api/tickets/:id/replies
// 工单本人或管理员可见

import { getTicket, listReplies } from '../../../services/ticket'
import { getAuthUser } from '../../../utils/auth'

export default defineEventHandler((event) => {
  const user = getAuthUser(event)
  if (!user) apiError('未登录或登录已过期', 401)

  const id = getRouterParam(event, 'id')
  const ticket = getTicket(id)
  if (!ticket) apiError('工单不存在', 404)

  const isStaff = Number(user.role) >= 10
  if (!isStaff && String(ticket.user_id) !== String(user.id)) {
    apiError('无权查看该工单', 403)
  }

  return apiSuccess({
    ticket,
    replies: listReplies(id)
  })
})
