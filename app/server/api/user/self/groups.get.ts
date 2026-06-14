// 当前用户可用分组
// GET /api/user/self/groups
// 返回 { 分组名: { desc, ratio } }

import { getSelfGroups } from '../../../services/user'

export default defineEventHandler(async (event) => {
  const data = await getSelfGroups(event)
  return apiSuccess(data ?? {})
})
