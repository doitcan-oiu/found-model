<template>
  <div class="min-h-screen bg-white text-[#212121] antialiased lg:grid lg:grid-cols-2">
    <!-- 左侧品牌展示面板 -->
    <div class="relative hidden overflow-hidden bg-[#003c33] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <!-- 装饰光斑 -->
      <div class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#edfce9]/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-[#edfce9]/5 blur-3xl"></div>

      <!-- 品牌 -->
      <div class="relative flex items-center gap-2.5">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[14px] font-medium text-[#003c33]">F</span>
        <span class="text-[16px] font-medium tracking-[0.28px] text-white">FoundModel</span>
      </div>

      <!-- 标语 -->
      <div class="relative">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#edfce9]">AI GATEWAY</p>
        <h2 class="mt-4 text-[48px] leading-[1.2] tracking-[-0.48px] text-white">
          一个密钥，<br />接入全部大模型
        </h2>
        <p class="mt-4 max-w-sm text-[18px] leading-[1.4] text-[#edfce9]">
          稳定、高速的大模型中转服务，多地区节点就近接入，按量计费透明可控。
        </p>
      </div>

      <!-- 底部要点 -->
      <ul class="relative space-y-3 text-[16px] leading-[1.5] text-[#edfce9]">
        <li class="flex items-center gap-2"><span class="text-white">✓</span> 全球多节点，低延迟接入</li>
        <li class="flex items-center gap-2"><span class="text-white">✓</span> 支持 Anthropic / OpenAI / Google 等</li>
        <li class="flex items-center gap-2"><span class="text-white">✓</span> 用量与计费实时可查</li>
      </ul>
    </div>

    <!-- 右侧登录表单 -->
    <div class="flex min-h-screen items-center justify-center px-6 py-12 lg:min-h-0">
      <div class="w-full max-w-md">
        <!-- 移动端品牌 -->
        <div class="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17171c] text-[14px] font-medium text-white">F</span>
          <span class="text-[16px] font-medium tracking-[0.28px] text-[#17171c]">FoundModel</span>
        </div>

        <!-- 标题 -->
        <div class="text-center">
          <h1 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">欢迎回来</h1>
          <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">登录以继续使用大模型中转服务</p>
        </div>

        <!-- 表单卡片 -->
        <div class="mt-8 rounded-lg border border-[#e5e7eb] bg-white p-8">
          <form class="space-y-5">
            <!-- 账号 / 邮箱 -->
            <div>
              <label for="account" class="text-[14px] leading-[1.4] text-[#17171c]">账号 / 邮箱</label>
              <input
                id="account"
                type="text"
                autocomplete="username"
                placeholder="请输入账号或邮箱"
                class="mt-2 w-full rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
              />
            </div>

            <!-- 密码 -->
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="text-[14px] leading-[1.4] text-[#17171c]">密码</label>
                <a href="#" class="text-[12px] text-[#1863dc] underline-offset-2 hover:underline">忘记密码？</a>
              </div>
              <input
                id="password"
                type="password"
                autocomplete="current-password"
                placeholder="请输入密码"
                class="mt-2 w-full rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
              />
            </div>

            <!-- 记住我 -->
            <label class="flex cursor-pointer items-center gap-2 text-[14px] leading-[1.4] text-[#616161]">
              <input type="checkbox" class="h-4 w-4 rounded-[4px] border-[#d9d9dd] accent-[#003c33]" />
              记住我
            </label>

            <!-- 提交 -->
            <button
              type="submit"
              class="w-full rounded-[32px] bg-[#17171c] px-6 py-3 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black"
            >
              登录
            </button>
          </form>
        </div>

        <!-- 注册入口 -->
        <p class="mt-6 text-center text-[14px] leading-[1.4] text-[#616161]">
          还没有账号？
          <NuxtLink to="/auth/register" class="text-[#1863dc] underline-offset-2 hover:underline">立即注册</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
