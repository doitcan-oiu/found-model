// 数据统计相关业务封装
// 对接 NewApi 数据接口

// 获取指定用户的用量统计（按小时聚合）- 管理端
// 入参：{ username, startTimestamp, endTimestamp, defaultTime }
// NewApi 接口：GET /api/data/  （管理端，需 Access Token）
export async function getUserData({ username, startTimestamp, endTimestamp, defaultTime = 'hour' }) {
  return await newApiFetch('/api/data/', {
    method: 'GET',
    query: {
      username,
      start_timestamp: startTimestamp,
      end_timestamp: endTimestamp,
      default_time: defaultTime
    }
  })
}

// 获取当前用户的用量统计 - 用户端
// 入参：{ startTimestamp, endTimestamp, defaultTime }
// NewApi 接口：GET /api/data/self（携带当前用户 session）
export async function getSelfData(event, { startTimestamp, endTimestamp, defaultTime = 'hour' }) {
  return await newApiUserFetch(event, '/api/data/self', {
    method: 'GET',
    query: {
      start_timestamp: startTimestamp,
      end_timestamp: endTimestamp,
      default_time: defaultTime
    }
  })
}
