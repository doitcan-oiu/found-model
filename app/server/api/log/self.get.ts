// 当前用户消费记录（今日）
// GET /api/log/self?page=&page_size=&start_timestamp=&end_timestamp=
// 用当前登录会话向 NewApi 请求分页日志

import { getSelfLogs } from '../../services/log'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)

  const data = await getSelfLogs(event, {
    page: Number(q.page) || 1,
    pageSize: Number(q.page_size) || 10,
    startTimestamp: Number(q.start_timestamp) || 0,
    endTimestamp: Number(q.end_timestamp) || 0,
    modelName: q.model_name || '',
    tokenName: q.token_name || ''
  })

  return apiSuccess(data ?? { items: [], total: 0, page: 1, page_size: 10 })
})
