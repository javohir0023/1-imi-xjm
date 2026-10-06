import { type NextRequest, NextResponse } from "next/server"
import { addContactMessage } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, subject, message } = data

    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: "Majburiy maydonlar to'ldirilmagan" },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      )
    }

    const savedMsg = await addContactMessage({
      name: String(name).trim(),
      email: email ? String(email).trim() : "",
      phone: phone ? String(phone).trim() : undefined,
      subject: subject ? String(subject).trim() : "Mavzu ko'rsatilmagan",
      message: String(message).trim(),
    })

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID

    if (token && chatId) {
      const text =
        `📬 <b>YANGI MUROJAAT — Urganch 1-IMI Sayti</b>\n\n` +
        `👤 <b>Ism:</b> ${name}\n` +
        `✉️ <b>Email:</b> ${email || "Ko'rsatilmagan"}\n` +
        `📌 <b>Mavzu:</b> ${subject || "Mavzusi yo'q"}\n` +
        `💬 <b>Xabar:</b> ${message}\n` +
        `🕐 <b>Vaqt:</b> ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      }).catch((e) => console.error("[Contact API] Telegram error:", e))
    }

    return NextResponse.json(
      { success: true, message: "Xabaringiz muvaffaqiyatli yuborildi", messageId: savedMsg.id },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("[1-imi] Error submitting form:", error)
    return NextResponse.json(
      { success: false, message: "Xatolik yuz berdi" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    )
  }
}
