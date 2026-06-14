// 注册接口
// POST /api/auth/register
// 接收前端表单，校验后调用 NewApi 创建用户

import { createUser } from '../../services/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, password, confirmPassword, token } = body || {}

  // 人机验证
  if (!token) {
    apiError('请完成人机验证')
  }
  const captcha = await verifyTurnstileToken(token, event)
  if (!captcha.success) {
    apiError('人机验证未通过，请重试')
  }

  // 基础校验
  if (!username || !password) {
    apiError('账号和密码不能为空')
  }
  if (password.length < 8) {
    apiError('密码至少 8 位')
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    apiError('两次输入的密码不一致')
  }

  // 创建用户：邮箱暂存到备注，display_name 默认用账号
  const data = await createUser({
    username,
    password,
    displayName: username,
    remark: email || ''
  })

  return apiSuccess(data, '注册成功')
})
