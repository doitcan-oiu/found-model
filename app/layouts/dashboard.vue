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
        </nav>

        <!-- 右侧操作区 -->
        <div class="flex shrink-0 items-center gap-3">
          <a
            href="#"
            class="hidden rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7] sm:inline-flex"
          >API 文档</a>
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#003c33] text-[13px] font-medium text-white">U</span>
        </div>
      </div>
    </header>

    <!-- 中间内容区域 -->
    <main class="mx-auto max-w-7xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>
