import { type NextRequest, NextResponse } from "next/server"
import { addApplication } from "@/lib/db"
import { sendApplicationTelegramNotification } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentName, parentName, phone, grade, region, message, honeypot } = body

    // Anti-spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Arizangiz qabul qilindi." })
    }

    // Validation
    if (!studentName || typeof studentName !== "string" || studentName.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Iltimos, o'quvchining to'liq ism-familiyasini kiriting." },
        { status: 400 },
      )
    }

    if (!parentName || typeof parentName !== "string" || parentName.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Iltimos, ota-onaning to'liq ism-familiyasini kiriting." },
        { status: 400 },
      )
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, message: "Iltimos, to'g'ri telefon raqamini kiriting (+998...)." },
        { status: 400 },
      )
    }

    if (!grade || typeof grade !== "string") {
      return NextResponse.json(
        { success: false, message: "Iltimos, topshirilayotgan sinfni tanlang." },
        { status: 400 },
      )
    }

    if (!region || typeof region !== "string") {
      return NextResponse.json(
        { success: false, message: "Iltimos, yashash hududingizni tanlang." },
        { status: 400 },
      )
    }

    // Store in internal database
    const savedApp = addApplication({
      studentName: studentName.trim(),
      parentName: parentName.trim(),
      phone: phone.trim(),
      grade: grade.trim(),
      region: region.trim(),
      message: message ? String(message).trim() : "",
    })

    // Forward Telegram notification to Admin
    sendApplicationTelegramNotification(savedApp).catch((err) => {
      console.error("[Applications API] Background Telegram notification failed:", err)
    })

    return NextResponse.json({
      success: true,
      message: "Arizangiz muvaffaqiyatli qabul qilindi! Qabul komissiyasi tez orada siz bilan bog'lanadi.",
      applicationId: savedApp.id,
    })
  } catch (error) {
    console.error("[Applications API] Error processing application:", error)
    return NextResponse.json(
      { success: false, message: "Texnik xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring." },
      { status: 500 },
    )
  }
}
