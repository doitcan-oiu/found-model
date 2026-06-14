<script setup>
const { announcements, pending, error } = useDashboardStatus()

const PAGE_SIZE = 3
const page = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(announcements.value.length / PAGE_SIZE)))

const pagedAnnouncements = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return announcements.value.slice(start, start + PAGE_SIZE)
})

// 数据变化时若当前页超界则回到第一页
watch(announcements, () => {
  if (page.value > totalPages.value) page.value = 1
})

// 弹窗
const open = ref(false)
const selected = ref(null)
function openDetail(item) {
  selected.value = item
  open.value = true
}

// 格式化日期：ISO -> YYYY-MM-DD
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
</script>

<template>
  <div class="rounded-lg border border-[#e5e7eb] bg-white p-8 lg:col-span-2">
    <div class="flex items-center justify-between">
      <h2 class="text-[24px] leading-[1.3] text-[#17171c]">系统公告</h2>
      <span class="text-[14px] text-[#93939f]">共 {{ announcements.length }} 条</span>
    </div>

    <!-- 加载骨架 -->
    <ul v-if="pending" class="mt-6 divide-y divide-[#e5e7eb]">
      <li v-for="i in 3" :key="i" class="flex items-center gap-4 py-4">
        <span class="h-5 w-10 animate-pulse rounded-full bg-[#eeece7]"></span>
        <div class="h-4 flex-1 animate-pulse rounded bg-[#eeece7]"></div>
        <div class="h-3.5 w-20 animate-pulse rounded bg-[#eeece7]"></div>
      </li>
    </ul>

    <!-- 错误 -->
    <p v-else-if="error" class="mt-6 text-[14px] leading-[1.4] text-[#b30000]">公告加载失败，请稍后重试。</p>

    <!-- 空 -->
    <p v-else-if="!announcements.length" class="mt-6 text-[14px] leading-[1.4] text-[#93939f]">暂无公告。</p>

    <!-- 公告列表（每条一行，超出省略） -->
    <template v-else>
      <ul class="mt-6 divide-y divide-[#e5e7eb]">
        <li
          v-for="item in pagedAnnouncements"
          :key="item.id"
          class="flex cursor-pointer items-center gap-4 py-4 transition-colors hover:bg-[#faf9f7]"
          @click="openDetail(item)"
        >
          <span class="shrink-0 rounded-full bg-[#edfce9] px-2.5 py-0.5 text-[12px] text-[#003c33]">公告</span>
          <p class="flex-1 truncate text-[16px] leading-[1.5] text-[#17171c]">{{ item.content }}</p>
          <span class="shrink-0 text-[14px] text-[#93939f]">{{ formatDate(item.publishDate) }}</span>
        </li>
      </ul>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-end gap-1">
        <button
          class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:text-[#93939f] enabled:hover:bg-[#eeece7]"
          :disabled="page <= 1"
          @click="page--"
        >上一页</button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="rounded-[30px] border px-3.5 py-1.5 text-[14px] transition-colors"
          :class="p === page ? 'border-[#17171c] bg-[#17171c] text-white' : 'border-[#d9d9dd] text-[#17171c] hover:bg-[#eeece7]'"
          @click="page = p"
        >{{ p }}</button>
        <button
          class="rounded-[30px] border border-[#d9d9dd] px-3 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:text-[#93939f] enabled:hover:bg-[#eeece7]"
          :disabled="page >= totalPages"
          @click="page++"
        >下一页</button>
      </div>
    </template>

    <!-- 公告详情弹窗 -->
    <UModal v-model:open="open" :title="'系统公告'">
      <template #body>
        <p v-if="selected" class="mb-3 text-[14px] text-[#93939f]">{{ formatDate(selected.publishDate) }}</p>
        <p v-if="selected" class="whitespace-pre-wrap text-[16px] leading-[1.6] text-[#17171c]">{{ selected.content }}</p>
      </template>
    </UModal>
  </div>
</template>
