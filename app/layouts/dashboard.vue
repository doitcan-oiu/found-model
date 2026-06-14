<script setup>
const { user, logout } = useAuth()
const message = useMessage()

const avatarText = computed(() => {
  const name = user.value?.display_name || user.value?.username || 'U'
  return name.charAt(0).toUpperCase()
})

// 购买订阅：取 topup_link 后新窗口打开
const buying = ref(false)
async function buySubscription() {
  buying.value = true
  try {
    const res = await $fetch('/api/user/topup-info')
    const link = res?.data?.topup_link
    if (link) {
      window.open(link, '_blank', 'noopener')
    } else {
      message.error('暂不可用', '未获取到购买地址')
    }
  } catch (err) {
    message.error('获取失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    buying.value = false
  }
}

const userMenu = computed(() => [
  [{ slot: 'account', type: 'label' }],
  [
    { label: '个人中心', icon: 'i-lucide-user', to: '/dashboard' },
    { label: '接口密钥', icon: 'i-lucide-key', to: '/dashboard/keys' }
  ],
  [{ label: '退出登录', icon: 'i-lucide-log-out', color: 'error', onSelect: () => logout() }]
])
</script>

<template>
  <div class="min-h-screen bg-white text-[#212121] antialiased">
    <!-- 顶部栏 -->
    <header class="sticky top-0 z-50 border-b border-[#d9d9dd] bg-white/90 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <!-- 品牌 -->
        <NuxtLink to="/dashboard" class="flex shrink-0 items-center gap-2.5">
          <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17171c] text-[13px] font-medium text-white">F</span>
          <span class="text-[15px] font-medium tracking-[0.28px] text-[#17171c]">FoundModel</span>
        </NuxtLink>

        <!-- 主导航 -->
        <nav class="flex flex-1 items-center gap-1 overflow-x-auto">
          <NuxtLink
            to="/dashboard"
            active-class="bg-[#eeece7] text-[#17171c]"
            class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] leading-[1.71] text-[#616161] transition-colors hover:text-[#17171c]"
          >仪表盘</NuxtLink>
          <NuxtLink
            to="/dashboard/subscription"
            active-class="bg-[#eeece7] text-[#17171c]"
            class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] leading-[1.71] text-[#616161] transition-colors hover:text-[#17171c]"
          >订阅管理</NuxtLink>
          <NuxtLink
            to="/dashboard/usage"
            active-class="bg-[#eeece7] text-[#17171c]"
            class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] leading-[1.71] text-[#616161] transition-colors hover:text-[#17171c]"
          >使用统计</NuxtLink>
          <NuxtLink
            to="/dashboard/keys"
            active-class="bg-[#eeece7] text-[#17171c]"
            class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] leading-[1.71] text-[#616161] transition-colors hover:text-[#17171c]"
          >接口密钥</NuxtLink>
          <NuxtLink
            to="/dashboard/models"
            active-class="bg-[#eeece7] text-[#17171c]"
            class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] leading-[1.71] text-[#616161] transition-colors hover:text-[#17171c]"
          >模型广场</NuxtLink>
          <NuxtLink
            to="/dashboard/tickets"
            active-class="bg-[#eeece7] text-[#17171c]"
            class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] leading-[1.71] text-[#616161] transition-colors hover:text-[#17171c]"
          >工单服务</NuxtLink>
        </nav>

        <!-- 右侧操作区 -->
        <div class="flex shrink-0 items-center gap-3">
          <button
            class="inline-flex items-center gap-1.5 rounded-[32px] bg-[#17171c] px-4 py-1.5 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="buying"
            @click="buySubscription"
          >
            {{ buying ? '跳转中…' : '购买订阅' }}
          </button>
          <a
            href="#"
            class="hidden rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7] sm:inline-flex"
          >API 文档</a>
          <UDropdownMenu :items="userMenu" :content="{ align: 'end' }" :ui="{ content: 'w-48' }">
            <button class="flex h-8 w-8 items-center justify-center rounded-full bg-[#003c33] text-[13px] font-medium text-white transition-opacity hover:opacity-90">
              {{ avatarText }}
            </button>
            <template #account>
              <div class="text-left">
                <p class="text-[13px] font-medium text-[#17171c]">{{ user?.display_name || user?.username || '未登录' }}</p>
                <p class="text-[12px] text-[#93939f]">{{ user?.username }}</p>
              </div>
            </template>
          </UDropdownMenu>
        </div>
      </div>
    </header>

    <!-- 中间内容区域 -->
    <main class="mx-auto max-w-7xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>
