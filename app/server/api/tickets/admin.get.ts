// 全部工单列表（管理端，仅 Root）
// GET /api/tickets/admin?page=&page_size=&status=

import { listAllTickets } from '../../services/ticket'
import { requireStaff } from '../../utils/auth'

export default defineEventHandler((event) => {
  requireStaff(event)
  const q = getQuery(event)
  const data = listAllTickets({
    page: Number(q.page) || 1,
    pageSize: Number(q.page_size) || 10,
    status: q.status || ''
  })
  return apiSuccess(data)
})
