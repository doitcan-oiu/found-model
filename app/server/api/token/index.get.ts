// 当前用户令牌列表
// GET /api/token?page=&size=
// 用当前登录会话向 NewApi 请求分页令牌

import { getSelfTokens } from '../../services/token'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const data = await getSelfTokens(event, {
    page: Number(q.page) || 1,
    size: Number(q.size) || 10
  })
  return apiSuccess(data ?? { items: [], total: 0, page: 1, page_size: 10 })
})
