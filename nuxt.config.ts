// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/turnstile'
  ],

  // Cloudflare Turnstile（当前用 CF 测试密钥，上线替换为真实密钥）
  // siteKey 可用 NUXT_PUBLIC_TURNSTILE_SITE_KEY 覆盖，secretKey 用 NUXT_TURNSTILE_SECRET_KEY 覆盖
  turnstile: {
    siteKey: '1x00000000000000000000AA'
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // 服务端目录指向 app/server（Nuxt 4 默认在根目录 server/）
  serverDir: 'app/server',

  // 运行时配置：仅服务端可见，可用环境变量覆盖
  // NUXT_NEWAPI_BASE_URL / NUXT_NEWAPI_ACCESS_TOKEN / NUXT_NEWAPI_USER_ID
  runtimeConfig: {
    newapi: {
      baseUrl: 'https://www.openuu.net',
      accessToken: '',
      userId: '',
      // NewApi 登录态使用的 cookie 名（gin sessions 默认 session）
      sessionCookieName: 'session'
    },
    // Turnstile 服务端密钥（当前为 CF 测试密钥，上线用 NUXT_TURNSTILE_SECRET_KEY 覆盖）
    turnstile: {
      secretKey: '1x0000000000000000000000000000000AA'
    }
  },

  ui: {
    fonts: false
  },

  // 预打包 ApexCharts，避免运行时发现依赖导致页面重载
  vite: {
    optimizeDeps: {
      include: ['vue3-apexcharts']
    }
  },

  nitro: {
    // node:sqlite 为 Node 内置模块，标记为外部依赖，避免打包并消除解析警告
    externals: {
      external: ['node:sqlite']
    },
    rollupConfig: {
      external: ['node:sqlite']
    },
    // 关闭服务端 sourcemap，降低构建内存占用
    sourceMap: false
  },

  routeRules: {
    '/': { prerender: true },
    // 仪表盘
    '/dashboard/**': { appLayout: 'dashboard' },
    // 注册登录
    '/auth/**': { appLayout: 'auth' },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
