<script setup>
const { user } = useAuth()
const message = useMessage()
const isRoot = computed(() => Number(user.value?.role) >= 100)

// 套餐列表（复用同 key）
const { data: planRes } = await useFetch('/api/subscription/plans', {
  key: 'subscription-plans',
  lazy: true,
  server: false
})
const planItems = computed(() =>
  (planRes.value?.data ?? []).map((item) => {
    const p = item.plan || item
    const [name] = (p.title || '').split('#')
    return { label: name || p.title, value: String(p.id) }
  })
)

const form = reactive({ planId: '', count: 10 })
const generating = ref(false)
const clearing = ref(false)

function download(codes, planName) {
  const text = codes.join('\n')
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `兑换码_${planName || form.planId}_${codes.length}个_${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function generate() {
  if (!form.planId) { message.error('请选择订阅套餐'); return }
  const count = Number(form.count) || 0
  if (count < 1) { message.error('数量至少为 1'); return }

  const planName = planItems.value.find((p) => p.value === form.planId)?.label || ''
  generating.value = true
  try {
    const res = await $fetch('/api/subscription/codes', {
      method: 'POST',
      body: { planId: form.planId, planName, count }
    })
    const codes = res.data.codes || []
    download(codes, planName)
    message.success('生成成功', `已生成 ${codes.length} 个兑换码并导出`)
  } catch (err) {
    message.error('生成失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    generating.value = false
  }
}

const confirmOpen = ref(false)
async function clearAll() {
  clearing.value = true
  try {
    const res = await $fetch('/api/subscription/codes', { method: 'DELETE' })
    message.success('已清空', res.message)
    confirmOpen.value = false
  } catch (err) {
    message.error('删除失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    clearing.value = false
  }
}

const fieldUi = { base: 'w-full rounded-[4px] ring-[#d9d9dd] focus-visible:ring-[#9b60aa] focus-visible:ring-1' }
const selectUi = { base: 'w-full rounded-[4px] ring-[#d9d9dd] data-[state=open]:ring-[#9b60aa]', content: 'rounded-[8px]' }
</script>

<template>
  <section v-if="isRoot" class="rounded-lg border border-[#17171c] bg-[#003c33] p-8 text-white">
    <div class="flex items-center justify-between">
      <h2 class="text-[24px] leading-[1.3] text-white">生成兑换码</h2>
      <span class="rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">管理员</span>
    </div>
    <p class="mt-2 text-[14px] leading-[1.5] text-[#edfce9]">选择套餐与数量，生成后自动导出为 txt 文件。</p>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
      <div>
        <label class="text-[14px] text-[#edfce9]">订阅套餐</label>
        <USelectMenu
          v-model="form.planId"
          :items="planItems"
          value-key="value"
          placeholder="选择套餐"
          size="lg"
          class="mt-2 w-full"
          :ui="selectUi"
        />
      </div>
      <div>
        <label class="text-[14px] text-[#edfce9]">生成数量</label>
        <UInput v-model.number="form.count" type="number" :min="1" :max="1000" size="lg" class="mt-2 w-full" :ui="fieldUi" />
      </div>
      <button
        class="h-[42px] shrink-0 rounded-[32px] bg-white px-6 text-[14px] font-medium text-[#17171c] transition-colors hover:bg-[#eeece7] disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="generating"
        @click="generate"
      >{{ generating ? '生成中…' : '生成并导出' }}</button>
    </div>

    <div class="mt-6 flex items-center justify-between border-t border-white/20 pt-5">
      <p class="text-[13px] text-[#edfce9]">危险操作：清空将删除所有未使用与已使用的兑换码记录。</p>
      <button
        class="shrink-0 rounded-[30px] border border-white/30 px-4 py-2 text-[14px] text-white transition-colors hover:bg-white/10"
        @click="confirmOpen = true"
      >一键删除所有兑换码</button>
    </div>

    <!-- 删除确认 -->
    <UModal v-model:open="confirmOpen" title="删除所有兑换码">
      <template #body>
        <p class="text-[16px] leading-[1.6] text-[#17171c]">确定要删除全部兑换码吗？此操作不可恢复，已发出的兑换码将立即失效。</p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <button class="rounded-[30px] border border-[#d9d9dd] px-4 py-2 text-[14px] font-medium text-[#17171c] transition-colors hover:bg-[#eeece7]" @click="confirmOpen = false">取消</button>
          <button
            class="rounded-[32px] bg-[#b30000] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#8f0000] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="clearing"
            @click="clearAll"
          >{{ clearing ? '删除中…' : '确认删除' }}</button>
        </div>
      </template>
    </UModal>
  </section>
</template>
