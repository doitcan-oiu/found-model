// 删除令牌
// DELETE /api/token/:id

import { deleteToken } from '../../services/token'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    apiError('缺少令牌 ID')
  }

  const data = await deleteToken(event, id)
  return apiSuccess(data, '已删除')
})
