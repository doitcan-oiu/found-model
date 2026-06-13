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
    <section>
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">订阅套餐</h2>
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <!-- 入门版 -->
        <div class="flex flex-col rounded-lg border border-[#e5e7eb] bg-[#eeece7] p-8">
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">STARTER</p>
          <h3 class="mt-2 text-[24px] leading-[1.3] text-[#17171c]">入门版</h3>
          <div class="mt-4 flex items-end gap-1">
            <span class="text-[48px] leading-none tracking-[-0.48px] text-[#17171c]">¥39</span>
            <span class="pb-1 text-[14px] text-[#616161]">/ 月</span>
          </div>
          <div class="my-6 h-px w-full bg-[#d9d9dd]"></div>
          <ul class="flex-1 space-y-3 text-[16px] leading-[1.5] text-[#212121]">
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 每月 1,000,000 tokens 额度</li>
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 访问主流开放模型</li>
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 标准并发速率限制</li>
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 社区支持</li>
          </ul>
          <button class="mt-8 w-full rounded-[32px] border border-[#17171c] bg-transparent px-6 py-3 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#17171c] hover:text-white">
            选择入门版
          </button>
        </div>

        <!-- 专业版（推荐） -->
        <div class="flex flex-col rounded-lg border border-[#17171c] bg-[#003c33] p-8 text-white">
          <div class="flex items-center justify-between">
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#edfce9]">PRO</p>
            <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">最受欢迎</span>
          </div>
          <h3 class="mt-2 text-[24px] leading-[1.3] text-white">专业版</h3>
          <div class="mt-4 flex items-end gap-1">
            <span class="text-[48px] leading-none tracking-[-0.48px] text-white">¥129</span>
            <span class="pb-1 text-[14px] text-[#edfce9]">/ 月</span>
          </div>
          <div class="my-6 h-px w-full bg-white/20"></div>
          <ul class="flex-1 space-y-3 text-[16px] leading-[1.5] text-[#edfce9]">
            <li class="flex gap-2"><span class="text-white">✓</span> 每月 5,000,000 tokens 额度</li>
            <li class="flex gap-2"><span class="text-white">✓</span> 访问全部模型（含旗舰模型）</li>
            <li class="flex gap-2"><span class="text-white">✓</span> 更高并发与优先调度</li>
            <li class="flex gap-2"><span class="text-white">✓</span> 工单优先支持</li>
            <li class="flex gap-2"><span class="text-white">✓</span> 用量明细与导出</li>
          </ul>
          <button class="mt-8 w-full rounded-[32px] bg-white px-6 py-3 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">
            选择专业版
          </button>
        </div>

        <!-- 旗舰版 -->
        <div class="flex flex-col rounded-lg border border-[#e5e7eb] bg-[#eeece7] p-8">
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">FLAGSHIP</p>
          <h3 class="mt-2 text-[24px] leading-[1.3] text-[#17171c]">旗舰版</h3>
          <div class="mt-4 flex items-end gap-1">
            <span class="text-[48px] leading-none tracking-[-0.48px] text-[#17171c]">¥399</span>
            <span class="pb-1 text-[14px] text-[#616161]">/ 月</span>
          </div>
          <div class="my-6 h-px w-full bg-[#d9d9dd]"></div>
          <ul class="flex-1 space-y-3 text-[16px] leading-[1.5] text-[#212121]">
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 每月 20,000,000 tokens 额度</li>
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 全部模型 + 专属通道</li>
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 最高并发与独立速率</li>
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 专属技术支持</li>
            <li class="flex gap-2"><span class="text-[#003c33]">✓</span> 团队多密钥管理</li>
          </ul>
          <button class="mt-8 w-full rounded-[32px] border border-[#17171c] bg-transparent px-6 py-3 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#17171c] hover:text-white">
            选择旗舰版
          </button>
        </div>
      </div>
    </section>

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
            type="text"
            placeholder="请输入兑换码，例如 FM-XXXX-XXXX-XXXX"
            class="flex-1 rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
          />
          <button class="shrink-0 rounded-[32px] bg-[#17171c] px-6 py-3 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black">
            立即兑换
          </button>
        </div>
        <p class="mt-3 text-[12px] leading-[1.4] text-[#93939f]">
          兑换码区分大小写，每个兑换码仅可使用一次。
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
    <section>
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">我的订阅</h2>
      <div class="mt-8 rounded-lg border border-[#e5e7eb] bg-white p-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-3">
              <h3 class="text-[24px] leading-[1.3] text-[#17171c]">专业版</h3>
              <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">生效中</span>
            </div>
            <p class="mt-1 text-[14px] leading-[1.4] text-[#616161]">有效期至 2026-07-12 · 自动续费已开启</p>
          </div>
          <div class="flex gap-3">
            <button class="rounded-[30px] border border-[#d9d9dd] px-4 py-2 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">
              管理续费
            </button>
            <button class="rounded-[32px] bg-[#17171c] px-5 py-2 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black">
              升级套餐
            </button>
          </div>
        </div>

        <div class="my-6 h-px w-full bg-[#d9d9dd]"></div>

        <!-- 额度用量 -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">本月已用额度</p>
            <p class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">2,140,000</p>
            <p class="text-[14px] text-[#616161]">/ 5,000,000 tokens</p>
            <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#eeece7]">
              <div class="h-full w-[43%] rounded-full bg-[#003c33]"></div>
            </div>
          </div>
          <div>
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">剩余额度</p>
            <p class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">2,860,000</p>
            <p class="text-[14px] text-[#616161]">tokens 可用</p>
          </div>
          <div>
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">活跃密钥</p>
            <p class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">3</p>
            <p class="text-[14px] text-[#616161]">个 API Key</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
