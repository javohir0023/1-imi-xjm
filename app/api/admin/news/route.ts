import { type NextRequest, NextResponse } from "next/server"
import { isAuthorized, NO_CACHE_HEADERS } from "@/lib/admin-auth"
import { getNews, saveNewsItem, deleteNewsItem } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Ruxsat berilmagan" },
      { status: 401, headers: NO_CACHE_HEADERS },
    )
  }
  const news = getNews("all")
  return NextResponse.json(
    { success: true, data: news },
    { headers: NO_CACHE_HEADERS },
  )
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Ruxsat berilmagan" },
      { status: 401, headers: NO_CACHE_HEADERS },
    )
  }
  try {
    const item = await request.json()
    const saved = saveNewsItem(item)
    return NextResponse.json(
      { success: true, data: saved },
      { headers: NO_CACHE_HEADERS },
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: NO_CACHE_HEADERS },
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Ruxsat berilmagan" },
      { status: 401, headers: NO_CACHE_HEADERS },
    )
  }
  try {
    const item = await request.json()
    const saved = saveNewsItem(item)
    return NextResponse.json(
      { success: true, data: saved },
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
  try {
    const deleted = deleteNewsItem(id)
    return NextResponse.json({ success: deleted }, { headers: NO_CACHE_HEADERS })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: NO_CACHE_HEADERS },
    )
  }
}
