<script setup>
const open = defineModel('open', { type: Boolean, default: false })
const emit = defineEmits(['created'])

const message = useMessage()

// 默认分组哨兵值（USelectMenu 不允许空字符串值）
const NO_GROUP = '__default__'

const defaultForm = () => ({
  name: '',
  neverExpire: true,
  expireAt: '',
  count: 1,
  group: NO_GROUP,
  // 折叠项
  unlimitedQuota: true,
  remainAmount: 0,
  modelLimitsEnabled: false,
  modelLimits: '',
  allowIps: '',
  crossGroupRetry: false
})

const form = reactive(defaultForm())
const advancedOpen = ref(false)
const submitting = ref(false)

// 可用分组（弹窗打开时按需加载一次）
const { data: groupRes, execute: loadGroups, status: groupStatus } = await useFetch('/api/user/self/groups', {
  key: 'user-groups',
  immediate: false,
  lazy: true,
  server: false
})

const groupOptions = computed(() => {
  const obj = groupRes.value?.data ?? {}
  return Object.entries(obj).map(([name, info]) => ({
    name,
    desc: info?.desc || '',
    ratio: info?.ratio
  }))
})

// USelectMenu 选项（含标题、倍率、描述）
const groupItems = computed(() => [
  { label: '默认分组', value: NO_GROUP, ratio: null, desc: '使用账户默认分组' },
  ...groupOptions.value.map((g) => ({
    label: g.name,
    value: g.name,
    ratio: g.ratio,
    desc: g.desc
  }))
])

// 选中分组的描述
const selectedGroupDesc = computed(() => {
  return groupOptions.value.find((g) => g.name === form.group)?.desc || ''
})

// 弹窗打开时重置表单并加载分组
watch(open, (v) => {
  if (v) {
    Object.assign(form, defaultForm())
    advancedOpen.value = false
    if (groupStatus.value === 'idle') loadGroups()
  }
})

async function submit() {
  if (!form.name.trim()) {
    message.error('请填写名称', '令牌名称不能为空')
    return
  }
  if (!form.neverExpire && !form.expireAt) {
    message.error('请选择过期时间', '或勾选“永不过期”')
    return
  }

  let expiredTime = -1
  if (!form.neverExpire) {
    expiredTime = Math.floor(new Date(form.expireAt).getTime() / 1000)
  }

  const remainQuota = form.unlimitedQuota ? 0 : Math.round(Number(form.remainAmount || 0) * 500000)
  const group = form.group === NO_GROUP ? '' : form.group

  submitting.value = true
  try {
    await $fetch('/api/token', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        count: Number(form.count) || 1,
        expired_time: expiredTime,
        unlimited_quota: form.unlimitedQuota,
        remain_quota: remainQuota,
        remain_amount: Number(form.remainAmount || 0),
        group,
        model_limits_enabled: form.modelLimitsEnabled,
        model_limits: form.modelLimits || '',
        allow_ips: form.allowIps || '',
        cross_group_retry: form.crossGroupRetry
      }
    })
    message.success('创建成功', `已创建 ${form.count} 个令牌`)
    open.value = false
    emit('created')
  } catch (err) {
    message.error('创建失败', err?.data?.data?.message || err?.data?.message || '请稍后重试')
  } finally {
    submitting.value = false
  }
}

const labelClass = 'text-[14px] leading-[1.4] text-[#17171c]'
// 统一表单控件样式（设计稿：4px 圆角、#d9d9dd 边框、紫色 focus）
const fieldUi = { base: 'w-full rounded-[4px] ring-[#d9d9dd] focus-visible:ring-[#9b60aa] focus-visible:ring-1' }
const selectUi = {
  base: 'w-full rounded-[4px] ring-[#d9d9dd] data-[state=open]:ring-[#9b60aa]',
  content: 'rounded-[8px]'
}
</script>

