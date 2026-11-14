import { type NextRequest, NextResponse } from "next/server"
import { getNews, getNewsBySlug } from "@/lib/db"
import { syncTelegramToDatabase, getTelegramSyncLog } from "@/lib/telegram"

// Cache invalidation threshold: 10 minutes (600,000 ms)
const AUTO_SYNC_INTERVAL_MS = 10 * 60 * 1000
let isSyncing = false

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const category = searchParams.get("category")
  const status = searchParams.get("status") || "published"
  const source = searchParams.get("source") || "all" // "telegram", "official", "all"
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "12", 10)

  // Single post lookup
  if (slug) {
    const item = getNewsBySlug(slug)
    if (!item) {
      return NextResponse.json({ success: false, error: "News item not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: item })
  }

  // Automatic background update from https://t.me/s/Urganch_IMI
  // Triggers periodically if last sync was > 10 minutes ago
  const syncLog = getTelegramSyncLog()
  const timeSinceLastSync = Date.now() - new Date(syncLog.lastSync).getTime()
  if (timeSinceLastSync > AUTO_SYNC_INTERVAL_MS && !isSyncing) {
    isSyncing = true
    syncTelegramToDatabase(2)
      .catch((err) => console.error("[Auto Telegram Sync Error]:", err))
      .finally(() => {
        isSyncing = false
      })
  }

  let news = getNews(status as any)

  // Filter by category
  if (category && category !== "all") {
    news = news.filter((n) => n.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by source
  if (source === "telegram") {
    news = news.filter((n) => !!n.telegramMessageId || !!n.telegramPostUrl)
  } else if (source === "official") {
    news = news.filter((n) => !n.telegramMessageId && !n.telegramPostUrl)
  }

  // Sort descending by date (most recent first)
  news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const total = news.length
  const totalPages = Math.ceil(total / limit) || 1
  const startIndex = (page - 1) * limit
  const paginatedData = news.slice(startIndex, startIndex + limit)

  return NextResponse.json({
    success: true,
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
    data: paginatedData,
  })
}
