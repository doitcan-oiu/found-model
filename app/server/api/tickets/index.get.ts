// 工单列表
// GET /api/tickets?page=&page_size=

import { listTickets } from '../../services/ticket'
import { getAuthUser } from '../../utils/auth'

export default defineEventHandler((event) => {
  const user = getAuthUser(event)
  if (!user) {
    apiError('未登录或登录已过期', 401)
  }

  const q = getQuery(event)
  const data = listTickets(user.id, {
    page: Number(q.page) || 1,
    pageSize: Number(q.page_size) || 10
  })
  return apiSuccess(data)
})
