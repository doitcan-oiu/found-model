// 当前用户消费统计（今日花费 / RPM / TPM）
// GET /api/log/self/stat?start_timestamp=&end_timestamp=
// 用当前登录会话向 NewApi 请求

import { getSelfLogStat } from '../../../services/log'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)

  const data = await getSelfLogStat(event, {
    startTimestamp: Number(q.start_timestamp) || 0,
    endTimestamp: Number(q.end_timestamp) || 0,
    modelName: q.model_name || '',
    tokenName: q.token_name || '',
    group: q.group || ''
  })

  return apiSuccess(data ?? { quota: 0, rpm: 0, tpm: 0 })
})
