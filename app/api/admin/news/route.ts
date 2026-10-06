import { type NextRequest, NextResponse } from "next/server"
import { getNews, saveNewsItem, deleteNewsItem } from "@/lib/db"

function isAuthorized(request: NextRequest): boolean {
  const cookie = request.cookies.get("imi_admin_session")
  return cookie?.value === "authenticated_session_token_imi"
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  const news = getNews("all")
  return NextResponse.json({ success: true, data: news })
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  try {
    const item = await request.json()
    const saved = saveNewsItem(item)
    return NextResponse.json({ success: true, data: saved })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  try {
    const item = await request.json()
    const saved = saveNewsItem(item)
    return NextResponse.json({ success: true, data: saved })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ success: false, message: "ID ko'rsatilmadi" }, { status: 400 })
  }
  const deleted = deleteNewsItem(id)
  return NextResponse.json({ success: deleted })
}
