// 获取当前登录用户
// GET /api/auth/me
// 未登录返回 data: null

import { getAuthUser } from '../../utils/auth'

export default defineEventHandler((event) => {
  const user = getAuthUser(event)
  return apiSuccess(user)
})
