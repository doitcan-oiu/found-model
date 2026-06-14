// 退出登录
// POST /api/auth/logout
// 通知 NewApi 注销会话并清除本地登录态 cookie

import { clearAuthCookies, getAuthUser, newApiUserFetch } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 尝试注销 NewApi 上游会话（失败不影响本地登出）
  if (getAuthUser(event)) {
    try {
      await newApiUserFetch(event, '/api/user/logout', { method: 'GET' })
    } catch {
      // 忽略上游错误，继续清本地 cookie
    }
  }
  clearAuthCookies(event)
  return apiSuccess(null, '已退出登录')
})
