import fs from "fs"
import path from "path"
import { ApplicationItem, NewsItem } from "./types"
import { saveNewsItem, getNews } from "./db"

// Server-side only Telegram integration
export interface TelegramPost {
  id: number
  text: string
  title: string
  excerpt: string
  date: string
  imageUrl?: string
  videoUrl?: string
  postUrl: string
  category: NewsItem["category"]
}

export interface TelegramSyncLog {
  lastSync: string
  status: "success" | "error" | "running"
  totalImported: number
  newItems: number
  lastCheckedPostId?: number
  channelUrl: string
  errorLogs: string[]
}

const LOG_FILE = path.join(process.cwd(), "lib", "data", "telegram-sync-log.json")

/**
 * Read the current Telegram sync log from disk
 */
export function getTelegramSyncLog(): TelegramSyncLog {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const content = fs.readFileSync(LOG_FILE, "utf-8")
      return JSON.parse(content)
    }
  } catch (err) {
    console.error("[Telegram Log] Read error:", err)
  }

  return {
    lastSync: new Date(0).toISOString(),
    status: "success",
    totalImported: 0,
    newItems: 0,
    channelUrl: "https://t.me/s/Urganch_IMI",
    errorLogs: [],
  }
}

/**
 * Save sync status and error logs
 */
export function saveTelegramSyncLog(log: TelegramSyncLog) {
  try {
    const dir = path.dirname(LOG_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2), "utf-8")
  } catch (err) {
    console.error("[Telegram Log] Save error:", err)
  }
}

/**
 * Smart title extraction from Telegram text
 * Strips hashtags and social links, finding the first real headline line.
 */
function extractSmartTitle(text: string): string {
  if (!text) return "Urganch 1-IMI Yangiligi"

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  for (const line of lines) {
    // Skip hashtag-only lines
    if (line.startsWith("#")) continue
    // Skip social media handles
    if (line.includes("Telegram") && (line.includes("Facebook") || line.includes("Instagram") || line.includes("Youtube"))) continue
    if (line.startsWith("📲") || line.startsWith("🌐") || line.startsWith("🎞")) continue
    // Skip greetings like "Assalomu aleykum" or "Xayrli tong" if better subject lines exist
    const lower = line.toLowerCase()
    if (lower.startsWith("assalomu") || lower.startsWith("xayrli tong") || lower.startsWith("xayrli kun")) continue

    // Skip single words or super short lines
    if (line.length >= 10 && !line.startsWith("http")) {
      return line.length > 130 ? line.slice(0, 127) + "..." : line
    }
  }

  // fallback to first non-hashtag, non-social line >= 8 chars
  const nonHash = lines.find(
    (l) => !l.startsWith("#") && !l.includes("Facebook") && !l.includes("Instagram") && l.length >= 8
  )
  if (nonHash) {
    return nonHash.length > 130 ? nonHash.slice(0, 127) + "..." : nonHash
  }

  return "Urganch 1-IMI Yangiligi"
}

function cleanExcerpt(text: string): string {
  if (!text) return ""
  const meaningfulLines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => {
      if (l.startsWith("#")) return false
      if (l.includes("Telegram") && (l.includes("Facebook") || l.includes("Instagram") || l.includes("Youtube"))) return false
      if (l.startsWith("📲") || l.startsWith("🌐") || l.startsWith("🎞")) return false
      return l.length > 0
    })
  const combined = meaningfulLines.join("\n").trim()
  return combined.length > 240 ? combined.substring(0, 237) + "..." : combined
}

/**
 * Smart categorization based on keywords
 */
function detectCategory(text: string): NewsItem["category"] {
  const lower = text.toLowerCase()
  if (lower.includes("olimpiada") || lower.includes("medal") || lower.includes("sovrindor") || lower.includes("o'rin")) {
    return "Olimpiada"
  }
  if (lower.includes("yutuq") || lower.includes("grant") || lower.includes("stipendiya") || lower.includes("g'olib") || lower.includes("startap") || lower.includes("tanlov")) {
    return "Yutuqlar"
  }
  if (lower.includes("qabul") || lower.includes("imtihon") || lower.includes("ariza.piima")) {
    return "Qabul"
  }
  if (lower.includes("tadbir") || lower.includes("bayram") || lower.includes("seminar") || lower.includes("uchrashuv") || lower.includes("muloqot")) {
    return "Tadbirlar"
  }
  if (lower.includes("hamkorlik") || lower.includes("universitet") || lower.includes("delegatsiya")) {
    return "Hamkorlik"
  }
  return "Maktab hayoti"
}

