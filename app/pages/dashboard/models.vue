<template>
  <div class="space-y-12">
    <!-- 页头 -->
    <section>
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">MODELS</p>
      <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">模型广场</h1>
      <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
        选择厂商与渠道，查看各渠道可用模型、折算倍率与大概可用余额。
      </p>
    </section>

    <!-- 各渠道可用额度 -->
    <section>
      <div class="flex flex-col gap-6">
        <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">各渠道可用额度</h2>

        <!-- 厂商选择 -->
        <div>
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">选择厂商</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button class="rounded-[30px] border border-[#17171c] bg-[#17171c] px-4 py-2 text-[14px] font-medium leading-[1.71] text-white">Anthropic</button>
            <button class="rounded-[30px] border border-[#d9d9dd] bg-transparent px-4 py-2 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">OpenAI</button>
            <button class="rounded-[30px] border border-[#d9d9dd] bg-transparent px-4 py-2 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">Google</button>
            <button class="rounded-[30px] border border-[#d9d9dd] bg-transparent px-4 py-2 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">Deepseek</button>
            <button class="rounded-[30px] border border-[#d9d9dd] bg-transparent px-4 py-2 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#eeece7]">xAI</button>
          </div>
        </div>

        <!-- 余额基数 -->
        <div class="flex flex-col gap-3 rounded-lg border border-[#e5e7eb] bg-[#eeece7] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-2">
              <p class="text-[16px] leading-[1.5] text-[#17171c]">余额基数</p>
              <span class="group relative inline-flex">
                <span class="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[#93939f] text-[11px] text-[#93939f]">?</span>
                <span class="pointer-events-none absolute left-1/2 top-6 z-10 hidden w-60 -translate-x-1/2 rounded-[8px] bg-[#17171c] px-3 py-2 text-[12px] leading-[1.4] text-white group-hover:block">
                  余额基数为你账户的美元余额，各渠道按自身倍率折算为大概可用人民币余额。
                </span>
              </span>
            </div>
            <p class="mt-1 text-[14px] text-[#616161]">以此基数估算下方各渠道的大概可用余额</p>
          </div>
          <div class="flex items-center gap-2 rounded-[4px] border border-[#d9d9dd] bg-white px-4 py-2.5">
            <span class="text-[16px] text-[#75758a]">$</span>
            <input
              type="text"
              value="100.00"
              class="w-28 bg-transparent text-[16px] leading-[1.5] text-[#17171c] focus:outline-none"
            />
          </div>
        </div>

        <!-- 渠道卡片 -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- 官渠CC满血 -->
          <div class="flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-6">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-[24px] leading-[1.3] text-[#17171c]">官渠CC满血</h3>
              <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">推荐</span>
            </div>

            <!-- 折算 -->
            <div class="mt-3 flex items-center gap-1.5">
              <span class="text-[14px] text-[#616161]">折算 ¥0.98~2.8 = 1$</span>
              <span class="group relative inline-flex">
                <span class="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[#93939f] text-[11px] text-[#93939f]">?</span>
                <span class="pointer-events-none absolute left-1/2 top-6 z-10 hidden w-64 -translate-x-1/2 rounded-[8px] bg-[#17171c] px-3 py-2 text-[12px] leading-[1.4] text-white group-hover:block">
                  <span class="font-medium">折算说明：</span>不同模型按输入/输出 token 单价折算，区间下限对应轻量模型，上限对应旗舰模型。
                </span>
              </span>
            </div>

            <!-- 大概可用余额 -->
            <div class="mt-4 rounded-[8px] bg-[#eeece7] px-4 py-3">
              <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">大概可用余额</p>
              <p class="mt-1 text-[24px] leading-[1.3] text-[#17171c]">¥98 ~ ¥280</p>
            </div>

            <!-- 可用模型 -->
            <div class="mt-4">
              <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">可用模型</p>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]">Claude Opus 4.8</span>
                <span class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]">Claude Sonnet 4.6</span>
                <span class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]">Claude Haiku 4.5</span>
              </div>
            </div>

            <p class="mt-4 flex-1 text-[14px] leading-[1.5] text-[#616161]">
              官方满血版，稳定性最佳，适合生产环境，支持 cc 中使用。
            </p>
            <button class="mt-5 w-full rounded-[32px] border border-[#17171c] px-6 py-2.5 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#17171c] hover:text-white">
              选择此渠道
            </button>
          </div>

          <!-- 官转 -->
          <div class="flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-6">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-[24px] leading-[1.3] text-[#17171c]">官转</h3>
              <span class="rounded-full bg-[#f1f5ff] px-2.5 py-0.5 text-[12px] text-[#1863dc]">高性价比</span>
            </div>

            <div class="mt-3 flex items-center gap-1.5">
              <span class="text-[14px] text-[#616161]">折算 ¥0.7~2.0 = 1$</span>
              <span class="group relative inline-flex">
                <span class="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[#93939f] text-[11px] text-[#93939f]">?</span>
                <span class="pointer-events-none absolute left-1/2 top-6 z-10 hidden w-64 -translate-x-1/2 rounded-[8px] bg-[#17171c] px-3 py-2 text-[12px] leading-[1.4] text-white group-hover:block">
                  <span class="font-medium">折算说明：</span>官方转发通道，单价略低，区间随模型档位浮动。
                </span>
              </span>
            </div>

            <div class="mt-4 rounded-[8px] bg-[#eeece7] px-4 py-3">
              <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">大概可用余额</p>
              <p class="mt-1 text-[24px] leading-[1.3] text-[#17171c]">¥70 ~ ¥200</p>
            </div>

            <div class="mt-4">
              <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">可用模型</p>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]">Claude Opus 4.8</span>
                <span class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]">Claude Sonnet 4.6</span>
              </div>
            </div>

            <p class="mt-4 flex-1 text-[14px] leading-[1.5] text-[#616161]">
              官方转发通道，价格更优，稳定性良好，适合日常开发与批量调用。
            </p>
            <button class="mt-5 w-full rounded-[32px] border border-[#17171c] px-6 py-2.5 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#17171c] hover:text-white">
              选择此渠道
            </button>
          </div>

          <!-- 逆向 -->
          <div class="flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-6">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-[24px] leading-[1.3] text-[#17171c]">逆向</h3>
              <span class="rounded-full bg-[#eeece7] px-2.5 py-0.5 text-[12px] text-[#75758a]">超低价</span>
            </div>

            <div class="mt-3 flex items-center gap-1.5">
              <span class="text-[14px] text-[#616161]">折算 ¥0.3~1.0 = 1$</span>
              <span class="group relative inline-flex">
                <span class="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[#93939f] text-[11px] text-[#93939f]">?</span>
                <span class="pointer-events-none absolute left-1/2 top-6 z-10 hidden w-64 -translate-x-1/2 rounded-[8px] bg-[#17171c] px-3 py-2 text-[12px] leading-[1.4] text-white group-hover:block">
                  <span class="font-medium">折算说明：</span>逆向通道单价最低，稳定性一般，不建议用于生产环境。
                </span>
              </span>
            </div>

            <div class="mt-4 rounded-[8px] bg-[#eeece7] px-4 py-3">
              <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">大概可用余额</p>
              <p class="mt-1 text-[24px] leading-[1.3] text-[#17171c]">¥30 ~ ¥100</p>
            </div>

            <div class="mt-4">
              <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">可用模型</p>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]">Claude Sonnet 4.6</span>
                <span class="rounded-full border border-[#d9d9dd] px-2.5 py-0.5 text-[12px] text-[#212121]">Claude Haiku 4.5</span>
              </div>
            </div>

            <p class="mt-4 flex-1 text-[14px] leading-[1.5] text-[#616161]">
              逆向通道，价格极低，适合测试与个人体验，稳定性波动较大。
            </p>
            <button class="mt-5 w-full rounded-[32px] border border-[#17171c] px-6 py-2.5 text-[14px] font-medium leading-[1.71] text-[#17171c] transition-colors hover:bg-[#17171c] hover:text-white">
              选择此渠道
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用教程 -->
    <section>
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">使用教程</h2>
      <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeece7] text-[14px] text-[#17171c]">1</span>
          <h3 class="mt-4 text-[18px] leading-[1.4] text-[#17171c]">选择厂商与渠道</h3>
          <p class="mt-2 text-[14px] leading-[1.5] text-[#616161]">
            根据模型需求与预算，选定厂商及对应渠道，关注折算倍率与大概可用余额。
          </p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeece7] text-[14px] text-[#17171c]">2</span>
          <h3 class="mt-4 text-[18px] leading-[1.4] text-[#17171c]">配置接入信息</h3>
          <p class="mt-2 text-[14px] leading-[1.5] text-[#616161]">
            在「接口密钥」获取 API Key，结合「节点信息」中的接入地址填入你的客户端。
          </p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeece7] text-[14px] text-[#17171c]">3</span>
          <h3 class="mt-4 text-[18px] leading-[1.4] text-[#17171c]">指定模型调用</h3>
          <p class="mt-2 text-[14px] leading-[1.5] text-[#616161]">
            在请求的 model 字段填写所选模型名称即可发起调用，用量从对应渠道折算扣减。
          </p>
        </div>
      </div>

      <!-- 在 Claude Code 中使用 -->
      <div class="mt-6 rounded-lg border border-[#e5e7eb] bg-white p-8">
        <h3 class="text-[18px] leading-[1.4] text-[#17171c]">在 Claude Code (cc) 中使用</h3>
        <p class="mt-2 text-[14px] leading-[1.5] text-[#616161]">
          设置环境变量后即可让 cc 走本平台的「官渠CC满血」通道：
        </p>
        <pre class="mt-4 overflow-x-auto rounded-[8px] bg-[#17171c] p-5 text-[14px] leading-[1.6] text-[#edfce9]"><code>export ANTHROPIC_BASE_URL="https://hk.api.foundmodel.com"
export ANTHROPIC_API_KEY="sk-fm-xxxxxxxxxxxx"
claude</code></pre>
      </div>
    </section>
  </div>
</template>
