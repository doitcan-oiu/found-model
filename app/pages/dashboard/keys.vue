<template>
  <div class="space-y-12">
    <!-- 页头 -->
    <section>
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">API KEYS</p>
      <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">接口密钥</h1>
      <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
        管理用于调用中转接口的 API 密钥。密钥仅在创建时完整显示一次，请妥善保管。
      </p>
    </section>

    <!-- 令牌列表 -->
    <DashboardTokenList />
  </div>
</template>
