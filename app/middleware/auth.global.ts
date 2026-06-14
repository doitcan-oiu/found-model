// 全局路由守卫
// 未登录访问 /dashboard 下的页面时跳转到登录页
// 已登录访问登录/注册页时跳转到仪表盘

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  const needAuth = to.path.startsWith('/dashboard')
  const isAuthPage = to.path === '/auth/login' || to.path === '/auth/register'

  if (needAuth && !isLoggedIn.value) {
    return navigateTo('/auth/login')
  }

  if (isAuthPage && isLoggedIn.value) {
    return navigateTo('/dashboard')
  }
})
