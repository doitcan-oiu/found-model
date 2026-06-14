<script setup>
// 使用教程：按协议（Anthropic / OpenAI / Gemini）分组的客户端配置
// 基础地址来自「节点信息」(/api/status 的 api_info)，可切换

const { apiInfo, pending: nodePending } = useDashboardStatus()

// 节点选项；默认选第一个，无节点时回退占位
const FALLBACK = 'https://your-node.example.com'
const selectedNode = ref('')
watch(apiInfo, (list) => {
  if (list.length && !selectedNode.value) selectedNode.value = list[0].url
}, { immediate: true })

const BASE = computed(() => selectedNode.value || FALLBACK)

const { copy } = useCopy()
const message = useMessage()
async function copyText(text) {
  const ok = await copy(text)
  if (ok) message.success('已复制')
  else message.error('复制失败', '请手动复制')
}

const protocols = [
  { key: 'anthropic', label: 'Anthropic 协议', path: '/v1/messages' },
  { key: 'openai', label: 'OpenAI 协议', path: '/v1/chat/completions' },
  { key: 'gemini', label: 'Gemini 协议', path: '/v1beta/models' }
]
const activeProtocol = ref('anthropic')

// 各协议下的工具配置（base 为当前选中节点地址）
const guides = computed(() => {
  const base = BASE.value
  return {
    anthropic: [
      {
        tool: 'Claude Code',
        desc: '设置环境变量后启动 claude，即可走本平台的 Anthropic 接口。',
        code: `export ANTHROPIC_BASE_URL="${base}"
export ANTHROPIC_AUTH_TOKEN="sk-xxxxxxxxxxxx"
claude`
      },
      {
        tool: 'Cline / Kilo Code（Anthropic 模式）',
        desc: 'API Provider 选择 Anthropic，填入下方地址与密钥。',
        code: `API Provider: Anthropic
Base URL: ${base}
API Key: sk-xxxxxxxxxxxx
Model: claude-opus-4-8`
      }
    ],
    openai: [
      {
        tool: 'Codex CLI',
        desc: '编辑 ~/.codex/config.toml，新增自定义 provider 并指向本平台。',
        code: `model = "gpt-5.4"
model_provider = "foundmodel"

[model_providers.foundmodel]
name = "FoundModel"
base_url = "${base}/v1"
env_key = "FOUNDMODEL_API_KEY"
wire_api = "chat"`
      },
      {
        tool: 'Cline / Kilo Code',
        desc: 'API Provider 选择 “OpenAI Compatible”，填入地址与密钥。',
        code: `API Provider: OpenAI Compatible
Base URL: ${base}/v1
API Key: sk-xxxxxxxxxxxx
Model ID: gpt-5.4`
      },
      {
        tool: 'OpenCode',
        desc: '在 opencode.json 中以 OpenAI 兼容方式声明 provider。',
        code: `{
  "provider": {
    "foundmodel": {
      "npm": "@ai-sdk/openai-compatible",
      "options": { "baseURL": "${base}/v1", "apiKey": "sk-xxxxxxxxxxxx" },
      "models": { "gpt-5.4": {} }
    }
  }
}`
      },
      {
        tool: '通用 OpenAI SDK',
        desc: '任何兼容 OpenAI 的库，替换 base_url 与 api_key 即可。',
        code: `from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxxxxxxxxxx",
    base_url="${base}/v1"
)
resp = client.chat.completions.create(
    model="gpt-5.4",
    messages=[{"role": "user", "content": "你好"}]
)`
      }
    ],
    gemini: [
      {
        tool: 'Gemini CLI / OpenAI 兼容',
        desc: 'Gemini 原生接口走 /v1beta，多数客户端用 OpenAI 兼容端点更省事。',
        code: `export GEMINI_API_KEY="sk-xxxxxxxxxxxx"
export GOOGLE_GEMINI_BASE_URL="${base}"
# 或在支持 OpenAI 兼容的客户端中：
# Base URL: ${base}/v1
# Model: gemini-3-pro`
      }
    ]
  }
})

const currentGuides = computed(() => guides.value[activeProtocol.value] || [])
const currentPath = computed(() => protocols.find((p) => p.key === activeProtocol.value)?.path)
</script>

<template>
  <section>
    <h2 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">使用教程</h2>
    <p class="mt-3 max-w-2xl text-[16px] leading-[1.5] text-[#616161]">
      在「接口密钥」创建密钥，结合「节点信息」选择就近接入地址，按所用工具的协议填入下方配置即可。
    </p>

    <!-- 接入节点选择 -->
    <div class="mt-6">
      <label class="text-[14px] leading-[1.4] text-[#17171c]">接入节点</label>
      <div v-if="apiInfo.length" class="mt-2 flex flex-wrap gap-2">
        <button
          v-for="node in apiInfo"
          :key="node.id"
          class="rounded-[30px] border px-4 py-2 text-[14px] leading-[1.71] transition-colors"
          :class="node.url === selectedNode
            ? 'border-[#17171c] bg-[#17171c] text-white'
            : 'border-[#d9d9dd] bg-transparent text-[#17171c] hover:bg-[#eeece7]'"
          @click="selectedNode = node.url"
        >{{ node.route }}</button>
      </div>
      <p v-else-if="nodePending" class="mt-2 text-[14px] text-[#93939f]">加载节点中…</p>
      <p v-else class="mt-2 text-[14px] text-[#93939f]">暂无可用节点，请前往「仪表盘 - 节点信息」查看。</p>
      <p class="mt-2 text-[13px] text-[#93939f]">当前接入地址：<code class="text-[#616161]">{{ BASE }}</code></p>
    </div>

    <!-- 协议切换 -->
    <div class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="p in protocols"
        :key="p.key"
        class="rounded-[30px] border px-4 py-2 text-[14px] font-medium leading-[1.71] transition-colors"
        :class="p.key === activeProtocol
          ? 'border-[#17171c] bg-[#17171c] text-white'
          : 'border-[#d9d9dd] bg-transparent text-[#17171c] hover:bg-[#eeece7]'"
        @click="activeProtocol = p.key"
      >{{ p.label }}</button>
    </div>

    <!-- 接口路径提示 -->
    <p class="mt-4 text-[13px] text-[#93939f]">
      接口路径：<code class="text-[#616161]">{{ currentPath }}</code>
    </p>

    <!-- 工具配置卡片 -->
    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div
        v-for="g in currentGuides"
        :key="g.tool"
        class="flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-6"
      >
        <h3 class="text-[18px] leading-[1.4] text-[#17171c]">{{ g.tool }}</h3>
        <p class="mt-1 text-[14px] leading-[1.5] text-[#616161]">{{ g.desc }}</p>
        <div class="relative mt-4 flex-1">
          <button
            class="absolute right-3 top-3 rounded-[30px] border border-white/20 bg-white/10 px-2.5 py-1 text-[12px] text-[#edfce9] transition-colors hover:bg-white/20"
            @click="copyText(g.code)"
          >复制</button>
          <pre class="h-full overflow-x-auto rounded-[8px] bg-[#17171c] p-5 pr-16 text-[13px] leading-[1.6] text-[#edfce9]"><code>{{ g.code }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
