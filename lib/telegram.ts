import { ApplicationItem, NewsItem } from "./types"
import { saveNewsItem, getNews } from "./db"

// Server-side only Telegram integration
export interface TelegramPost {
  id: number
  text: string
  date: string
  imageUrl?: string
  postUrl: string
}

/**
 * Send an admission application notification to the Admin Telegram chat.
 * Strictly server-side. Secrets are never exposed to the client.
 */
export async function sendApplicationTelegramNotification(app: ApplicationItem): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID

  if (!token || !chatId) {
    console.log("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_CHAT_ID not configured in environment. Notification skipped.")
    return { success: false, error: "Telegram credentials not configured" }
  }

  const messageText = `🏫 <b>YANGI QABUL ARIZASI — Urganch 1-IMI</b>\n\n` +
    `👤 <b>O‘quvchi:</b> ${escapeHtml(app.studentName)}\n` +
    `👨‍👩‍👦 <b>Ota-ona:</b> ${escapeHtml(app.parentName)}\n` +
    `📞 <b>Telefon:</b> ${escapeHtml(app.phone)}\n` +
    `🎓 <b>Sinf:</b> ${escapeHtml(app.grade)}\n` +
    `📍 <b>Hudud:</b> ${escapeHtml(app.region)}\n` +
    `📝 <b>Xabar / Izoh:</b> ${escapeHtml(app.message || "Ko'rsatilmagan")}\n` +
    `🕐 <b>Sana:</b> ${new Date(app.createdAt).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}\n\n` +
    `<i>Ariza maktab rasmiy tizimiga qabul qilindi.</i>`

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
      console.error("[Telegram] Error sending Telegram notification:", result)
      return { success: false, error: result.description || "Failed to send notification" }
    }

    return { success: true }
  } catch (err: any) {
    console.error("[Telegram] Network error sending notification:", err)
    return { success: false, error: err.message }
  }
}

/**
 * Fetch recent public posts from the official channel https://t.me/s/Urganch_IMI
 * Parses the public preview, extracts media and content, and imports as pending posts for admin review.
 */
export async function fetchTelegramChannelPosts(): Promise<{ count: number; posts: TelegramPost[] }> {
  const channelUsername = (process.env.TELEGRAM_CHANNEL_ID || "Urganch_IMI").replace(/^@/, "").replace("https://t.me/", "")
  const previewUrl = `https://t.me/s/${channelUsername}`

  try {
    const response = await fetch(previewUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`[Telegram] Failed to fetch channel preview: ${response.status} ${response.statusText}`)
      return { count: 0, posts: [] }
    }

    const html = await response.text()
    const posts: TelegramPost[] = []

    // Match message containers in t.me/s/ HTML preview
    const msgRegex = /<div class="tgme_widget_message_wrap[^"]*"[^>]*data-post="([^"]+)"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g
    let match

    while ((match = msgRegex.exec(html)) !== null) {
      const fullBlock = match[0]
      const postSlug = match[1] // e.g. "Urganch_IMI/16964"
      const postId = parseInt(postSlug.split("/")[1] || "0", 10)

      if (!postId) continue

      // Extract text content
      let text = ""
      const textMatch = fullBlock.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)
      if (textMatch) {
        text = textMatch[1]
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<[^>]+>/g, "")
          .trim()
      }

      // Extract photo if present
      let imageUrl: string | undefined
      const imgMatch = fullBlock.match(/background-image:url\('([^']+)'\)/)
      if (imgMatch) {
        imageUrl = imgMatch[1]
      }

      // Extract date
      let date = new Date().toISOString()
      const timeMatch = fullBlock.match(/<time datetime="([^"]+)"/)
      if (timeMatch) {
        date = timeMatch[1]
      }

      if (text || imageUrl) {
        posts.push({
          id: postId,
          text: text.slice(0, 1000),
          date,
          imageUrl,
          postUrl: `https://t.me/${postSlug}`,
        })
      }
    }

    return { count: posts.length, posts }
  } catch (error) {
    console.error("[Telegram] Error fetching public channel posts:", error)
    return { count: 0, posts: [] }
  }
}

/**
 * Import fetched Telegram posts into the website database as "pending" news items.
 * An administrator must review and approve them before they are visible publicly on the site.
 */
export async function syncTelegramToPendingNews(): Promise<{ imported: number; total: number }> {
  const { posts } = await fetchTelegramChannelPosts()
  const existingNews = getNews("all")
  let importedCount = 0

  for (const post of posts) {
    // Check if post already exists
    const exists = existingNews.some((n) => n.telegramMessageId === post.id || n.telegramPostUrl === post.postUrl)
    if (!exists && post.text) {
      const firstLine = post.text.split("\n")[0] || "Urganch 1-IMI yangiliklari"
      const title = firstLine.length > 100 ? firstLine.substring(0, 97) + "..." : firstLine
      const excerpt = post.text.length > 250 ? post.text.substring(0, 247) + "..." : post.text

      const newItem: NewsItem = {
        id: `tg-${post.id}`,
        slug: `telegram-post-${post.id}`,
        title: {
          uz: title,
          ru: title,
          en: title,
        },
        excerpt: {
          uz: excerpt,
          ru: excerpt,
          en: excerpt,
        },
        content: {
          uz: post.text,
          ru: post.text,
          en: post.text,
        },
        category: "Maktab hayoti",
        imageUrl: post.imageUrl || "/images/photo-2025-10-24-21-21-29.jpg",
        publishedAt: post.date,
        telegramPostUrl: post.postUrl,
        telegramMessageId: post.id,
        status: "pending", // ALWAYS imported as pending for Admin moderation!
        views: 0,
        source: "Rasmiy Telegram kanali (@Urganch_IMI)",
        author: "Urganch 1-IMI",
      }

      saveNewsItem(newItem)
      importedCount++
    }
  }

  return { imported: importedCount, total: posts.length }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
