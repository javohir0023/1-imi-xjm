import { type NextRequest, NextResponse } from "next/server"
import { syncTelegramToDatabase, getTelegramSyncLog } from "@/lib/telegram"

export async function GET(request: NextRequest) {
  const syncLog = getTelegramSyncLog()
  const channel = (process.env.TELEGRAM_CHANNEL_ID || "Urganch_IMI").replace(/^@/, "")

  return NextResponse.json({
    success: true,
    channel: `@${channel}`,
    channelUrl: `https://t.me/${channel}`,
    publicPreviewUrl: `https://t.me/s/${channel}`,
    status: syncLog.status,
    lastSync: syncLog.lastSync,
    totalImported: syncLog.totalImported,
    newItems: syncLog.newItems,
    errorLogs: syncLog.errorLogs,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pages = parseInt(searchParams.get("pages") || "3", 10)

    const result = await syncTelegramToDatabase(pages)
    return NextResponse.json({
      success: true,
      message: `${result.imported} ta yangi Telegram posti rasmiy kanaldan avtomatik muvaffaqiyatli sinxronlandi. (Jami skan qilingan: ${result.total})`,
      imported: result.imported,
      totalScanned: result.total,
      errors: result.errors,
    })
  } catch (error: any) {
    console.error("[Telegram Sync API] Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Telegram postlarini yuklashda xatolik: " + error.message,
      },
      { status: 500 }
    )
  }
}