/**
 * Server-side public preview scraper from https://t.me/s/Urganch_IMI
 * Supports pagination through ?before={minId} to fetch multiple pages of history!
 */
export async function fetchTelegramChannelPosts(maxPages = 3): Promise<{ count: number; posts: TelegramPost[]; errors: string[] }> {
  const channelUsername = (process.env.TELEGRAM_CHANNEL_ID || "Urganch_IMI").replace(/^@/, "").replace("https://t.me/", "")
  const baseUrl = `https://t.me/s/${channelUsername}`
  const posts: TelegramPost[] = []
  const seenIds = new Set<number>()
  const errors: string[] = []

  let currentUrl = baseUrl

  for (let page = 1; page <= maxPages; page++) {
    try {
      const response = await fetch(currentUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "uz,ru,en;q=0.9",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        errors.push(`Page ${page} HTTP ${response.status}: ${response.statusText}`)
        break
      }

      const html = await response.text()
      const parts = html.split('<div class="tgme_widget_message ')
      if (parts.length <= 1) {
        break
      }

      let pageMinId = Infinity

      for (let i = 1; i < parts.length; i++) {
        const block = parts[i]
        const postMatch = block.match(/data-post="([^"]+)"/)
        if (!postMatch) continue

        const postSlug = postMatch[1] // e.g. "Urganch_IMI/24218"
        const postId = parseInt(postSlug.split("/")[1] || "0", 10)
        if (!postId || seenIds.has(postId)) continue

        seenIds.add(postId)
        if (postId < pageMinId) pageMinId = postId

        // Extract clean text content
        let text = ""
        const textMatch = block.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)
        if (textMatch) {
          text = textMatch[1]
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<[^>]+>/g, "")
            .replace(/&#33;/g, "!")
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .trim()
        }

        // Extract image preview
        let imageUrl: string | undefined
        const imgMatch = block.match(/background-image:url\('([^']+)'\)/)
        if (imgMatch) {
          imageUrl = `/api/telegram/image?url=${encodeURIComponent(imgMatch[1])}`
        } else {
          const videoPoster = block.match(/<video[^>]*poster="([^"]+)"/)
          if (videoPoster) {
            imageUrl = `/api/telegram/image?url=${encodeURIComponent(videoPoster[1])}`
          }
        }

        // Extract video URL if any
        let videoUrl: string | undefined
        const videoMatch = block.match(/<video[^>]*src="([^"]+)"/)
        if (videoMatch) {
          videoUrl = videoMatch[1]
        }

        // Extract published time
        let date = new Date().toISOString()
        const timeMatch = block.match(/<time datetime="([^"]+)"/)
        if (timeMatch) {
          date = timeMatch[1]
        }

        const cleanMeaningful = text
          .replace(/#[a-zA-Z0-9_]+/g, "")
          .replace(/📲Telegram[^\n]*/gi, "")
          .replace(/🌐Facebook[^\n]*/gi, "")
          .replace(/🎞Youtube[^\n]*/gi, "")
          .replace(/🌐Instagram[^\n]*/gi, "")
          .trim()

        // Skip posts with negligible content (like lone social buttons or empty captions)
        if (cleanMeaningful.length < 25) {
          continue
        }

        const title = extractSmartTitle(text)
        const excerpt = cleanExcerpt(text) || (text.length > 240 ? text.substring(0, 237) + "..." : text)
        const category = detectCategory(text)

        posts.push({
          id: postId,
          text: text.slice(0, 4000),
          title,
          excerpt,
          date,
          imageUrl,
          videoUrl,
          postUrl: `https://t.me/${postSlug}`,
          category,
        })
      }

      // If we have a valid minId and more pages are requested, paginate backwards
      if (pageMinId !== Infinity && page < maxPages) {
        currentUrl = `${baseUrl}?before=${pageMinId}`
      } else {
        break
      }
    } catch (err: any) {
      errors.push(`Page ${page} network error: ${err.message}`)
      break
    }
  }

  // Sort descending by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return { count: posts.length, posts, errors }
}