<template>
  <UModal v-model:open="open" title="创建令牌" :ui="{ content: 'max-w-lg' }">
    <template #body>
      <div class="space-y-5">
        <!-- 名称 -->
        <div>
          <label class="flex" :class="labelClass">名称 <span class="ml-1 text-[#b30000]">*</span></label>
          <UInput v-model="form.name" placeholder="例如：生产环境" size="lg" class="mt-2 w-full" :ui="fieldUi" />
        </div>

        <!-- 令牌分组（单独一行，在上方） -->
        <div>
          <label :class="labelClass">令牌分组</label>
          <USelectMenu
            v-model="form.group"
            :items="groupItems"
            value-key="value"
            placeholder="默认分组"
            size="lg"
            class="mt-2 w-full"
            :ui="selectUi"
          >
            <template #item="{ item }">
              <div class="flex w-full flex-col gap-0.5 py-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-[14px] font-medium text-[#17171c]">{{ item.label }}</span>
                  <span v-if="item.ratio != null" class="rounded-full bg-[#edfce9] px-2 py-0.5 text-[11px] leading-none text-[#003c33]">{{ item.ratio }}x</span>
                </div>
                <span v-if="item.desc" class="text-[12px] leading-[1.4] text-[#93939f]">{{ item.desc }}</span>
              </div>
            </template>
          </USelectMenu>
          <p v-if="selectedGroupDesc" class="mt-1.5 text-[12px] leading-[1.4] text-[#93939f]">{{ selectedGroupDesc }}</p>
        </div>

        <!-- 过期时间 + 新建数量（PC 同行） -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- 过期时间 -->
          <div>
            <label :class="labelClass">过期时间 <span class="text-[#b30000]">*</span></label>
            <div class="mt-2 space-y-2">
              <UCheckbox v-model="form.neverExpire" label="永不过期" :ui="{ label: 'text-[14px] text-[#616161]' }" />
              <UInput
                v-model="form.expireAt"
                type="datetime-local"
                size="lg"
                :disabled="form.neverExpire"
                class="w-full"
                :ui="fieldUi"
              />
            </div>
          </div>
          <!-- 新建数量 -->
          <div>
            <label :class="labelClass">新建数量 <span class="text-[#b30000]">*</span></label>
            <UInput v-model.number="form.count" type="number" :min="1" :max="100" size="lg" class="mt-2 w-full" :ui="fieldUi" />
          </div>
        </div>

        <!-- 折叠：高级设置 -->
        <div class="rounded-[8px] border border-[#e5e7eb]">
          <button
            type="button"
            class="flex w-full items-center justify-between px-4 py-3 text-[14px] text-[#17171c]"
            @click="advancedOpen = !advancedOpen"
          >
            <span>高级设置</span>
            <span class="text-[#93939f] transition-transform" :class="{ 'rotate-45': advancedOpen }">+</span>
          </button>

          <div v-show="advancedOpen" class="space-y-5 border-t border-[#e5e7eb] px-4 py-4">
            <!-- 额度 -->
            <div>
              <UCheckbox v-model="form.unlimitedQuota" label="无限额度" :ui="{ label: 'text-[14px] text-[#616161]' }" />
              <div v-if="!form.unlimitedQuota" class="mt-3">
                <label :class="labelClass">额度（$）</label>
                <UInput v-model.number="form.remainAmount" type="number" :min="0" :step="0.01" placeholder="0.00" size="lg" class="mt-2 w-full" :ui="fieldUi" />
              </div>
            </div>

            <!-- IP 白名单 -->
            <div>
              <label :class="labelClass">IP 白名单</label>
              <UInput v-model="form.allowIps" placeholder="选填，多个用英文逗号分隔" size="lg" class="mt-2 w-full" :ui="fieldUi" />
            </div>

            <!-- 模型限制 -->
            <div>
              <UCheckbox v-model="form.modelLimitsEnabled" label="启用模型限制" :ui="{ label: 'text-[14px] text-[#616161]' }" />
              <UInput
                v-if="form.modelLimitsEnabled"
                v-model="form.modelLimits"
                placeholder="允许的模型名，多个用英文逗号分隔"
                size="lg"
                class="mt-2 w-full"
                :ui="fieldUi"
              />
            </div>

            <!-- 跨组重试 -->
            <UCheckbox v-model="form.crossGroupRetry" label="允许跨分组重试" :ui="{ label: 'text-[14px] text-[#616161]' }" />
          </div>
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
        >{{ submitting ? '创建中…' : '创建' }}</button>
      </div>
    </template>
  </UModal>
</template>
