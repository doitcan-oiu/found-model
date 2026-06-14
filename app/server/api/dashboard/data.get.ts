// 仪表盘数据看板
// GET /api/dashboard/data?start_timestamp=&end_timestamp=&default_time=
// 取当前登录用户的用量统计（默认近 24 小时，按小时聚合）

import { getUserData } from '../../services/data'
import { getAuthUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = getAuthUser(event)
  if (!user) {
    apiError('未登录或登录已过期', 401)
  }

  const query = getQuery(event)
  const now = Math.floor(Date.now() / 1000)
  const startTimestamp = Number(query.start_timestamp) || (now - 60 * 60 * 24)
  const endTimestamp = Number(query.end_timestamp) || now
  const defaultTime = query.default_time || 'hour'

  const data = await getUserData({
    username: user.username,
    startTimestamp,
    endTimestamp,
    defaultTime
  })

  return apiSuccess(data ?? [])
})
