// 复制到剪贴板（兼容非 HTTPS 环境）
// HTTPS / localhost 下用 navigator.clipboard，否则回退到 execCommand
// 用法：const { copy } = useCopy(); await copy(text)

export function useCopy() {
  async function copy(text) {
    if (!text) return false

    // 安全上下文优先用异步剪贴板 API
    if (import.meta.client && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch {
        // 失败则走回退方案
      }
    }

    // 回退：临时 textarea + execCommand（http 也可用）
    if (import.meta.client) {
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.top = '-9999px'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ta.setSelectionRange(0, ta.value.length)
        const ok = document.execCommand('copy')
        document.body.removeChild(ta)
        return ok
      } catch {
        return false
      }
    }

    return false
  }

  return { copy }
}
