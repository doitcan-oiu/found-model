// 充值 / 购买订阅信息
// GET /api/user/topup-info
// 返回 topup_link 等（用当前登录会话向 NewApi 请求）

import { getTopupInfo } from '../../services/user'

export default defineEventHandler(async (event) => {
  const data = await getTopupInfo(event)
  return apiSuccess(data ?? {})
})
