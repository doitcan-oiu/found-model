<script setup>
const message = useMessage()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const token = ref('')
const turnstile = ref()

async function onSubmit() {
  if (form.password !== form.confirmPassword) {
    message.error('密码不一致', '两次输入的密码不一致')
    return
  }
  if (!token.value) {
    message.error('请完成人机验证')
    return
  }

  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        token: token.value
      }
    })
    message.success('注册成功', '正在跳转登录…')
    setTimeout(() => navigateTo('/auth/login'), 1000)
  } catch (err) {
    const msg = err?.data?.data?.message || err?.data?.message || '注册失败，请稍后重试'
    message.error('注册失败', msg)
    // 验证 token 单次有效，失败后重置
    turnstile.value?.reset()
    token.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-[#212121] antialiased">
    <div class="w-full max-w-md">
      <!-- 标题 -->
      <div class="text-center">
        <h1 class="text-[32px] leading-[1.2] tracking-[-0.32px] text-[#17171c]">创建账号</h1>
        <p class="mt-2 text-[16px] leading-[1.5] text-[#616161]">注册以开始使用大模型中转服务</p>
      </div>

      <!-- 表单卡片 -->
      <div class="mt-8 rounded-lg border border-[#e5e7eb] bg-white p-8">
        <form class="space-y-5" @submit.prevent="onSubmit">
          <!-- 账号 -->
          <div>
            <label for="account" class="text-[14px] leading-[1.4] text-[#17171c]">账号</label>
            <input
              id="account"
              v-model="form.username"
              type="text"
              autocomplete="username"
              placeholder="请输入账号"
              class="mt-2 w-full rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
            />
          </div>

          <!-- 邮箱 -->
          <div>
            <label for="email" class="text-[14px] leading-[1.4] text-[#17171c]">邮箱</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="mt-2 w-full rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
            />
          </div>

          <!-- 密码 -->
          <div>
            <label for="password" class="text-[14px] leading-[1.4] text-[#17171c]">密码</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              placeholder="请输入密码"
              class="mt-2 w-full rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
            />
            <p class="mt-2 text-[12px] leading-[1.4] text-[#93939f]">至少 8 位，包含字母与数字</p>
          </div>

          <!-- 确认密码 -->
          <div>
            <label for="confirm-password" class="text-[14px] leading-[1.4] text-[#17171c]">确认密码</label>
            <input
              id="confirm-password"
              v-model="form.confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="请再次输入密码"
              class="mt-2 w-full rounded-[4px] border border-[#d9d9dd] px-4 py-3 text-[16px] leading-[1.5] text-[#212121] placeholder:text-[#93939f] focus:border-[#9b60aa] focus:outline-none"
            />
          </div>

          <!-- 人机验证（预留固定尺寸，加载时显示骨架，避免页面跳动） -->
          <div class="flex justify-center">
            <div class="relative h-[65px] w-[300px]">
              <div class="absolute inset-0 animate-pulse rounded-[4px] bg-[#eeece7]"></div>
              <NuxtTurnstile
                ref="turnstile"
                v-model="token"
                class="relative"
                :options="{ appearance: 'always', theme: 'light', language: 'zh-cn' }"
              />
            </div>
          </div>

          <!-- 提交 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-[32px] bg-[#17171c] px-6 py-3 text-[14px] font-medium leading-[1.71] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ loading ? '注册中…' : '注册' }}
          </button>
        </form>

        <!-- 协议 -->
        <p class="mt-4 text-center text-[12px] leading-[1.4] text-[#93939f]">
          注册即表示同意
          <a href="#" class="text-[#1863dc] underline-offset-2 hover:underline">服务条款</a>
          与
          <a href="#" class="text-[#1863dc] underline-offset-2 hover:underline">隐私政策</a>
        </p>
      </div>

      <!-- 登录入口 -->
      <p class="mt-6 text-center text-[14px] leading-[1.4] text-[#616161]">
        已有账号？
        <NuxtLink to="/auth/login" class="text-[#1863dc] underline-offset-2 hover:underline">立即登录</NuxtLink>
      </p>
    </div>
  </div>
</template>
