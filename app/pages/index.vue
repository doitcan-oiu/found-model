<template>
  <div class="min-h-screen bg-white text-[#212121] antialiased">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-50 border-b border-[#d9d9dd] bg-white/90 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17171c] text-[13px] font-medium text-white">F</span>
          <span class="text-[15px] font-medium tracking-[0.28px] text-[#17171c]">FoundModel</span>
        </NuxtLink>
        <nav class="hidden items-center gap-8 md:flex">
          <a href="#features" class="text-[14px] text-[#616161] transition-colors hover:text-[#17171c]">能力</a>
          <a href="#models" class="text-[14px] text-[#616161] transition-colors hover:text-[#17171c]">模型</a>
          <a href="#pricing" class="text-[14px] text-[#616161] transition-colors hover:text-[#17171c]">定价</a>
          <a href="#faq" class="text-[14px] text-[#616161] transition-colors hover:text-[#17171c]">常见问题</a>
        </nav>
        <div class="flex items-center gap-3">
          <NuxtLink to="/auth/login" class="text-[14px] text-[#17171c] transition-colors hover:text-[#616161]">登录</NuxtLink>
          <NuxtLink to="/auth/register" class="rounded-[32px] bg-[#17171c] px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-black">免费注册</NuxtLink>
        </div>
      </div>
    </header>

    <!-- HERO -->
    <section class="mx-auto max-w-7xl px-6 pb-20 pt-20 text-center sm:pt-28">
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">UNIFIED AI GATEWAY</p>
      <h1 class="mx-auto mt-5 max-w-4xl text-[44px] font-normal leading-[1.05] tracking-[-1.5px] text-[#17171c] sm:text-[72px]">
        一个密钥，<br class="hidden sm:block" />接入全部大模型
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.5] text-[#616161]">
        FoundModel 是稳定、高速的大模型中转平台。聚合 Anthropic、OpenAI、Google 等主流模型，多地区节点就近接入，按量计费透明可控。
      </p>
      <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <NuxtLink to="/auth/register" class="w-full rounded-[32px] bg-[#17171c] px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-black sm:w-auto">免费开始使用</NuxtLink>
        <NuxtLink to="/dashboard/models" class="w-full rounded-[32px] border border-[#d9d9dd] px-7 py-3.5 text-[14px] font-medium text-[#17171c] transition-colors hover:bg-[#eeece7] sm:w-auto">查看模型广场</NuxtLink>
      </div>

      <!-- 代码示例卡片 -->
      <div class="mx-auto mt-16 max-w-3xl overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-white text-left shadow-sm">
        <div class="flex items-center gap-2 border-b border-[#e5e7eb] bg-[#faf9f7] px-5 py-3">
          <span class="h-3 w-3 rounded-full bg-[#ff7759]"></span>
          <span class="h-3 w-3 rounded-full bg-[#eeece7]"></span>
          <span class="h-3 w-3 rounded-full bg-[#edfce9]"></span>
          <span class="ml-2 text-[12px] text-[#93939f]">quickstart.sh</span>
        </div>
        <pre class="overflow-x-auto bg-[#17171c] p-6 text-[13px] leading-[1.7] text-[#edfce9]"><code>curl https://api.foundmodel.com/v1/chat/completions \
  -H "Authorization: Bearer $FM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-opus-4-8",
    "messages": [{"role": "user", "content": "你好"}]
  }'</code></pre>
      </div>
    </section>
    <!-- 信任栏 -->
    <section class="border-y border-[#e5e7eb] bg-white py-10">
      <div class="mx-auto max-w-7xl px-6">
        <p class="text-center text-[14px] text-[#616161]">聚合主流厂商模型，统一接口调用</p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[18px] font-medium text-[#93939f]">
          <span>Anthropic</span>
          <span>OpenAI</span>
          <span>Google</span>
          <span>DeepSeek</span>
          <span>xAI</span>
          <span>智谱</span>
        </div>
      </div>
    </section>

    <!-- 能力 -->
    <section id="features" class="mx-auto max-w-7xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">WHY FOUNDMODEL</p>
        <h2 class="mt-3 text-[40px] leading-[1.1] tracking-[-1px] text-[#17171c] sm:text-[48px]">为生产环境而生的中转层</h2>
      </div>
      <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="rounded-[16px] border border-[#e5e7eb] bg-white p-8">
          <div class="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#eeece7] text-[20px]">🌐</div>
          <h3 class="mt-5 text-[24px] leading-[1.3] text-[#17171c]">全球多节点</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">香港、美国、日本等多地区接入节点，自动测速就近接入，低延迟稳定调用。</p>
        </div>
        <div class="rounded-[16px] border border-[#e5e7eb] bg-white p-8">
          <div class="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#eeece7] text-[20px]">🔑</div>
          <h3 class="mt-5 text-[24px] leading-[1.3] text-[#17171c]">统一接口</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">兼容 Anthropic / OpenAI / Gemini 协议，一套密钥畅通所有模型，无需改造代码。</p>
        </div>
        <div class="rounded-[16px] border border-[#e5e7eb] bg-white p-8">
          <div class="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#eeece7] text-[20px]">📊</div>
          <h3 class="mt-5 text-[24px] leading-[1.3] text-[#17171c]">透明计费</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">按 token 实时计费，用量与花费明细可查，分组倍率清晰，成本完全可控。</p>
        </div>
      </div>
    </section>

    <!-- 深色产品band -->
    <section id="models" class="bg-white px-6 pb-24">
      <div class="mx-auto max-w-7xl overflow-hidden rounded-[22px] bg-[#003c33] p-10 text-white sm:p-16">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p class="text-[14px] uppercase tracking-[0.28px] text-[#edfce9]">MODEL MARKETPLACE</p>
            <h2 class="mt-4 text-[36px] leading-[1.1] tracking-[-0.8px] text-white sm:text-[48px]">主流旗舰模型，随取随用</h2>
            <p class="mt-5 max-w-md text-[18px] leading-[1.5] text-[#edfce9]">
              从 Claude Opus、GPT 系列到 Gemini、DeepSeek，多渠道分组按需选择，缓存、长上下文、按次/按量计费灵活组合。
            </p>
            <NuxtLink to="/auth/register" class="mt-8 inline-flex rounded-[32px] bg-white px-7 py-3.5 text-[14px] font-medium text-[#17171c] transition-colors hover:bg-[#eeece7]">立即开通</NuxtLink>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-[12px] bg-white/5 p-5 ring-1 ring-white/10">
              <p class="text-[16px] text-white">Claude Opus 4.8</p>
              <p class="mt-1 text-[13px] text-[#edfce9]">Anthropic · 长上下文</p>
            </div>
            <div class="rounded-[12px] bg-white/5 p-5 ring-1 ring-white/10">
              <p class="text-[16px] text-white">GPT-5.4</p>
              <p class="mt-1 text-[13px] text-[#edfce9]">OpenAI · 通用旗舰</p>
            </div>
            <div class="rounded-[12px] bg-white/5 p-5 ring-1 ring-white/10">
              <p class="text-[16px] text-white">Gemini 3 Pro</p>
              <p class="mt-1 text-[13px] text-[#edfce9]">Google · 多模态</p>
            </div>
            <div class="rounded-[12px] bg-white/5 p-5 ring-1 ring-white/10">
              <p class="text-[16px] text-white">DeepSeek V4</p>
              <p class="mt-1 text-[13px] text-[#edfce9]">国产 · 高性价比</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 三步上手 -->
    <section class="mx-auto max-w-7xl px-6 pb-24">
      <div class="max-w-2xl">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">GET STARTED</p>
        <h2 class="mt-3 text-[40px] leading-[1.1] tracking-[-1px] text-[#17171c] sm:text-[48px]">三步即可接入</h2>
      </div>
      <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="border-t-2 border-[#17171c] pt-5">
          <span class="text-[14px] font-medium text-[#75758a]">01</span>
          <h3 class="mt-2 text-[24px] leading-[1.3] text-[#17171c]">注册并订阅</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">注册账号，选择套餐或用兑换码激活订阅额度。</p>
        </div>
        <div class="border-t-2 border-[#17171c] pt-5">
          <span class="text-[14px] font-medium text-[#75758a]">02</span>
          <h3 class="mt-2 text-[24px] leading-[1.3] text-[#17171c]">创建密钥</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">在控制台生成 API Key，选择就近的接入节点。</p>
        </div>
        <div class="border-t-2 border-[#17171c] pt-5">
          <span class="text-[14px] font-medium text-[#75758a]">03</span>
          <h3 class="mt-2 text-[24px] leading-[1.3] text-[#17171c]">发起调用</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">填入模型名即可调用，用量与花费实时可查。</p>
        </div>
      </div>
    </section>

    <!-- 定价 CTA -->
    <section id="pricing" class="bg-white px-6 pb-24">
      <div class="mx-auto max-w-7xl rounded-[22px] bg-[#eeece7] p-10 text-center sm:p-16">
        <h2 class="text-[36px] leading-[1.1] tracking-[-0.8px] text-[#17171c] sm:text-[48px]">按量计费，按需付费</h2>
        <p class="mx-auto mt-4 max-w-xl text-[18px] leading-[1.5] text-[#616161]">
          多档订阅套餐，充值赠送额度，分组倍率低至 0.1x。无最低消费，随用随充。
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NuxtLink to="/auth/register" class="w-full rounded-[32px] bg-[#17171c] px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-black sm:w-auto">查看套餐</NuxtLink>
          <NuxtLink to="/dashboard/models" class="w-full rounded-[32px] border border-[#17171c] px-7 py-3.5 text-[14px] font-medium text-[#17171c] transition-colors hover:bg-white sm:w-auto">浏览模型定价</NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="mx-auto max-w-3xl px-6 pb-24">
      <h2 class="text-center text-[40px] leading-[1.1] tracking-[-1px] text-[#17171c] sm:text-[48px]">常见问题</h2>
      <div class="mt-10 divide-y divide-[#e5e7eb] rounded-[16px] border border-[#e5e7eb] bg-white">
        <details class="group px-8 py-5" open>
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            支持哪些模型和接口协议？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">聚合 Anthropic、OpenAI、Google、DeepSeek、xAI 等主流厂商模型，兼容 Anthropic / OpenAI / Gemini 三种接口协议，适配 Claude Code、Codex、Cline 等主流客户端。</p>
        </details>
        <details class="group px-8 py-5">
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            如何计费？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">按实际消耗的 token 计费，不同模型与分组倍率不同，控制台可实时查看用量与花费明细。</p>
        </details>
        <details class="group px-8 py-5">
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            稳定性如何？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">多地区节点冗余接入，前端自动探测延迟就近选择，保障服务可用性与响应速度。</p>
        </details>
        <details class="group px-8 py-5">
          <summary class="flex cursor-pointer items-center justify-between text-[18px] leading-[1.4] text-[#17171c] marker:content-none">
            可以退款吗？
            <span class="text-[#93939f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#616161]">已订购的订阅可在控制台提交退款工单，审核与处理时效均为 24 小时，款项原路退回。</p>
        </details>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-[#17171c] px-6 py-16 text-white">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div class="max-w-sm">
            <div class="flex items-center gap-2.5">
              <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[13px] font-medium text-[#17171c]">F</span>
              <span class="text-[15px] font-medium tracking-[0.28px] text-white">FoundModel</span>
            </div>
            <p class="mt-4 text-[14px] leading-[1.5] text-[#93939f]">稳定、高速的大模型中转平台，一个密钥接入全部大模型。</p>
          </div>
          <div class="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p class="text-[13px] uppercase tracking-[0.28px] text-white">产品</p>
              <ul class="mt-4 space-y-2.5 text-[14px] text-[#93939f]">
                <li><NuxtLink to="/dashboard" class="transition-colors hover:text-white">控制台</NuxtLink></li>
                <li><NuxtLink to="/dashboard/models" class="transition-colors hover:text-white">模型广场</NuxtLink></li>
                <li><NuxtLink to="/dashboard/subscription" class="transition-colors hover:text-white">订阅套餐</NuxtLink></li>
              </ul>
            </div>
            <div>
              <p class="text-[13px] uppercase tracking-[0.28px] text-white">支持</p>
              <ul class="mt-4 space-y-2.5 text-[14px] text-[#93939f]">
                <li><a href="#faq" class="transition-colors hover:text-white">常见问题</a></li>
                <li><NuxtLink to="/dashboard/tickets" class="transition-colors hover:text-white">工单服务</NuxtLink></li>
                <li><a href="#" class="transition-colors hover:text-white">API 文档</a></li>
              </ul>
            </div>
            <div>
              <p class="text-[13px] uppercase tracking-[0.28px] text-white">账户</p>
              <ul class="mt-4 space-y-2.5 text-[14px] text-[#93939f]">
                <li><NuxtLink to="/auth/login" class="transition-colors hover:text-white">登录</NuxtLink></li>
                <li><NuxtLink to="/auth/register" class="transition-colors hover:text-white">注册</NuxtLink></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-white/10 pt-6 text-[13px] text-[#93939f]">
          © {{ new Date().getFullYear() }} FoundModel. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
