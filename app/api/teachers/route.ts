import { type NextRequest, NextResponse } from "next/server"
import { getTeachers } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"
    const search = searchParams.get("search")?.toLowerCase().trim() || ""

    const allTeachers = getTeachers()

    let filtered = allTeachers.filter((item) => {
      if (category !== "all" && item.category !== category) {
        return false
      }
      if (search) {
        const nameMatch = item.nameUz.toLowerCase().includes(search)
        const posMatch = (item.positionUz || "").toLowerCase().includes(search)
        const subjMatch = (item.subjectUz || "").toLowerCase().includes(search)
        if (!nameMatch && !posMatch && !subjMatch) return false
      }
      return true
    })

    return NextResponse.json({
      success: true,
      count: filtered.length,
      total: allTeachers.length,
      data: filtered,
    })
  } catch (error: any) {
    console.error("[API Teachers] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
