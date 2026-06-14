// 系统状态业务封装
// 对接 NewApi 用户端 /api/status（公告、节点信息等）

// 获取系统状态（需登录会话）
// NewApi 接口：GET /api/status（携带当前用户 session）
export async function getStatus(event) {
  return await newApiUserFetch(event, '/api/status', { method: 'GET' })
}
