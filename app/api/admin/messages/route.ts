import { type NextRequest, NextResponse } from "next/server"
import { isAuthorized, NO_CACHE_HEADERS } from "@/lib/admin-auth"
import { getContactMessages, updateContactMessageStatus, deleteContactMessage } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

const unauthorized = () =>
  NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401, headers: NO_CACHE_HEADERS })

const fail = (error: unknown) =>
  NextResponse.json(
    { success: false, message: error instanceof Error ? error.message : "Server xatosi" },
    { status: 500, headers: NO_CACHE_HEADERS },
  )

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized()
  try {
    const data = await getContactMessages()
    return NextResponse.json({ success: true, count: data.length, data }, { headers: NO_CACHE_HEADERS })
  } catch (error) {
    return fail(error)
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized()
  try {
    const body = await request.json()
    const { id, status } = body
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID va Status talab qilinadi" },
        { status: 400, headers: NO_CACHE_HEADERS },
      )
    }
    const updated = await updateContactMessageStatus(id, status)
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Xabar topilmadi" },
        { status: 404, headers: NO_CACHE_HEADERS },
      )
    }
    return NextResponse.json({ success: true, data: updated }, { headers: NO_CACHE_HEADERS })
  } catch (error) {
    return fail(error)
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized()
  const id = new URL(request.url).searchParams.get("id")
  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID ko'rsatilmadi" },
      { status: 400, headers: NO_CACHE_HEADERS },
    )
  }
  try {
    const deleted = await deleteContactMessage(id)
    return NextResponse.json({ success: deleted }, { status: deleted ? 200 : 404, headers: NO_CACHE_HEADERS })
  } catch (error) {
    return fail(error)
  }
}
