// 注册 vue3-apexcharts 组件（仅客户端，ApexCharts 依赖 window）
import VueApexCharts from 'vue3-apexcharts'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('apexchart', VueApexCharts)
})
