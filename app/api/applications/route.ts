import { type NextRequest, NextResponse } from "next/server"

// Fields the current admissions form always sends. Anything beyond these
// is included automatically in the Telegram message as extra lines, so
// new fields added to the form later don't need code changes here.
const KNOWN_FIELDS = ["name", "email", "phone", "info"]

// Escape special HTML characters so user input can never break Telegram's
// HTML parse_mode formatting (or inject markup into the message).
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export async function POST(request: NextRequest) {
  let data: Record<string, unknown>

  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: "Noto'g'ri so'rov formati" }, { status: 400 })
  }

  const { name, email, phone, info } = data as {
    name?: string
    email?: string
    phone?: string
    info?: string
  }

  if (!name || !email || !phone) {
    return NextResponse.json(
      { success: false, message: "Majburiy maydonlar to'ldirilmagan" },
      { status: 400 },
    )
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    // Never leak *why* to the client — just log server-side for the admin.
    console.error("[applications] TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID environment variable sozlanmagan")
    return NextResponse.json(
      { success: false, message: "Ariza yuborishda xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring." },
      { status: 500 },
    )
  }

  const createdAt = new Date().toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
    dateStyle: "medium",
    timeStyle: "short",
  })

  let message =
    `🔔 <b>YANGI ARIZA</b>\n\n` +
    `👤 <b>Ism:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Telefon:</b> ${escapeHtml(phone)}\n` +
    `📧 <b>Email:</b> ${escapeHtml(email)}\n` +
    `📝 <b>Ariza:</b>\n${escapeHtml(info || "—")}\n\n` +
    `🕐 <b>Sana:</b> ${escapeHtml(createdAt)}`

  // Append any extra fields the form might include beyond the known ones.
  const extraEntries = Object.entries(data).filter(([key]) => !KNOWN_FIELDS.includes(key))
  if (extraEntries.length > 0) {
    const extraLines = extraEntries
      .map(([key, value]) => `<b>${escapeHtml(key)}:</b> ${escapeHtml(value)}`)
      .join("\n")
    message += `\n\n${extraLines}`
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!telegramResponse.ok) {
      const errorBody = await telegramResponse.text().catch(() => "")
      console.error("[applications] Telegram API xatoligi:", telegramResponse.status, errorBody)
      return NextResponse.json(
        { success: false, message: "Ariza yuborishda xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring." },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true, message: "Arizangiz muvaffaqiyatli yuborildi." })
  } catch (error) {
    console.error("[applications] Telegramga ulanishda kutilmagan xatolik:", error)
    return NextResponse.json(
      { success: false, message: "Ariza yuborishda xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring." },
      { status: 500 },
    )
  }
}
