// 统一消息提示封装
// 基于 Nuxt UI 的 useToast，集中管理样式/图标/时长
// 用法：const message = useMessage()
//   message.success('注册成功')
//   message.error('注册失败', '请稍后重试')
//   message.info('提示', '描述')

export function useMessage() {
  const toast = useToast()

  // 基础方法：统一在这里调整默认样式（duration、图标等）
  function show({ title, description = '', color = 'neutral', icon, duration = 4000 }) {
    return toast.add({
      title,
      description,
      color,
      icon,
      duration
    })
  }

  return {
    show,

    // 成功
    success(title, description = '') {
      return show({ title, description, color: 'success', icon: 'i-lucide-circle-check' })
    },

    // 失败 / 错误
    error(title, description = '') {
      return show({ title, description, color: 'error', icon: 'i-lucide-circle-x' })
    },

    // 警告
    warning(title, description = '') {
      return show({ title, description, color: 'warning', icon: 'i-lucide-triangle-alert' })
    },

    // 普通信息
    info(title, description = '') {
      return show({ title, description, color: 'info', icon: 'i-lucide-info' })
    }
  }
}
