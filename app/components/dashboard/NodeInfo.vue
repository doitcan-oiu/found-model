<script setup>
const { apiInfo, pending, error } = useDashboardStatus()

// 复制接入地址
const message = useMessage()
async function copy(url) {
  try {
    await navigator.clipboard.writeText(url)
    message.success('已复制', url)
  } catch {
    message.error('复制失败', '请手动复制')
  }
}

// 节点颜色名 -> 状态点色值
const colorMap = {
  blue: '#1863dc',
  green: '#003c33',
  orange: '#ff7759',
  red: '#b30000',
  grey: '#93939f',
  gray: '#93939f'
}
function dotColor(c) {
  return colorMap[c] || '#003c33'
}

// ---- 延迟探测 ----
const PING_TIMEOUT = 2000
// url -> { status: 'pending'|'ok'|'timeout', ms }
const latency = reactive({})

// 用计时的 HTTP 请求估算延迟（浏览器无法 ICMP ping）
async function pingNode(url) {
  latency[url] = { status: 'pending', ms: null }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), PING_TIMEOUT)
  const start = performance.now()
  try {
    // no-cors：仅用于计时，不关心响应内容；加时间戳避免缓存
    await fetch(`${url}/favicon.ico?_t=${Date.now()}`, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    })
    latency[url] = { status: 'ok', ms: Math.round(performance.now() - start) }
  } catch (err) {
    // abort = 超时；其它错误（如连接重置）也按已响应计时处理
    if (err?.name === 'AbortError') {
      latency[url] = { status: 'timeout', ms: null }
    } else {
      latency[url] = { status: 'ok', ms: Math.round(performance.now() - start) }
    }
  } finally {
    clearTimeout(timer)
  }
}

// 节点列表就绪后并发探测
watch(apiInfo, (list) => {
  for (const node of list) {
    if (node.url && !latency[node.url]) pingNode(node.url)
  }
}, { immediate: true })

// 按延迟升序排序（探测中/超时排最后）
function latencyValue(url) {
  const l = latency[url]
  if (l?.status === 'ok') return l.ms
  return Number.POSITIVE_INFINITY
}
const sortedNodes = computed(() =>
  [...apiInfo.value].sort((a, b) => latencyValue(a.url) - latencyValue(b.url))
)

// 延迟对应的颜色（绿/橙/红）
function latencyColor(url) {
  const l = latency[url]
  if (l?.status !== 'ok') return '#93939f'
  if (l.ms < 100) return '#003c33'
  if (l.ms < 500) return '#ff7759'
  return '#b30000'
}
</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">节点信息</h2>
      <span class="text-[14px] text-[#616161]">就近选择延迟更低的接入节点</span>
    </div>

    <div class="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
      <!-- 表头 -->
      <div class="hidden grid-cols-[1.1fr_1.8fr_1.4fr_0.8fr_0.7fr] gap-4 border-b border-[#d9d9dd] px-6 py-4 md:grid">
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">节点</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">接入地址</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">说明</span>
        <span class="text-[14px] uppercase tracking-[0.28px] text-[#75758a]">延迟</span>
        <span class="text-right text-[14px] uppercase tracking-[0.28px] text-[#75758a]">操作</span>
      </div>

      <!-- 加载骨架 -->
      <template v-if="pending">
        <div v-for="i in 2" :key="i" class="grid grid-cols-1 gap-2 border-b border-[#e5e7eb] px-6 py-5 md:grid-cols-[1.1fr_1.8fr_1.4fr_0.8fr_0.7fr] md:items-center md:gap-4">
          <div class="h-4 w-24 animate-pulse rounded bg-[#eeece7]"></div>
          <div class="h-4 w-48 animate-pulse rounded bg-[#eeece7]"></div>
          <div class="h-4 w-32 animate-pulse rounded bg-[#eeece7]"></div>
          <div class="h-4 w-16 animate-pulse rounded bg-[#eeece7]"></div>
          <div class="h-6 w-12 animate-pulse rounded-full bg-[#eeece7] md:justify-self-end"></div>
        </div>
      </template>

      <!-- 错误 -->
      <p v-else-if="error" class="px-6 py-5 text-[14px] leading-[1.4] text-[#b30000]">节点信息加载失败，请稍后重试。</p>

      <!-- 空 -->
      <p v-else-if="!apiInfo.length" class="px-6 py-5 text-[14px] leading-[1.4] text-[#93939f]">暂无可用节点。</p>

      <!-- 节点列表 -->
      <template v-else>
        <div
          v-for="(node, idx) in sortedNodes"
          :key="node.id"
          class="grid grid-cols-1 gap-2 px-6 py-5 md:grid-cols-[1.1fr_1.8fr_1.4fr_0.8fr_0.7fr] md:items-center md:gap-4"
          :class="{ 'border-b border-[#e5e7eb]': idx < sortedNodes.length - 1 }"
        >
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: dotColor(node.color) }"></span>
            <span class="text-[16px] leading-[1.5] text-[#17171c]">{{ node.route }}</span>
          </div>
          <code class="text-[14px] tracking-[0.28px] text-[#616161] break-all">{{ node.url }}</code>
          <span class="text-[14px] leading-[1.4] text-[#616161]">{{ node.description }}</span>
          <!-- 延迟 -->
          <div class="flex items-center gap-2">
            <template v-if="latency[node.url]?.status === 'pending'">
              <span class="text-[14px] text-[#93939f]">测速中…</span>
            </template>
            <template v-else-if="latency[node.url]?.status === 'timeout'">
              <span class="h-2 w-2 rounded-full bg-[#b30000]"></span>
              <span class="text-[14px] text-[#b30000]">超时</span>
            </template>
            <template v-else-if="latency[node.url]?.status === 'ok'">
              <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: latencyColor(node.url) }"></span>
              <span class="text-[14px] text-[#616161]">{{ latency[node.url].ms }}ms</span>
            </template>
            <span v-else class="text-[14px] text-[#93939f]">—</span>
          </div>
          <div class="md:text-right">
            <button
              class="rounded-[30px] border border-[#d9d9dd] px-3 py-1 text-[12px] text-[#17171c] transition-colors hover:bg-[#eeece7]"
              @click="copy(node.url)"
            >复制</button>
          </div>
        </div>
      </template>
    </div>

    <p class="mt-4 text-[12px] leading-[1.4] text-[#93939f]">
      所有节点共享同一套密钥与额度，可随时切换；延迟为本地浏览器探测的参考值（超时 {{ PING_TIMEOUT }}ms），请选择就近、低延迟的节点。
    </p>
  </section>
</template>
