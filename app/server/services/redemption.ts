// 订阅兑换码业务（本地 SQLite）

import { randomBytes } from 'node:crypto'
import { useDb } from '../utils/db'

// 生成单个兑换码：FM- + 40 位字符（每 5 位一段，去掉易混字符）
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
function genCode() {
  const len = 40
  const bytes = randomBytes(len)
  let s = ''
  for (let i = 0; i < len; i++) {
    s += ALPHABET[bytes[i] % ALPHABET.length]
    // 每 5 位加一个分隔
    if ((i + 1) % 5 === 0 && i !== len - 1) s += '-'
  }
  return `FM-${s}`
}

// 批量生成兑换码（保证唯一）
export function generateCodes({ planId, planName, count }) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  const insert = db.prepare(`
    INSERT INTO redemption_codes (code, plan_id, plan_name, status, created_at)
    VALUES (?, ?, ?, 'unused', ?)
  `)
  const codes = []
  let attempts = 0
  while (codes.length < count && attempts < count * 20) {
    attempts++
    const code = genCode()
    try {
      insert.run(code, String(planId), planName || '', now)
      codes.push(code)
    } catch {
      // UNIQUE 冲突，重试
    }
  }
  return codes
}

// 一键删除所有兑换码
export function clearAllCodes() {
  const db = useDb()
  const res = db.prepare('DELETE FROM redemption_codes').run()
  return { deleted: res.changes }
}

// 取出未使用的兑换码（用于兑换校验）
export function findUnusedCode(code) {
  return useDb().prepare("SELECT * FROM redemption_codes WHERE code = ? AND status = 'unused'").get(code) || null
}

// 标记兑换码为已使用
export function markCodeUsed(code, userId) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  return db.prepare("UPDATE redemption_codes SET status = 'used', used_by = ?, used_at = ? WHERE code = ? AND status = 'unused'")
    .run(String(userId), now, code)
}

// ---- 防撞库：连续失败锁定 ----
export const MAX_FAILS = 10

// 是否已被锁定
export function isRedeemBlocked(userId) {
  const row = useDb().prepare('SELECT blocked FROM redemption_attempts WHERE user_id = ?').get(String(userId))
  return !!row?.blocked
}

// 记一次失败，达到上限则锁定，返回 { fails, blocked }
export function recordFail(userId) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  const id = String(userId)
  const row = db.prepare('SELECT fails FROM redemption_attempts WHERE user_id = ?').get(id)
  const fails = (row?.fails ?? 0) + 1
  const blocked = fails >= MAX_FAILS ? 1 : 0
  db.prepare(`
    INSERT INTO redemption_attempts (user_id, fails, blocked, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET fails = excluded.fails, blocked = excluded.blocked, updated_at = excluded.updated_at
  `).run(id, fails, blocked, now)
  return { fails, blocked: !!blocked }
}

// 兑换成功后重置计数
export function resetFails(userId) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  db.prepare(`
    INSERT INTO redemption_attempts (user_id, fails, blocked, updated_at)
    VALUES (?, 0, 0, ?)
    ON CONFLICT(user_id) DO UPDATE SET fails = 0, blocked = 0, updated_at = excluded.updated_at
  `).run(String(userId), now)
}
