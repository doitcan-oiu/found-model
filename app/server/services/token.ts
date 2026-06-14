// 令牌（API Key）相关业务封装
// 对接 NewApi 用户端令牌接口

// 获取当前用户的令牌列表（分页）
// NewApi 接口：GET /api/token/?p=&size=（携带当前用户 session）
export async function getSelfTokens(event, { page = 1, size = 10 } = {}) {
  return await newApiUserFetch(event, '/api/token/', {
    method: 'GET',
    query: { p: page, size }
  })
}

// 仅更新令牌状态（启用 1 / 禁用 2）
// NewApi 接口：PUT /api/token/?status_only=true
export async function updateTokenStatus(event, { id, status }) {
  return await newApiUserFetch(event, '/api/token/', {
    method: 'PUT',
    query: { status_only: true },
    body: { id, status }
  })
}

// 删除令牌
// NewApi 接口：DELETE /api/token/{id}/
export async function deleteToken(event, id) {
  return await newApiUserFetch(event, `/api/token/${id}/`, {
    method: 'DELETE'
  })
}

// 获取令牌完整密钥（用于复制）
// NewApi 接口：POST /api/token/{id}/key
export async function getTokenKey(event, id) {
  return await newApiUserFetch(event, `/api/token/${id}/key`, {
    method: 'POST'
  })
}

// 创建令牌（支持批量 count）
// NewApi 接口：POST /api/token/?count=N
export async function createToken(event, payload, count = 1) {
  return await newApiUserFetch(event, '/api/token/', {
    method: 'POST',
    query: { count },
    body: payload
  })
}

