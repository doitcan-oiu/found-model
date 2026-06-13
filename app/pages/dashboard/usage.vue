<template>
  <div class="space-y-12">
    <!-- 页头 -->
    <section>
      <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">USAGE</p>
      <h1 class="mt-2 text-[48px] leading-[1.2] tracking-[-0.48px] text-[#17171c]">使用统计</h1>
      <p class="mt-3 max-w-2xl text-[18px] leading-[1.4] text-[#616161]">
        查看各模型的花费趋势与历史消费记录，掌握额度消耗节奏。
      </p>
    </section>

    <!-- 概览指标 -->
    <section class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">今日花费</p>
        <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">¥18.40</p>
        <p class="mt-1 text-[14px] text-[#003c33]">较昨日 +12%</p>
      </div>
      <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">本周花费</p>
        <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">¥106.20</p>
        <p class="mt-1 text-[14px] text-[#616161]">7 天累计</p>
      </div>
      <div class="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <p class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">今日调用</p>
        <p class="mt-3 text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">1,842</p>
        <p class="mt-1 text-[14px] text-[#616161]">次请求</p>
      </div>
    </section>

    <!-- 24 小时各模型花费趋势 -->
    <section>
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">24 小时花费趋势</h2>
        <!-- 图例 -->
        <div class="flex flex-wrap gap-4">
          <span class="flex items-center gap-2 text-[14px] text-[#616161]">
            <span class="h-2.5 w-2.5 rounded-full bg-[#003c33]"></span> Claude Opus 4.8
          </span>
          <span class="flex items-center gap-2 text-[14px] text-[#616161]">
            <span class="h-2.5 w-2.5 rounded-full bg-[#1863dc]"></span> GPT-4o
          </span>
          <span class="flex items-center gap-2 text-[14px] text-[#616161]">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff7759]"></span> Gemini 2.5 Pro
          </span>
        </div>
      </div>

      <div class="mt-6 rounded-lg border border-[#e5e7eb] bg-white p-6">
        <svg viewBox="0 0 800 280" class="h-auto w-full" preserveAspectRatio="none">
          <!-- 网格横线 -->
          <line x1="40" y1="20" x2="780" y2="20" stroke="#e5e7eb" stroke-width="1" />
          <line x1="40" y1="80" x2="780" y2="80" stroke="#e5e7eb" stroke-width="1" />
          <line x1="40" y1="140" x2="780" y2="140" stroke="#e5e7eb" stroke-width="1" />
          <line x1="40" y1="200" x2="780" y2="200" stroke="#e5e7eb" stroke-width="1" />
          <line x1="40" y1="240" x2="780" y2="240" stroke="#d9d9dd" stroke-width="1" />

          <!-- Y 轴刻度 -->
          <text x="32" y="24" text-anchor="end" font-size="11" fill="#93939f">¥4</text>
          <text x="32" y="84" text-anchor="end" font-size="11" fill="#93939f">¥3</text>
          <text x="32" y="144" text-anchor="end" font-size="11" fill="#93939f">¥2</text>
          <text x="32" y="204" text-anchor="end" font-size="11" fill="#93939f">¥1</text>
          <text x="32" y="244" text-anchor="end" font-size="11" fill="#93939f">¥0</text>

          <!-- X 轴刻度 -->
          <text x="40" y="262" text-anchor="middle" font-size="11" fill="#93939f">00:00</text>
          <text x="225" y="262" text-anchor="middle" font-size="11" fill="#93939f">06:00</text>
          <text x="410" y="262" text-anchor="middle" font-size="11" fill="#93939f">12:00</text>
          <text x="595" y="262" text-anchor="middle" font-size="11" fill="#93939f">18:00</text>
          <text x="780" y="262" text-anchor="middle" font-size="11" fill="#93939f">24:00</text>

          <!-- Claude Opus 4.8 -->
          <polyline
            fill="none" stroke="#003c33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            points="40,210 132,190 225,160 318,120 410,95 502,110 595,70 687,90 780,60"
          />
          <!-- GPT-4o -->
          <polyline
            fill="none" stroke="#1863dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            points="40,230 132,225 225,200 318,205 410,170 502,180 595,150 687,160 780,135"
          />
          <!-- Gemini 2.5 Pro -->
          <polyline
            fill="none" stroke="#ff7759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            points="40,238 132,232 225,228 318,215 410,220 502,200 595,210 687,195 780,200"
          />
        </svg>
      </div>
    </section>

    <!-- 近一周消费记录 -->
    <section>
      <div class="flex items-center justify-between">
        <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">近一周消费记录</h2>
        <span class="text-[14px] text-[#616161]">共 7 天</span>
      </div>

      <div class="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
        <!-- 表头 -->
        <div class="hidden grid-cols-[1.6fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_28px] gap-4 border-b border-[#d9d9dd] px-6 py-4 md:grid">
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">时间</span>
          <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">模型</span>
          <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">输入</span>
          <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">输出</span>
          <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">缓存读</span>
          <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">缓存写</span>
          <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">费用</span>
          <span></span>
        </div>

        <!-- 记录 1 -->
        <details class="group border-b border-[#e5e7eb]">
          <summary class="grid cursor-pointer grid-cols-2 gap-x-4 gap-y-2 px-6 py-4 marker:content-none hover:bg-[#faf9f7] md:grid-cols-[1.6fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_28px] md:items-center md:gap-4">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">2026-06-13 14:32:08</span>
            <span class="text-[14px] leading-[1.4] text-[#616161]">Claude Opus 4.8</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输入 </span>12,480</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输出 </span>3,204</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存读 </span>8,192</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存写 </span>1,024</span>
            <span class="text-[16px] leading-[1.5] text-[#17171c] md:text-right">¥0.86</span>
            <span class="hidden text-[#93939f] transition-transform group-open:rotate-45 md:flex md:justify-end">+</span>
          </summary>
          <!-- 计费详情 -->
          <div class="border-t border-[#e5e7eb] bg-[#faf9f7] px-6 py-5">
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">请求信息</p>
                <dl class="mt-2 space-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between"><dt class="text-[#616161]">请求 ID</dt><dd class="text-[#17171c]">req_8f3a2c91d4</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">渠道</dt><dd class="text-[#17171c]">官渠CC满血</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">密钥</dt><dd class="text-[#17171c]">生产环境</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">倍率</dt><dd class="text-[#17171c]">1.0x</dd></div>
                </dl>
              </div>
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">计费明细</p>
                <dl class="mt-2 space-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between"><dt class="text-[#616161]">输入 12,480 × ¥0.03/K</dt><dd class="text-[#17171c]">¥0.374</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">输出 3,204 × ¥0.12/K</dt><dd class="text-[#17171c]">¥0.384</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">缓存读 8,192 × ¥0.003/K</dt><dd class="text-[#17171c]">¥0.025</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">缓存写 1,024 × ¥0.0375/K</dt><dd class="text-[#17171c]">¥0.038</dd></div>
                  <div class="mt-1 flex justify-between border-t border-[#d9d9dd] pt-1.5"><dt class="text-[#17171c]">合计</dt><dd class="text-[#17171c]">¥0.86</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </details>
        <!-- 记录 2 -->
        <details class="group border-b border-[#e5e7eb]">
          <summary class="grid cursor-pointer grid-cols-2 gap-x-4 gap-y-2 px-6 py-4 marker:content-none hover:bg-[#faf9f7] md:grid-cols-[1.6fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_28px] md:items-center md:gap-4">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">2026-06-13 13:58:41</span>
            <span class="text-[14px] leading-[1.4] text-[#616161]">GPT-4o</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输入 </span>5,210</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输出 </span>1,840</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存读 </span>0</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存写 </span>0</span>
            <span class="text-[16px] leading-[1.5] text-[#17171c] md:text-right">¥0.42</span>
            <span class="hidden text-[#93939f] transition-transform group-open:rotate-45 md:flex md:justify-end">+</span>
          </summary>
          <div class="border-t border-[#e5e7eb] bg-[#faf9f7] px-6 py-5">
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">请求信息</p>
                <dl class="mt-2 space-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between"><dt class="text-[#616161]">请求 ID</dt><dd class="text-[#17171c]">req_2b71e0fa55</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">渠道</dt><dd class="text-[#17171c]">官转</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">密钥</dt><dd class="text-[#17171c]">测试环境</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">倍率</dt><dd class="text-[#17171c]">1.2x</dd></div>
                </dl>
              </div>
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">计费明细</p>
                <dl class="mt-2 space-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between"><dt class="text-[#616161]">输入 5,210 × ¥0.04/K</dt><dd class="text-[#17171c]">¥0.208</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">输出 1,840 × ¥0.12/K</dt><dd class="text-[#17171c]">¥0.221</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">缓存读 0</dt><dd class="text-[#17171c]">¥0.000</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">缓存写 0</dt><dd class="text-[#17171c]">¥0.000</dd></div>
                  <div class="mt-1 flex justify-between border-t border-[#d9d9dd] pt-1.5"><dt class="text-[#17171c]">合计</dt><dd class="text-[#17171c]">¥0.42</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </details>

        <!-- 记录 3 -->
        <details class="group">
          <summary class="grid cursor-pointer grid-cols-2 gap-x-4 gap-y-2 px-6 py-4 marker:content-none hover:bg-[#faf9f7] md:grid-cols-[1.6fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_0.9fr_28px] md:items-center md:gap-4">
            <span class="text-[16px] leading-[1.5] text-[#17171c]">2026-06-13 13:15:22</span>
            <span class="text-[14px] leading-[1.4] text-[#616161]">Gemini 2.5 Pro</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输入 </span>9,640</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">输出 </span>2,108</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存读 </span>4,096</span>
            <span class="text-[14px] leading-[1.4] text-[#616161] md:text-right"><span class="text-[#93939f] md:hidden">缓存写 </span>512</span>
            <span class="text-[16px] leading-[1.5] text-[#17171c] md:text-right">¥0.55</span>
            <span class="hidden text-[#93939f] transition-transform group-open:rotate-45 md:flex md:justify-end">+</span>
          </summary>
          <div class="border-t border-[#e5e7eb] bg-[#faf9f7] px-6 py-5">
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">请求信息</p>
                <dl class="mt-2 space-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between"><dt class="text-[#616161]">请求 ID</dt><dd class="text-[#17171c]">req_c904ad3e18</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">渠道</dt><dd class="text-[#17171c]">官转</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">密钥</dt><dd class="text-[#17171c]">生产环境</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">倍率</dt><dd class="text-[#17171c]">1.0x</dd></div>
                </dl>
              </div>
              <div>
                <p class="text-[12px] uppercase tracking-[0.28px] text-[#75758a]">计费明细</p>
                <dl class="mt-2 space-y-1.5 text-[14px] leading-[1.5]">
                  <div class="flex justify-between"><dt class="text-[#616161]">输入 9,640 × ¥0.025/K</dt><dd class="text-[#17171c]">¥0.241</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">输出 2,108 × ¥0.10/K</dt><dd class="text-[#17171c]">¥0.211</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">缓存读 4,096 × ¥0.0025/K</dt><dd class="text-[#17171c]">¥0.010</dd></div>
                  <div class="flex justify-between"><dt class="text-[#616161]">缓存写 512 × ¥0.031/K</dt><dd class="text-[#17171c]">¥0.016</dd></div>
                  <div class="mt-1 flex justify-between border-t border-[#d9d9dd] pt-1.5"><dt class="text-[#17171c]">合计</dt><dd class="text-[#17171c]">¥0.55</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </details>
      </div>

      <!-- 分页 -->
      <div class="mt-6 flex items-center justify-between">
        <span class="text-[14px] text-[#616161]">第 1 - 20 条，共 1,842 条</span>
        <div class="flex items-center gap-1">
          <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] text-[#93939f]" disabled>上一页</button>
          <button class="rounded-[30px] border border-[#17171c] bg-[#17171c] px-3.5 py-1.5 text-[14px] text-white">1</button>
          <button class="rounded-[30px] border border-[#d9d9dd] px-3.5 py-1.5 text-[14px] text-[#17171c] transition-colors hover:bg-[#eeece7]">2</button>
          <button class="rounded-[30px] border border-[#d9d9dd] px-3.5 py-1.5 text-[14px] text-[#17171c] transition-colors hover:bg-[#eeece7]">3</button>
          <span class="px-1 text-[14px] text-[#93939f]">…</span>
          <button class="rounded-[30px] border border-[#d9d9dd] px-3.5 py-1.5 text-[14px] text-[#17171c] transition-colors hover:bg-[#eeece7]">93</button>
          <button class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] text-[#17171c] transition-colors hover:bg-[#eeece7]">下一页</button>
        </div>
      </div>
    </section>
  </div>
</template>
