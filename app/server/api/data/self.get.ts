// 当前用户用量趋势数据
// GET /api/data/self?start_timestamp=&end_timestamp=&default_time=
// 用当前登录会话向 NewApi 请求

import { getSelfData } from '../../services/data'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const now = Math.floor(Date.now() / 1000)

  const data = await getSelfData(event, {
    startTimestamp: Number(q.start_timestamp) || (now - 60 * 60 * 24),
    endTimestamp: Number(q.end_timestamp) || now,
    defaultTime: q.default_time || 'hour'
  })

  return apiSuccess(data ?? [])
})
