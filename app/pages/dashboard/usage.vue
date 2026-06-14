<template>
  <div class="space-y-12">
    <!-- 页头 -->
    <section>
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">USAGE</p>
      <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">使用统计</h1>
      <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
        查看各模型的花费趋势与历史消费记录，掌握额度消耗节奏。
      </p>
    </section>

    <!-- 概览指标 -->
    <DashboardUsageOverview />

    <!-- 24 小时各模型花费趋势 -->
    <DashboardUsageTrend />

    <!-- 今日消费 -->
    <DashboardTodayConsumption />
  </div>
</template>
