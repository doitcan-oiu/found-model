// 系统状态接口
// GET /api/dashboard/status
// 返回公告、节点信息等（用当前登录会话向 NewApi 请求）

import { getStatus } from '../../services/status'

export default defineEventHandler(async (event) => {
  const data = await getStatus(event)
  return apiSuccess(data ?? {})
})
