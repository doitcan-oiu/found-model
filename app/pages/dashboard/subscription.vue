<script setup>
const message = useMessage()
const code = ref('')
const redeeming = ref(false)

async function redeem() {
  if (!code.value.trim()) {
    message.error('请输入兑换码')
    return
  }
  redeeming.value = true
  try {
    const res = await $fetch('/api/subscription/redeem', {
      method: 'POST',
      body: { code: code.value.trim() }
    })
    message.success('兑换成功', res.message)
    code.value = ''
    await refreshNuxtData('subscription-self')
  } catch (err) {
    message.error('兑换失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    redeeming.value = false
  }
}
</script>

<template>
  <div class="space-y-16">
    <!-- 页头 -->
    <section>
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">SUBSCRIPTION</p>
      <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">订阅管理</h1>
      <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
        选择适合你的套餐，按量获取大模型中转额度。所有套餐共享统一的接口与模型广场。
      </p>
    </section>

    <!-- 订阅套餐 -->
    <DashboardSubscriptionPlans />

    <!-- 生成兑换码（仅 Root 可见） -->
    <DashboardRedemptionCodeGenerator />

    <!-- 兑换订阅 + 使用说明 -->
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- 兑换订阅 -->
      <div class="rounded-lg border border-[#e5e7eb] bg-white p-8">
        <h2 class="text-[24px] leading-[1.3] text-[#17171c]">兑换订阅</h2>
        <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">
          输入兑换码以激活或叠加订阅额度。
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            v-model="code"
            type="text"
            placeholder="请输入兑换码，例如 FM-XXXX-XXXX-XXXX"
            class="flex-1 rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
            @keyup.enter="redeem"
          />
          <button
            class="shrink-0 rounded-[32px] bg-[#17171c] px-6 py-3 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="redeeming"
            @click="redeem"
          >
            {{ redeeming ? '兑换中…' : '立即兑换' }}
          </button>
        </div>
        <p class="mt-3 text-[12px] leading-[1.4] text-[#93939f]">
          兑换码区分大小写，每个兑换码仅可使用一次。订阅可以叠加
        </p>
      </div>

      <!-- 使用说明 -->
      <div class="rounded-lg border border-[#e5e7eb] bg-white p-8">
        <h2 class="text-[24px] leading-[1.3] text-[#17171c]">使用说明</h2>
        <ol class="mt-6 space-y-4 text-[16px] leading-[1.5] text-[#212121]">
          <li class="flex gap-3">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eeece7] text-[14px] text-[#17171c]">1</span>
            选择套餐或在「兑换订阅」中输入兑换码完成激活。
          </li>
          <li class="flex gap-3">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eeece7] text-[14px] text-[#17171c]">2</span>
            前往「接口密钥」创建 API Key，并妥善保管。
          </li>
          <li class="flex gap-3">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eeece7] text-[14px] text-[#17171c]">3</span>
            将密钥配置到你的应用，统一调用模型广场中的模型。
          </li>
          <li class="flex gap-3">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eeece7] text-[14px] text-[#17171c]">4</span>
            在「使用统计」中查看额度消耗与调用明细。
          </li>
        </ol>
      </div>
    </section>

    <!-- 我的订阅 -->
    <DashboardMySubscription />
  </div>
</template>
