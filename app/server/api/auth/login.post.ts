// 登录接口
// POST /api/auth/login
// 校验后调用 NewApi 登录，捕获 session 写入 httpOnly cookie

import { loginNewApi } from '../../services/auth'
import { setAuthCookies } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body || {}

  if (!username || !password) {
    apiError('账号和密码不能为空')
  }

  const { user, session } = await loginNewApi({ username, password })

  // 仅保留前端展示需要的字段
  const safeUser = {
    id: user.id,
    username: user.username,
    display_name: user.display_name,
    role: user.role,
    group: user.group,
    status: user.status
  }

  setAuthCookies(event, { session, userId: user.id, user: safeUser })

  return apiSuccess(safeUser, '登录成功')
})
