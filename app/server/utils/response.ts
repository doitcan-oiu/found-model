// 统一响应工具
// 让所有接口返回一致的结构：{ success, message, data }

// 成功响应
export function apiSuccess(data = null, message = 'ok') {
  return {
    success: true,
    message,
    data
  }
}

// 失败响应：抛出 H3 错误，由 Nitro 统一处理
// statusCode 默认 400，data 里携带业务结构方便前端识别
export function apiError(message = '请求失败', statusCode = 400, data = null) {
  throw createError({
    statusCode,
    statusMessage: message,
    data: {
      success: false,
      message,
      data
    }
  })
}
