<script setup>
const open = defineModel('open', { type: Boolean, default: false })
const emit = defineEmits(['created'])

const message = useMessage()
const { subscriptions, hasSubscription } = useMySubscription()

const TYPE_USAGE = 'usage'
const TYPE_REFUND = 'refund'

const defaultForm = () => ({
  type: TYPE_USAGE,
  title: '',
  content: '',
  subscriptionId: '',
  alipayAccount: '',
  alipayName: ''
})
const form = reactive(defaultForm())
const submitting = ref(false)

watch(open, (v) => {
  if (v) Object.assign(form, defaultForm())
})

// 订阅下拉项
const subItems = computed(() =>
  subscriptions.value.map((s) => ({
    label: `${s.planName}（${s.id}）`,
    value: String(s.id)
  }))
)

async function submit() {
  if (!form.title.trim()) {
    message.error('请填写标题')
    return
  }
  if (form.type === TYPE_REFUND) {
    if (!form.subscriptionId) { message.error('请选择要退款的订阅'); return }
    if (!form.alipayAccount.trim() || !form.alipayName.trim()) { message.error('请填写支付宝账号与姓名'); return }
  }

  const sub = subscriptions.value.find((s) => String(s.id) === String(form.subscriptionId))

  submitting.value = true
  try {
    await $fetch('/api/tickets', {
      method: 'POST',
      body: {
        type: form.type,
        title: form.title.trim(),
        content: form.content.trim(),
        subscriptionId: form.type === TYPE_REFUND ? form.subscriptionId : '',
        subscriptionName: sub?.planName || '',
        alipayAccount: form.type === TYPE_REFUND ? form.alipayAccount.trim() : '',
        alipayName: form.type === TYPE_REFUND ? form.alipayName.trim() : ''
      }
    })
    message.success('提交成功', '工单已提交，请耐心等待处理')
    open.value = false
    emit('created')
  } catch (err) {
    message.error('提交失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    submitting.value = false
  }
}

const labelClass = 'text-[14px] leading-[1.4] text-[#17171c]'
const fieldUi = { base: 'w-full rounded-[4px] ring-[#d9d9dd] focus-visible:ring-[#9b60aa] focus-visible:ring-1' }
const selectUi = { base: 'w-full rounded-[4px] ring-[#d9d9dd] data-[state=open]:ring-[#9b60aa]', content: 'rounded-[8px]' }
</script>

<template>
  <UModal v-model:open="open" title="提交工单" :ui="{ content: 'max-w-lg' }">
    <template #body>
      <div class="space-y-5">
        <!-- 工单类型 -->
        <div>
          <label :class="labelClass">工单类型 <span class="text-[#b30000]">*</span></label>
          <div class="mt-2 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="rounded-[8px] border px-4 py-3 text-left text-[14px] transition-colors"
              :class="form.type === TYPE_USAGE ? 'border-[#17171c] bg-[#eeece7] text-[#17171c]' : 'border-[#d9d9dd] text-[#616161] hover:bg-[#faf9f7]'"
              @click="form.type = TYPE_USAGE"
            >使用问题</button>
            <button
              type="button"
              class="rounded-[8px] border px-4 py-3 text-left text-[14px] transition-colors"
              :class="form.type === TYPE_REFUND ? 'border-[#17171c] bg-[#eeece7] text-[#17171c]' : 'border-[#d9d9dd] text-[#616161] hover:bg-[#faf9f7]'"
              @click="form.type = TYPE_REFUND"
            >退款申请</button>
          </div>
        </div>

        <!-- 标题 -->
        <div>
          <label :class="labelClass">标题 <span class="text-[#b30000]">*</span></label>
          <UInput v-model="form.title" placeholder="简要描述你的问题" size="lg" class="mt-2 w-full" :ui="fieldUi" />
        </div>

        <!-- 退款专属字段 -->
        <template v-if="form.type === TYPE_REFUND">
          <div>
            <label :class="labelClass">退款订阅 <span class="text-[#b30000]">*</span></label>
            <USelectMenu
              v-if="hasSubscription"
              v-model="form.subscriptionId"
              :items="subItems"
              value-key="value"
              placeholder="选择要退款的订阅"
              size="lg"
              class="mt-2 w-full"
              :ui="selectUi"
            />
            <p v-else class="mt-2 rounded-[4px] bg-[#fff1ec] px-4 py-3 text-[14px] text-[#ff7759]">你当前没有可退款的订阅。</p>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label :class="labelClass">支付宝账号 <span class="text-[#b30000]">*</span></label>
              <UInput v-model="form.alipayAccount" placeholder="手机号 / 邮箱" size="lg" class="mt-2 w-full" :ui="fieldUi" />
            </div>
            <div>
              <label :class="labelClass">支付宝姓名 <span class="text-[#b30000]">*</span></label>
              <UInput v-model="form.alipayName" placeholder="收款人真实姓名" size="lg" class="mt-2 w-full" :ui="fieldUi" />
            </div>
          </div>
          <div class="rounded-[8px] bg-[#eeece7] px-4 py-3 text-[13px] leading-[1.6] text-[#616161]">
            退款仅支持已订购的订阅；审核时效 24 小时，审核通过后处理时效 24 小时，款项原路退回至填写的支付宝账号。
          </div>
        </template>

        <!-- 详细描述 -->
        <div>
          <label :class="labelClass">详细描述</label>
          <UTextarea v-model="form.content" :rows="4" placeholder="请补充问题细节、订单信息等" class="mt-2 w-full" :ui="fieldUi" />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          class="rounded-[30px] border border-[#d9d9dd] px-4 py-2 text-[14px] font-medium text-[#17171c] transition-colors hover:bg-[#eeece7]"
          @click="open = false"
        >取消</button>
        <button
          class="rounded-[32px] bg-[#17171c] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="submitting"
          @click="submit"
        >{{ submitting ? '提交中…' : '提交工单' }}</button>
      </div>
    </template>
  </UModal>
</template>

