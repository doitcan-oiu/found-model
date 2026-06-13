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
    <section>
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">数据看板</h2>
      <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">本月调用</p>
          <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">12,480</p>
          <p class="mt-1 text-[14px] text-[#003c33]">较上月 +18%</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">消耗 Tokens</p>
          <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">2.14M</p>
          <p class="mt-1 text-[14px] text-[#616161]">剩余 2.86M</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">活跃密钥</p>
          <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">3</p>
          <p class="mt-1 text-[14px] text-[#616161]">共 5 个上限</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">本月花费</p>
          <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">¥129</p>
          <p class="mt-1 text-[14px] text-[#616161]">专业版套餐</p>
        </div>
      </div>
    </section>

    <!-- 系统公告 + 简易订阅信息 -->
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- 系统公告 -->
      <div class="rounded-lg border border-[#e5e7eb] bg-white p-8 lg:col-span-2">
        <div class="flex items-center justify-between">
          <h2 class="text-[24px] leading-[1.3] text-[#17171c]">系统公告</h2>
          <a href="#" class="text-[14px] text-[#1863dc] underline-offset-2 hover:underline">查看全部</a>
        </div>
        <ul class="mt-6 divide-y divide-[#e5e7eb]">
          <li class="flex items-start gap-4 py-4">
            <span class="mt-0.5 rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">更新</span>
            <div class="flex-1">
              <p class="text-[16px] leading-[1.5] text-[#17171c]">新增旗舰模型接入，支持更长上下文窗口</p>
              <p class="mt-1 text-[14px] text-[#93939f]">2026-06-10</p>
            </div>
          </li>
          <li class="flex items-start gap-4 py-4">
            <span class="mt-0.5 rounded-full bg-[#f1f5ff] px-2.5 py-0.5 text-[12px] text-[#1863dc]">维护</span>
            <div class="flex-1">
              <p class="text-[16px] leading-[1.5] text-[#17171c]">6 月 15 日凌晨进行网关升级，预计影响 10 分钟</p>
              <p class="mt-1 text-[14px] text-[#93939f]">2026-06-08</p>
            </div>
          </li>
          <li class="flex items-start gap-4 py-4">
            <span class="mt-0.5 rounded-full bg-[#eeece7] px-2.5 py-0.5 text-[12px] text-[#75758a]">公告</span>
            <div class="flex-1">
              <p class="text-[16px] leading-[1.5] text-[#17171c]">计费规则优化，部分模型单价下调</p>
              <p class="mt-1 text-[14px] text-[#93939f]">2026-06-01</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 简易订阅信息 -->
      <div class="flex flex-col rounded-lg border border-[#17171c] bg-[#003c33] p-8 text-white">
        <div class="flex items-center justify-between">
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#edfce9]">CURRENT PLAN</p>
          <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">生效中</span>
        </div>
        <h3 class="mt-2 text-[32px] leading-[1.2] tracking-[-0.32px] text-white">专业版</h3>
        <p class="mt-1 text-[14px] text-[#edfce9]">有效期至 2026-07-12</p>

        <div class="my-6 h-px w-full bg-white/20"></div>

        <p class="text-[14px] text-[#edfce9]">本月额度用量</p>
        <p class="mt-1 text-[24px] leading-[1.3] text-white">2.14M <span class="text-[14px] text-[#edfce9]">/ 5M tokens</span></p>
        <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div class="h-full w-[43%] rounded-full bg-[#edfce9]"></div>
        </div>

        <a href="#" class="mt-8 inline-flex w-full items-center justify-center rounded-[32px] bg-white px-6 py-3 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">
          升级套餐
        </a>
      </div>
    </section>

    <!-- 节点信息 -->
    <section>
      <div class="flex items-center justify-between">
        <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">节点信息</h2>
        <span class="text-[14px] text-[#616161]">就近选择延迟更低的接入节点</span>
      </div>

      <div class="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
        <!-- 表头 -->
        <div class="hidden grid-cols-[1.2fr_2fr_0.8fr_0.8fr] gap-4 border-b border-[#d9d9dd] px-6 py-4 md:grid">
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">节点</span>
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">接入地址</span>
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">状态</span>
          <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">操作</span>
        </div>

        <!-- 香港 -->
        <div class="grid grid-cols-1 gap-2 border-b border-[#e5e7eb] px-6 py-5 md:grid-cols-[1.2fr_2fr_0.8fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2.5">
            <span class="text-[20px] leading-none">🇭🇰</span>
            <div>
              <p class="text-[16px] leading-[1.5] text-[#17171c]">香港</p>
              <p class="text-[12px] text-[#93939f]">Hong Kong</p>
            </div>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">https://hk.api.foundmodel.com</code>
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-[#003c33]"></span>
            <span class="text-[14px] text-[#616161]">正常 · 28ms</span>
          </div>
          <div class="md:text-right">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
          </div>
        </div>

        <!-- 美国 -->
        <div class="grid grid-cols-1 gap-2 border-b border-[#e5e7eb] px-6 py-5 md:grid-cols-[1.2fr_2fr_0.8fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2.5">
            <span class="text-[20px] leading-none">🇺🇸</span>
            <div>
              <p class="text-[16px] leading-[1.5] text-[#17171c]">美国</p>
              <p class="text-[12px] text-[#93939f]">United States</p>
            </div>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">https://us.api.foundmodel.com</code>
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-[#003c33]"></span>
            <span class="text-[14px] text-[#616161]">正常 · 156ms</span>
          </div>
          <div class="md:text-right">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
          </div>
        </div>

        <!-- 日本 -->
        <div class="grid grid-cols-1 gap-2 border-b border-[#e5e7eb] px-6 py-5 md:grid-cols-[1.2fr_2fr_0.8fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2.5">
            <span class="text-[20px] leading-none">🇯🇵</span>
            <div>
              <p class="text-[16px] leading-[1.5] text-[#17171c]">日本</p>
              <p class="text-[12px] text-[#93939f]">Japan</p>
            </div>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">https://jp.api.foundmodel.com</code>
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-[#003c33]"></span>
            <span class="text-[14px] text-[#616161]">正常 · 45ms</span>
          </div>
          <div class="md:text-right">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
          </div>
        </div>

        <!-- 英国 -->
        <div class="grid grid-cols-1 gap-2 border-b border-[#e5e7eb] px-6 py-5 md:grid-cols-[1.2fr_2fr_0.8fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2.5">
            <span class="text-[20px] leading-none">🇬🇧</span>
            <div>
              <p class="text-[16px] leading-[1.5] text-[#17171c]">英国</p>
              <p class="text-[12px] text-[#93939f]">United Kingdom</p>
            </div>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">https://uk.api.foundmodel.com</code>
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-[#ff7759]"></span>
            <span class="text-[14px] text-[#616161]">繁忙 · 212ms</span>
          </div>
          <div class="md:text-right">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
          </div>
        </div>

        <!-- 澳大利亚 -->
        <div class="grid grid-cols-1 gap-2 px-6 py-5 md:grid-cols-[1.2fr_2fr_0.8fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2.5">
            <span class="text-[20px] leading-none">🇦🇺</span>
            <div>
              <p class="text-[16px] leading-[1.5] text-[#17171c]">澳大利亚</p>
              <p class="text-[12px] text-[#93939f]">Australia</p>
            </div>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">https://au.api.foundmodel.com</code>
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-[#003c33]"></span>
            <span class="text-[14px] text-[#616161]">正常 · 187ms</span>
          </div>
          <div class="md:text-right">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
          </div>
        </div>
      </div>

      <p class="mt-4 text-[12px] leading-[1.4] text-[#93939f]">
        所有节点共享同一套密钥与额度，可随时切换；延迟为当前网络对节点服务器连接探测的参考值，请选择最低延迟的节点，以保证服务的可用性。
      </p>
    </section>

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
