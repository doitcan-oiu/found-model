<template>
  <div class="space-y-12">
    <!-- 页头 -->
    <section>
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">MODELS</p>
      <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">模型广场</h1>
      <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
        选择厂商与渠道，查看各渠道可用模型、折算倍率与大概可用余额。下方显示的是当前用户使用的倍率，购买订阅之后，会显示折扣之后的倍率
      </p>
    </section>

    <!-- 各渠道可用额度 -->
    <DashboardChannelPricing />

    <!-- 使用教程 -->
    <DashboardUsageTutorial />
  </div>
</template>
