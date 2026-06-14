<template>
  <div class="space-y-12">
    <!-- 页头 -->
    <section>
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">DASHBOARD</p>
      <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">仪表盘</h1>
      <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
        欢迎回来，这里汇总了你的额度用量、订阅状态与接口信息。
      </p>
    </section>

    <!-- 简易数据看板 -->
    <DashboardDataBoard />

    <!-- 系统公告 + 简易订阅信息 -->
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- 系统公告 -->
      <DashboardAnnouncements />

      <!-- 简易订阅信息 -->
      <DashboardSubscriptionCard />
    </section>

    <!-- 节点信息 -->
    <DashboardNodeInfo />

    <!-- 常见问答 -->
    <section>
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">常见问答</h2>
      <div class="mt-6 divide-y divide-[#e5e7eb] rounded-lg border border-[#e5e7eb] bg-white">
        <details class="group px-8 py-5" open>
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            如何开始使用中转接口？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">
            选择并激活订阅套餐后，前往「接口密钥」创建一个 API Key，将基础地址与密钥配置到你的应用即可调用模型广场中的全部模型。
          </p>
        </details>
        <details class="group px-8 py-5">
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            额度是如何计费的？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">
            按实际消耗的 tokens 数量从套餐额度中扣减，不同模型单价不同，可在「使用统计」中查看明细。
          </p>
        </details>
        <details class="group px-8 py-5">
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            额度用完后会发生什么？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">
            额度耗尽后接口将暂停响应，你可以升级套餐或通过兑换码叠加额度，额度会在下个计费周期重置。
          </p>
        </details>
        <details class="group px-8 py-5">
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            支持哪些模型？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">
            我们持续接入主流大模型，完整列表与能力对比请前往「模型广场」查看。
          </p>
        </details>
      </div>
    </section>
  </div>
</template>
