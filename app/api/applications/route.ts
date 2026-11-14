import { type NextRequest, NextResponse } from "next/server"
import { addApplication, StorageError } from "@/lib/db"
import { sendApplicationTelegramNotification } from "@/lib/telegram"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      studentName,
      name,
      fullName,
      parentName,
      phone,
      grade,
      region,
      message,
      info,
      honeypot,
    } = body

    // Anti-spam check: honeypot bot trap
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: "Arizangiz qabul qilindi." },
        { headers: { "Cache-Control": "no-store" } },
      )
    }

    // Resolve student name from multiple possible keys
    const resolvedStudentName = (studentName || name || fullName || "").toString().trim()
    if (!resolvedStudentName || resolvedStudentName.length < 2) {
      return NextResponse.json(
        { success: false, message: "Iltimos, o'quvchining to'liq ism-familiyasini kiriting." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      )
    }

    // Resolve parent name
    const resolvedParentName = (parentName || "").toString().trim() || "Ko'rsatilmagan"

    // Resolve phone
    const resolvedPhone = (phone || "").toString().trim()
    if (!resolvedPhone || resolvedPhone.length < 7) {
      return NextResponse.json(
        { success: false, message: "Iltimos, to'g'ri telefon raqamini kiriting (+998...)." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      )
    }

    // Resolve grade & region
    const resolvedGrade = (grade || "5-sinf").toString().trim()
    const resolvedRegion = (region || "Urganch shahar").toString().trim()
    const resolvedMessage = (message || info || "").toString().trim()

    // Store in internal database
    const savedApp = await addApplication({
      studentName: resolvedStudentName,
      parentName: resolvedParentName,
      phone: resolvedPhone,
      grade: resolvedGrade,
      region: resolvedRegion,
      message: resolvedMessage,
    })

    console.log(`[Applications API] New application saved: ID=${savedApp.id}, Student=${savedApp.studentName}`)

    // Telegram xabarnomasi (Vercel'da javobdan keyin funksiya to'xtatilishi mumkin, shuning uchun kutamiz)
    try {
      await sendApplicationTelegramNotification(savedApp)
    } catch (err) {
      console.error("[Applications API] Telegram notification failed:", err)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Arizangiz muvaffaqiyatli qabul qilindi! Qabul komissiyasi tez orada siz bilan bog'lanadi.",
        applicationId: savedApp.id,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      },
    )
  } catch (error) {
    console.error("[Applications API] Error processing application:", error)
    const isStorage = error instanceof StorageError
    return NextResponse.json(
      {
        success: false,
        message: isStorage
          ? "Arizani hozir saqlab bo'lmadi. Iltimos, birozdan so'ng qayta urinib ko'ring yoki maktabga qo'ng'iroq qiling."
          : "Texnik xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
      },
      { status: isStorage ? 503 : 500, headers: { "Cache-Control": "no-store" } },
    )
  }
}
