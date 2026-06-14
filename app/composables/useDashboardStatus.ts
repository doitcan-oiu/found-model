// 仪表盘系统状态（公告 / 节点信息）
// 共享同一个 useFetch（key 去重），仅客户端请求，避免慢接口阻塞 SSR
// 公告与节点信息组件都用它，只会发一次请求

export function useDashboardStatus() {
  const { data: res, pending, error, refresh } = useFetch('/api/dashboard/status', {
    key: 'dashboard-status',
    lazy: true,
    server: false
  })

  const status = computed(() => res.value?.data ?? {})
  const announcements = computed(() => status.value.announcements ?? [])
  const apiInfo = computed(() => status.value.api_info ?? [])

  return { status, announcements, apiInfo, pending, error, refresh }
}
