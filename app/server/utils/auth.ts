// 用户登录态与会话请求封装
// 采用 BFF 模式：Nuxt 服务端保管 NewApi 的 session，前端只持有不敏感的用户信息 cookie
//
// 三个 cookie：
//   newapi_session  —— httpOnly，转发给 NewApi 的会话（敏感，前端不可读）
//   newapi_user_id  —— httpOnly，登录用户 ID，用于 New-Api-User 头
//   auth_user       —— 可读，前端展示与路由守卫用（id/username/display_name/role）

import { getNewApiConfig } from '../config/newapi'

export const COOKIE_SESSION = 'newapi_session'
export const COOKIE_USER_ID = 'newapi_user_id'
export const COOKIE_AUTH_USER = 'auth_user'

const baseCookieOptions = {
  path: '/',
  sameSite: 'lax',
  secure: !import.meta.dev,
  maxAge: 60 * 60 * 24 * 7 // 7 天
}

// 写入登录态 cookie
export function setAuthCookies(event, { session, userId, user }) {
  setCookie(event, COOKIE_SESSION, session, { ...baseCookieOptions, httpOnly: true })
  setCookie(event, COOKIE_USER_ID, String(userId), { ...baseCookieOptions, httpOnly: true })
  // auth_user 给前端读取，不放敏感信息
  setCookie(event, COOKIE_AUTH_USER, encodeURIComponent(JSON.stringify(user)), {
    ...baseCookieOptions,
    httpOnly: false
  })
}

// 清除登录态 cookie
export function clearAuthCookies(event) {
  deleteCookie(event, COOKIE_SESSION, { path: '/' })
  deleteCookie(event, COOKIE_USER_ID, { path: '/' })
  deleteCookie(event, COOKIE_AUTH_USER, { path: '/' })
}

// 读取当前登录用户（未登录返回 null）
export function getAuthUser(event) {
  const raw = getCookie(event, COOKIE_AUTH_USER)
  if (!raw) return null
  try {
    return JSON.parse(decodeURIComponent(raw))
  } catch {
    return null
  }
}

// 要求登录：未登录直接抛 401
export function requireAuth(event) {
  const session = getCookie(event, COOKIE_SESSION)
  const userId = getCookie(event, COOKIE_USER_ID)
  if (!session || !userId) {
    apiError('未登录或登录已过期', 401)
  }
  return { session, userId }
}

// 要求 Root 用户（NewApi role：1 普通 / 10 管理员 / 100 超级管理员）
export function requireRoot(event) {
  const user = getAuthUser(event)
  if (!user || Number(user.role) < 100) {
    apiError('需要超级管理员权限', 403)
  }
  return user
}

// 要求客服/管理员（role >= 10，含管理员与超级管理员）
export function requireStaff(event) {
  const user = getAuthUser(event)
  if (!user || Number(user.role) < 10) {
    apiError('需要管理员权限', 403)
  }
  return user
}

// 带会话的用户请求封装（与管理用 newApiFetch 对应）
// 自动注入 NewApi session cookie + New-Api-User 头，并解包响应
// path: 接口路径；options: 透传 $fetch 配置（额外支持 options.raw：返回整个响应体而非 data）
export async function newApiUserFetch(event, path, options = {}) {
  const { baseUrl, sessionCookieName } = getNewApiConfig()
  const { session, userId } = requireAuth(event)
  const { raw, ...fetchOptions } = options

  let res
  try {
    res = await $fetch(path, {
      baseURL: baseUrl,
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        'New-Api-User': String(userId),
        Cookie: `${sessionCookieName}=${session}`,
        ...(fetchOptions.headers || {})
      }
    })
  } catch (err) {
    if (err?.response?.status === 401) {
      apiError('登录已过期，请重新登录', 401)
    }
    const message = err?.data?.message || err?.message || 'NewApi 请求失败'
    apiError(message, 502)
  }

  const ok = res?.success === true || res?.code === 0
  if (!ok) {
    apiError(res?.message || 'NewApi 返回失败', 400, res?.data ?? null)
  }

  // raw：返回整个响应体（适用于 data 之外还有其它顶层字段的接口，如 /api/pricing）
  return raw ? res : (res?.data ?? null)
}
