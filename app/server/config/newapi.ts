// NewApi 配置读取
// 统一从 runtimeConfig.newapi 取值，便于通过环境变量覆盖：
//   NUXT_NEWAPI_BASE_URL / NUXT_NEWAPI_ACCESS_TOKEN / NUXT_NEWAPI_USER_ID

export function getNewApiConfig() {
  const { newapi } = useRuntimeConfig()

  return {
    // 接口基础地址
    baseUrl: newapi.baseUrl,
    // Access Token（管理接口鉴权用）
    accessToken: newapi.accessToken,
    // 操作者用户 ID（New-Api-User 头）
    userId: newapi.userId,
    // NewApi 登录态 cookie 名
    sessionCookieName: newapi.sessionCookieName
  }
}
