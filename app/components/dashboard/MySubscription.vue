<script setup>
const { subscriptions, hasSubscription, pending, error, formatDate } = useMySubscription()

const statusText = { active: '生效中', expired: '已过期', pending: '待生效', cancelled: '已取消' }
function statusLabel(s) {
  return statusText[s] || s
}
</script>

<template>
  <section>
    <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">我的订阅</h2>

    <!-- 加载骨架 -->
    <div v-if="pending" class="mt-8 rounded-lg border border-[#e5e7eb] bg-white p-8">
      <div class="h-6 w-32 animate-pulse rounded bg-[#eeece7]"></div>
      <div class="mt-4 h-4 w-64 animate-pulse rounded bg-[#eeece7]"></div>
      <div class="mt-6 h-2 w-full animate-pulse rounded-full bg-[#eeece7]"></div>
    </div>

    <!-- 错误 -->
    <p v-else-if="error" class="mt-8 text-[14px] leading-[1.4] text-[#b30000]">订阅信息加载失败，请稍后重试。</p>

    <!-- 无订阅 -->
    <div v-else-if="!hasSubscription" class="mt-8 rounded-lg border border-dashed border-[#d9d9dd] bg-white p-12 text-center">
      <p class="text-[18px] leading-[1.4] text-[#17171c]">你还没有订阅任何套餐</p>
      <p class="mt-2 text-[14px] leading-[1.5] text-[#616161]">在上方选择套餐，或使用兑换码激活订阅。</p>
    </div>

    <!-- 订阅列表（可多个叠加） -->
    <div v-else class="mt-8 space-y-6">
      <div
        v-for="sub in subscriptions"
        :key="sub.id"
        class="rounded-lg border border-[#e5e7eb] bg-white p-8"
      >
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-3">
              <h3 class="text-[24px] leading-[1.3] text-[#17171c]">{{ sub.planName }}</h3>
              <span
                class="rounded-full px-2.5 py-0.5 text-[12px]"
                :class="sub.status === 'active' ? 'bg-[#edfce9] text-[#003c33]' : 'bg-[#eeece7] text-[#75758a]'"
              >{{ statusLabel(sub.status) }}</span>
            </div>
            <p class="mt-1 text-[14px] leading-[1.4] text-[#616161]">
              {{ formatDate(sub.startTime) }} 至 {{ formatDate(sub.endTime) }}
            </p>
          </div>
          <button class="rounded-[32px] bg-[#17171c] px-5 py-2 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black">
            续费 / 升级
          </button>
        </div>

        <div class="my-6 h-px w-full bg-[#d9d9dd]"></div>

        <!-- 额度用量 -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div class="sm:col-span-1">
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">已用额度</p>
            <p class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">${{ sub.usedUsd.toLocaleString('zh-CN') }}</p>
            <p class="text-[14px] text-[#616161]">/ 总额度 ${{ sub.totalUsd.toLocaleString('zh-CN') }}</p>
            <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#eeece7]">
              <div class="h-full rounded-full bg-[#003c33]" :style="{ width: sub.percent + '%' }"></div>
            </div>
          </div>
          <div>
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">剩余额度</p>
            <p class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">${{ sub.remainingUsd.toLocaleString('zh-CN') }}</p>
            <p class="text-[14px] text-[#616161]">可用</p>
          </div>
          <div>
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">使用进度</p>
            <p class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">{{ sub.percent }}%</p>
            <p class="text-[14px] text-[#616161]">已消耗</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
