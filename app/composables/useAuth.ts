// 前端登录态管理
// 读取可读的 auth_user cookie，提供登录 / 退出 / 当前用户
// 用法：const { user, isLoggedIn, login, logout } = useAuth()

export function useAuth() {
  // auth_user 由服务端登录时写入（非 httpOnly），前后端共享同一份
  const userCookie = useCookie('auth_user', {
    default: () => null,
    // cookie 中是 JSON 字符串，自动解析
    decode: (v) => {
      try {
        return JSON.parse(decodeURIComponent(v))
      } catch {
        return null
      }
    }
  })

  const user = computed(() => userCookie.value)
  const isLoggedIn = computed(() => !!userCookie.value)

  // 登录：成功后 cookie 由服务端下发，这里同步刷新本地引用
  async function login({ username, password }) {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username, password }
    })
    userCookie.value = res.data
    return res.data
  }

  // 退出：清服务端 cookie + 本地状态
  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    userCookie.value = null
    await navigateTo('/auth/login')
  }

  return { user, isLoggedIn, login, logout }
}
