// 认证相关业务封装
// 直接对接 NewApi 登录接口，并从响应中提取 session

import { getNewApiConfig } from '../config/newapi'

// 从 set-cookie 头中解析出指定 cookie 的值
function parseSetCookie(setCookieHeaders, name) {
  if (!setCookieHeaders) return ''
  const list = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders]
  for (const item of list) {
    const match = item.match(new RegExp(`${name}=([^;]+)`))
    if (match) return match[1]
  }
  return ''
}

// 用户登录
// 入参：{ username, password }
// 返回：{ user, session }
export async function loginNewApi({ username, password }) {
  const { baseUrl, sessionCookieName } = getNewApiConfig()

  let res
  try {
    // 用 raw 拿响应头，提取 NewApi 下发的 session cookie
    res = await $fetch.raw('/api/user/login', {
      baseURL: baseUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { username, password }
    })
  } catch (err) {
    const message = err?.data?.message || err?.message || '登录请求失败'
    apiError(message, 502)
  }

  const body = res._data
  if (!(body?.success === true || body?.code === 0)) {
    apiError(body?.message || '账号或密码错误', 401)
  }

  // headers.getSetCookie() 返回数组（H3/undici 支持）
  const setCookie = typeof res.headers.getSetCookie === 'function'
    ? res.headers.getSetCookie()
    : res.headers.get('set-cookie')
  const session = parseSetCookie(setCookie, sessionCookieName)

  if (!session) {
    apiError('登录成功但未获取到会话，请稍后重试', 502)
  }

  return { user: body.data, session }
}