/**
 * Synchronize public Telegram posts into website database.
 * Posts are automatically set to "published" so they appear immediately on the website!
 * Any existing manual changes or "archived" status by admins are preserved.
 */
export async function syncTelegramToDatabase(maxPages = 3): Promise<{
  success: boolean
  imported: number
  total: number
  errors: string[]
}> {
  const { posts, errors } = await fetchTelegramChannelPosts(maxPages)
  const existingNews = getNews("all")
  let importedCount = 0

  for (const post of posts) {
    const existingIndex = existingNews.findIndex(
      (n) => n.telegramMessageId === post.id || n.telegramPostUrl === post.postUrl
    )

    if (existingIndex >= 0) {
      // Refresh title and excerpt with latest smart clean logic if changed
      const existing = existingNews[existingIndex]
      if (existing.id.startsWith("tg-") && (existing.title.uz !== post.title || existing.category !== post.category)) {
        existing.title = { uz: post.title, ru: post.title, en: post.title }
        existing.excerpt = { uz: post.excerpt, ru: post.excerpt, en: post.excerpt }
        existing.category = post.category
        saveNewsItem(existing)
      }
    } else if (post.text || post.imageUrl) {
      // New post: publish automatically!
      const newItem: NewsItem = {
        id: `tg-${post.id}`,
        slug: `telegram-post-${post.id}`,
        title: {
          uz: post.title,
          ru: post.title,
          en: post.title,
        },
        excerpt: {
          uz: post.excerpt,
          ru: post.excerpt,
          en: post.excerpt,
        },
        content: {
          uz: post.text,
          ru: post.text,
          en: post.text,
        },
        category: post.category,
        imageUrl: post.imageUrl || "/images/photo-2025-10-24-21-21-29.jpg",
        publishedAt: post.date,
        telegramPostUrl: post.postUrl,
        telegramMessageId: post.id,
        status: "published", // AUTOMATICALLY PUBLISHED to homepage and news page!
        views: 0,
        source: "Rasmiy Telegram kanali (@Urganch_IMI)",
        author: "Urganch 1-IMI",
      }

      saveNewsItem(newItem)
      importedCount++
    }
  }

  // Update sync log
  saveTelegramSyncLog({
    lastSync: new Date().toISOString(),
    status: errors.length > 0 ? "error" : "success",
    totalImported: getNews("all").filter((n) => n.telegramMessageId).length,
    newItems: importedCount,
    lastCheckedPostId: posts[0]?.id,
    channelUrl: "https://t.me/s/Urganch_IMI",
    errorLogs: errors,
  })

  return {
    success: errors.length === 0,
    imported: importedCount,
    total: posts.length,
    errors,
  }
}

/**
 * Send an admission application notification to the Admin Telegram chat.
 * Strictly server-side. Secrets are never exposed to the client.
 */
export async function sendApplicationTelegramNotification(
  app: ApplicationItem
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID

  if (!token || !chatId) {
    return { success: false, error: "Telegram credentials not configured" }
  }

  const messageText =
    `🏫 <b>YANGI QABUL SO'ROVI — Urganch 1-IMI</b>\n\n` +
    `👤 <b>O‘quvchi:</b> ${escapeHtml(app.studentName)}\n` +
    `👨‍👩‍👦 <b>Ota-ona:</b> ${escapeHtml(app.parentName)}\n` +
    `📞 <b>Telefon:</b> ${escapeHtml(app.phone)}\n` +
    `🎓 <b>Sinf:</b> ${escapeHtml(app.grade)}\n` +
    `📍 <b>Hudud:</b> ${escapeHtml(app.region)}\n` +
    `📝 <b>Xabar:</b> ${escapeHtml(app.message || "Ko'rsatilmagan")}\n` +
    `🕐 <b>Sana:</b> ${new Date(app.createdAt).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}\n\n` +
    `<i>Rasmiy portal: https://ariza.piima.uz</i>`

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "HTML",
      }),
    })

    const result = await res.json()
    if (!res.ok || !result.ok) {
      return { success: false, error: result.description || "Failed to send notification" }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
