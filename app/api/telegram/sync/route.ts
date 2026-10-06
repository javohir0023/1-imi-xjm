import { type NextRequest, NextResponse } from "next/server"
import { syncTelegramToPendingNews } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    const result = await syncTelegramToPendingNews()
    return NextResponse.json({
      success: true,
      message: `${result.imported} ta yangi Telegram posti ko'rib chiqish (pending) ro'yxatiga qo'shildi.`,
      imported: result.imported,
      totalScanned: result.total,
    })
  } catch (error: any) {
    console.error("[Telegram Sync API] Error:", error)
    return NextResponse.json(
      { success: false, message: "Telegram postlarini yuklashda xatolik yuz berdi: " + error.message },
      { status: 500 },
    )
  }
}
