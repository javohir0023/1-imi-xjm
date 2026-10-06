import { type NextRequest, NextResponse } from "next/server"
import { getContactMessages, updateContactMessageStatus, deleteContactMessage } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
}

function isAuthorized(request: NextRequest): boolean {
  const cookie = request.cookies.get("imi_admin_session")
  return cookie?.value === "authenticated_session_token_imi"
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Ruxsat berilmagan" },
      { status: 401, headers: NO_CACHE_HEADERS },
    )
  }
  const messages = getContactMessages()
  return NextResponse.json(
    { success: true, count: messages.length, data: messages },
    { headers: NO_CACHE_HEADERS },
  )
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Ruxsat berilmagan" },
      { status: 401, headers: NO_CACHE_HEADERS },
    )
  }
  try {
    const { id, status } = await request.json()
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID va Status talab qilinadi" },
        { status: 400, headers: NO_CACHE_HEADERS },
      )
    }
    const updated = updateContactMessageStatus(id, status)
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Xabar topilmadi" },
        { status: 404, headers: NO_CACHE_HEADERS },
      )
    }
    return NextResponse.json(
      { success: true, data: updated },
      { headers: NO_CACHE_HEADERS },
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: NO_CACHE_HEADERS },
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Ruxsat berilmagan" },
      { status: 401, headers: NO_CACHE_HEADERS },
    )
  }
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID ko'rsatilmadi" },
      { status: 400, headers: NO_CACHE_HEADERS },
    )
  }
  const deleted = deleteContactMessage(id)
  return NextResponse.json(
    { success: deleted },
    { headers: NO_CACHE_HEADERS },
  )
}
