// 更新工单状态（管理端，仅 Root）
// PUT /api/tickets/:id/status
// body: { status }

import { updateTicketStatus } from '../../../services/ticket'
import { requireStaff } from '../../../utils/auth'

const VALID = ['pending', 'reviewing', 'processing', 'done', 'rejected']

export default defineEventHandler(async (event) => {
  requireStaff(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { status } = body || {}

  if (!id) apiError('缺少工单 ID')
  if (!VALID.includes(status)) apiError('状态值有误')

  const res = updateTicketStatus(id, status)
  if (!res.changes) apiError('工单不存在', 404)
  return apiSuccess(null, '状态已更新')
})
