import { type NextRequest, NextResponse } from "next/server"
import { getApplications, updateApplicationStatus, deleteApplication } from "@/lib/db"

function isAuthorized(request: NextRequest): boolean {
  const cookie = request.cookies.get("imi_admin_session")
  return cookie?.value === "authenticated_session_token_imi"
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  const applications = getApplications()
  return NextResponse.json({ success: true, count: applications.length, data: applications })
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  try {
    const { id, status, notes } = await request.json()
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "ID va Status talab qilinadi" }, { status: 400 })
    }
    const updated = updateApplicationStatus(id, status, notes)
    if (!updated) {
      return NextResponse.json({ success: false, message: "Ariza topilmadi" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: updated })
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
  const deleted = deleteApplication(id)
  return NextResponse.json({ success: deleted })
}
