// SQLite 数据库（使用 Node 内置 node:sqlite，无需原生编译）
// 单例连接 + 自动建表，供工单等业务使用

import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

let db = null

// 数据库文件路径（项目根 .data/foundmodel.sqlite）
function dbPath() {
  return resolve(process.cwd(), '.data/foundmodel.sqlite')
}

// 获取单例数据库连接，首次调用时建表
export function useDb() {
  if (db) return db

  const file = dbPath()
  mkdirSync(dirname(file), { recursive: true })
  db = new DatabaseSync(file)

  // 工单表
  db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      username TEXT,
      type TEXT NOT NULL,            -- refund 退款 / usage 使用问题
      status TEXT NOT NULL DEFAULT 'pending', -- pending 待审核 / reviewing 审核中 / processing 处理中 / done 已完成 / rejected 已拒绝
      title TEXT NOT NULL,
      content TEXT,
      -- 退款相关
      subscription_id TEXT,
      subscription_name TEXT,
      alipay_account TEXT,
      alipay_name TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `)

  // 工单回复表（用户与客服/管理员对话）
  db.exec(`
    CREATE TABLE IF NOT EXISTS ticket_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id INTEGER NOT NULL,
      user_id TEXT NOT NULL,
      username TEXT,
      is_staff INTEGER NOT NULL DEFAULT 0,  -- 0 用户 / 1 客服或管理员
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `)

  // 订阅兑换码表
  db.exec(`
    CREATE TABLE IF NOT EXISTS redemption_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      plan_id TEXT NOT NULL,
      plan_name TEXT,
      status TEXT NOT NULL DEFAULT 'unused', -- unused 未使用 / used 已使用
      used_by TEXT,
      used_at INTEGER,
      created_at INTEGER NOT NULL
    )
  `)

  // 兑换失败计数（防撞库：连续失败达上限则锁定）
  db.exec(`
    CREATE TABLE IF NOT EXISTS redemption_attempts (
      user_id TEXT PRIMARY KEY,
      fails INTEGER NOT NULL DEFAULT 0,
      blocked INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL
    )
  `)

  return db
}
