<script setup>
const title = 'FoundModel - AI编程新时代'
const description = '为开发者提供强大的AI编程助手，提升开发效率，释放创意潜能。智能、安全、易用。'

useSeoMeta({
  title,
  description
})
</script>

<template>
  <div>
    <UApp :toaster="{ position: 'top-right' }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
