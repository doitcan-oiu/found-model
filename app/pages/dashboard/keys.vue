<template>
  <div class="space-y-12">
    <!-- 页头 -->
    <section class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">API KEYS</p>
        <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">接口密钥</h1>
        <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
          管理用于调用中转接口的 API 密钥。密钥仅在创建时完整显示一次，请妥善保管。
        </p>
      </div>
      <button class="inline-flex shrink-0 items-center gap-2 rounded-[32px] bg-[#17171c] px-6 py-3 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black">
        <span class="text-[16px] leading-none">+</span> 创建密钥
      </button>
    </section>

    <!-- 接口地址 -->
    <section class="rounded-lg border border-[#e5e7eb] bg-white p-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">BASE URL</p>
          <p class="mt-1 text-[16px] leading-[1.5] text-[#212121]">接口基础地址</p>
        </div>
        <div class="flex items-center gap-2 rounded-[4px] border border-[#d9d9dd] bg-[#eeece7] px-4 py-2.5">
          <code class="text-[14px] tracking-[0.28px] text-[#17171c]">https://api.foundmodel.com/v1</code>
          <button class="rounded-[30px] border border-[#d9d9dd] bg-white px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
        </div>
      </div>
    </section>

    <!-- 令牌列表 -->
    <section>
      <div class="flex items-center justify-between">
        <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">令牌列表</h2>
        <span class="text-[14px] text-[#616161]">共 3 个密钥</span>
      </div>

      <div class="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
        <!-- 表头 -->
        <div class="hidden grid-cols-[1.4fr_1.6fr_1fr_1fr_0.8fr] gap-4 border-b border-[#d9d9dd] px-6 py-4 md:grid">
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">名称</span>
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">密钥</span>
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">创建时间</span>
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">最近使用</span>
          <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">操作</span>
        </div>

        <!-- 行 1 -->
        <div class="grid grid-cols-1 gap-2 border-b border-[#e5e7eb] px-6 py-5 md:grid-cols-[1.4fr_1.6fr_1fr_1fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">生产环境</span>
            <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">启用</span>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">sk-fm-••••••••••••4a9c</code>
          <span class="text-[14px] leading-[1.4] text-[#616161]">2026-05-21</span>
          <span class="text-[14px] leading-[1.4] text-[#616161]">2 小时前</span>
          <div class="flex gap-2 md:justify-end">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#b30000] transition-colors hover:bg-[#eeece7]">删除</button>
          </div>
        </div>

        <!-- 行 2 -->
        <div class="grid grid-cols-1 gap-2 border-b border-[#e5e7eb] px-6 py-5 md:grid-cols-[1.4fr_1.6fr_1fr_1fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">测试环境</span>
            <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">启用</span>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">sk-fm-••••••••••••1f02</code>
          <span class="text-[14px] leading-[1.4] text-[#616161]">2026-04-08</span>
          <span class="text-[14px] leading-[1.4] text-[#616161]">3 天前</span>
          <div class="flex gap-2 md:justify-end">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#b30000] transition-colors hover:bg-[#eeece7]">删除</button>
          </div>
        </div>

        <!-- 行 3 -->
        <div class="grid grid-cols-1 gap-2 px-6 py-5 md:grid-cols-[1.4fr_1.6fr_1fr_1fr_0.8fr] md:items-center md:gap-4">
          <div class="flex items-center gap-2">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">本地调试</span>
            <span class="rounded-full bg-[#eeece7] px-2.5 py-0.5 text-[12px] text-[#75758a]">已停用</span>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161]">sk-fm-••••••••••••88d3</code>
          <span class="text-[14px] leading-[1.4] text-[#616161]">2026-03-15</span>
          <span class="text-[14px] leading-[1.4] text-[#616161]">从未使用</span>
          <div class="flex gap-2 md:justify-end">
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]">复制</button>
            <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#b30000] transition-colors hover:bg-[#eeece7]">删除</button>
          </div>
        </div>
      </div>

      <p class="mt-4 text-[12px] leading-[1.4] text-[#93939f]">
        请勿在客户端代码或公开仓库中暴露密钥。如怀疑泄露，请立即删除并重新创建。
      </p>
    </section>
  </div>
</template>
