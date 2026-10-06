import { type NextRequest, NextResponse } from "next/server"
import { addContactMessage } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: "Iltimos, ismingiz va xabar matnini kiriting." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      )
    }

    // Save contact message / murojaat to internal database
    const savedMsg = await addContactMessage({
      name: String(name).trim(),
      email: email ? String(email).trim() : "",
      phone: phone ? String(phone).trim() : undefined,
      subject: subject ? String(subject).trim() : "Mavzu ko'rsatilmagan",
      message: String(message).trim(),
    })

    console.log(`[Contact API] New contact message saved: ID=${savedMsg.id}, Name=${savedMsg.name}`)

    // Optional Telegram notification for contact inquiry
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID

    if (token && chatId) {
      const text =
        `📬 <b>YANGI MUROJAAT — Urganch 1-IMI Sayti</b>\n\n` +
        `👤 <b>Ism:</b> ${name}\n` +
        `✉️ <b>Email:</b> ${email || "Ko'rsatilmagan"}\n` +
        (phone ? `📞 <b>Telefon:</b> ${phone}\n` : "") +
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
      {
        success: true,
        message: "Xabaringiz muvaffaqiyatli qabul qilindi. Tez orada javob beramiz!",
        messageId: savedMsg.id,
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("[Contact API] Error:", error)
    return NextResponse.json(
      { success: false, message: "Xatolik yuz berdi. Qayta urinib ko'ring." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    )
  }
}
