// 日志 / 消费记录业务封装
// 对接 NewApi 用户端日志接口

// 获取消费统计（今日花费 / RPM / TPM）
// 入参：{ startTimestamp, endTimestamp, type, modelName, tokenName, group }
// NewApi 接口：GET /api/log/self/stat（携带当前用户 session）
export async function getSelfLogStat(event, {
  startTimestamp,
  endTimestamp,
  type = 0,
  modelName = '',
  tokenName = '',
  group = ''
} = {}) {
  return await newApiUserFetch(event, '/api/log/self/stat', {
    method: 'GET',
    query: {
      type,
      token_name: tokenName,
      model_name: modelName,
      start_timestamp: startTimestamp,
      end_timestamp: endTimestamp,
      group
    }
  })
}

// 入参：{ page, pageSize, startTimestamp, endTimestamp, type, modelName, tokenName }
// NewApi 接口：GET /api/log/self（携带当前用户 session）
export async function getSelfLogs(event, {
  page = 1,
  pageSize = 10,
  startTimestamp,
  endTimestamp,
  type = 0,
  modelName = '',
  tokenName = '',
  group = '',
  requestId = ''
} = {}) {
  return await newApiUserFetch(event, '/api/log/self', {
    method: 'GET',
    query: {
      p: page,
      page_size: pageSize,
      type,
      token_name: tokenName,
      model_name: modelName,
      start_timestamp: startTimestamp,
      end_timestamp: endTimestamp,
      group,
      request_id: requestId
    }
  })
}
