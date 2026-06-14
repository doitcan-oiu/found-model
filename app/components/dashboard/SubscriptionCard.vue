<script setup>
const { primary, summary, hasSubscription, pending, formatDate } = useMySubscription()
</script>

<template>
  <div class="flex flex-col rounded-lg border border-[#17171c] bg-[#003c33] p-8 text-white">
    <!-- 加载骨架 -->
    <template v-if="pending">
      <div class="h-4 w-24 animate-pulse rounded bg-white/20"></div>
      <div class="mt-3 h-8 w-32 animate-pulse rounded bg-white/20"></div>
      <div class="mt-6 h-2 w-full animate-pulse rounded-full bg-white/20"></div>
    </template>

    <!-- 无订阅 -->
    <template v-else-if="!hasSubscription">
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#edfce9]">CURRENT PLAN</p>
      <h3 class="mt-2 text-[24px] leading-[1.3] text-white">暂无订阅</h3>
      <p class="mt-1 flex-1 text-[14px] text-[#edfce9]">订阅套餐后即可开始调用模型。</p>
      <NuxtLink to="/dashboard/subscription" class="mt-8 inline-flex w-full items-center justify-center rounded-[32px] bg-white px-6 py-3 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">
        去订阅
      </NuxtLink>
    </template>

    <!-- 有订阅 -->
    <template v-else>
      <div class="flex items-center justify-between">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#edfce9]">CURRENT PLAN</p>
        <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">生效中</span>
      </div>
      <h3 class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-white">{{ primary.planName }}</h3>
      <p class="mt-1 text-[14px] text-[#edfce9]">
        有效期至 {{ formatDate(primary.endTime) }}
        <span v-if="summary.count > 1"> · 共 {{ summary.count }} 个订阅</span>
      </p>

      <div class="my-6 h-px w-full bg-white/20"></div>

      <p class="text-[14px] text-[#edfce9]">额度用量（合计）</p>
      <p class="mt-1 text-[24px] leading-[1.3] text-white">
        ${{ summary.usedUsd.toLocaleString('zh-CN') }}
        <span class="text-[14px] text-[#edfce9]">/ ${{ summary.totalUsd.toLocaleString('zh-CN') }}</span>
      </p>
      <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
        <div class="h-full rounded-full bg-[#edfce9]" :style="{ width: summary.percent + '%' }"></div>
      </div>

      <NuxtLink to="/dashboard/subscription" class="mt-8 inline-flex w-full items-center justify-center rounded-[32px] bg-white px-6 py-3 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">
        管理订阅
      </NuxtLink>
    </template>
  </div>
</template>
