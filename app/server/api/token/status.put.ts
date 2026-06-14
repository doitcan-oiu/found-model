// 更新令牌状态（启用 / 禁用）
// PUT /api/token/status
// body: { id, status }  status: 1 启用 / 2 禁用

import { updateTokenStatus } from '../../services/token'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, status } = body || {}

  if (!id || ![1, 2].includes(status)) {
    apiError('参数错误')
  }

  const data = await updateTokenStatus(event, { id, status })
  return apiSuccess(data, status === 1 ? '已启用' : '已禁用')
})
