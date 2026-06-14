// NewApi 请求封装
// 统一处理：基础地址拼接、Access Token 鉴权头、响应解包与错误抛出
// 业务层通过 newApiFetch(path, options) 调用，无需关心鉴权细节

import { getNewApiConfig } from '../config/newapi'

// 组装鉴权请求头
function buildAuthHeaders() {
  const { accessToken, userId } = getNewApiConfig()

  return {
    Authorization: `Bearer ${accessToken}`,
    'New-Api-User': String(userId)
  }
}

// 核心请求方法
// path: 以 / 开头的接口路径，例如 /api/user
// options: 透传给 $fetch 的配置（method、body、query、headers 等）
export async function newApiFetch(path, options = {}) {
  const { baseUrl } = getNewApiConfig()

  let res
  try {
    res = await $fetch(path, {
      baseURL: baseUrl,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...buildAuthHeaders(),
        ...(options.headers || {})
      }
    })
  } catch (err) {
    // 网络层 / HTTP 状态码错误
    const message = err?.data?.message || err?.message || 'NewApi 请求失败'
    apiError(message, 502)
  }

  // NewApi 响应解包：管理接口为 { success, message, data }，
  // 部分接口为 { code, message, data }（code === 0 表示成功），两者都兼容
  const ok = res?.success === true || res?.code === 0
  if (!ok) {
    apiError(res?.message || 'NewApi 返回失败', 400, res?.data ?? null)
  }

  return res?.data ?? null
}
