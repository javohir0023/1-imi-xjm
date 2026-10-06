import { type NextRequest, NextResponse } from "next/server"
import { getNews } from "@/lib/db"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const status = searchParams.get("status") || "published"

  let news = getNews(status as any)

  if (category && category !== "all") {
    news = news.filter((n) => n.category.toLowerCase() === category.toLowerCase())
  }

  return NextResponse.json({ success: true, count: news.length, data: news })
}
