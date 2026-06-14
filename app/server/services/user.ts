// 用户相关业务封装
// 对接 NewApi 的用户管理接口，向上层（接口路由）提供语义化方法

// 创建用户
// 入参：{ username, password, displayName, remark }
// NewApi 接口：POST /api/user
export async function createUser({ username, password, displayName, remark = '' }) {
  return await newApiFetch('/api/user', {
    method: 'POST',
    body: {
      username,
      password,
      display_name: displayName || username,
      remark
    }
  })
}

// 获取当前用户可用分组
// NewApi 接口：GET /api/user/self/groups（携带当前用户 session）
export async function getSelfGroups(event) {
  return await newApiUserFetch(event, '/api/user/self/groups', { method: 'GET' })
}

// 获取充值 / 购买信息（含 topup_link）
// NewApi 接口：GET /api/user/topup/info（携带当前用户 session）
export async function getTopupInfo(event) {
  return await newApiUserFetch(event, '/api/user/topup/info', { method: 'GET' })
}
