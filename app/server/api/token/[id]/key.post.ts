// 获取令牌完整密钥
// POST /api/token/:id/key
// 返回 { key }，供前端复制

import { getTokenKey } from '../../../services/token'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    apiError('缺少令牌 ID')
  }

  const data = await getTokenKey(event, id)
  return apiSuccess(data)
})
