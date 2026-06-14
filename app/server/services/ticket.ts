// 工单业务封装（基于本地 SQLite）

import { useDb } from '../utils/db'

// 创建工单
// 入参：{ userId, username, type, title, content, subscriptionId, subscriptionName, alipayAccount, alipayName }
export function createTicket(data) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  const stmt = db.prepare(`
    INSERT INTO tickets
      (user_id, username, type, status, title, content, subscription_id, subscription_name, alipay_account, alipay_name, created_at, updated_at)
    VALUES
      (?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const res = stmt.run(
    String(data.userId),
    data.username || '',
    data.type,
    data.title,
    data.content || '',
    data.subscriptionId || null,
    data.subscriptionName || null,
    data.alipayAccount || null,
    data.alipayName || null,
    now,
    now
  )
  return { id: Number(res.lastInsertRowid) }
}

// 当前用户工单列表（分页）
export function listTickets(userId, { page = 1, pageSize = 10 } = {}) {
  const db = useDb()
  const offset = (page - 1) * pageSize

  const total = db.prepare('SELECT COUNT(*) AS c FROM tickets WHERE user_id = ?').get(String(userId))?.c ?? 0
  const items = db.prepare(`
    SELECT * FROM tickets WHERE user_id = ?
    ORDER BY id DESC LIMIT ? OFFSET ?
  `).all(String(userId), pageSize, offset)

  return { items, total, page, page_size: pageSize }
}

// 全部工单列表（管理端，分页，可按状态筛选）
export function listAllTickets({ page = 1, pageSize = 10, status = '' } = {}) {
  const db = useDb()
  const offset = (page - 1) * pageSize

  if (status) {
    const total = db.prepare('SELECT COUNT(*) AS c FROM tickets WHERE status = ?').get(status)?.c ?? 0
    const items = db.prepare('SELECT * FROM tickets WHERE status = ? ORDER BY id DESC LIMIT ? OFFSET ?').all(status, pageSize, offset)
    return { items, total, page, page_size: pageSize }
  }
  const total = db.prepare('SELECT COUNT(*) AS c FROM tickets').get()?.c ?? 0
  const items = db.prepare('SELECT * FROM tickets ORDER BY id DESC LIMIT ? OFFSET ?').all(pageSize, offset)
  return { items, total, page, page_size: pageSize }
}

// 更新工单状态（管理端）
export function updateTicketStatus(id, status) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  const res = db.prepare('UPDATE tickets SET status = ?, updated_at = ? WHERE id = ?').run(status, now, Number(id))
  return { changes: res.changes }
}

// 取单个工单
export function getTicket(id) {
  return useDb().prepare('SELECT * FROM tickets WHERE id = ?').get(Number(id)) || null
}

// 工单回复列表（按时间正序）
export function listReplies(ticketId) {
  return useDb().prepare('SELECT * FROM ticket_replies WHERE ticket_id = ? ORDER BY id ASC').all(Number(ticketId))
}

// 新增回复
// 入参：{ ticketId, userId, username, isStaff, content }
export function addReply(data) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  const res = db.prepare(`
    INSERT INTO ticket_replies (ticket_id, user_id, username, is_staff, content, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(Number(data.ticketId), String(data.userId), data.username || '', data.isStaff ? 1 : 0, data.content, now)
  // 触碰工单更新时间
  db.prepare('UPDATE tickets SET updated_at = ? WHERE id = ?').run(now, Number(data.ticketId))
  return { id: Number(res.lastInsertRowid) }
}

