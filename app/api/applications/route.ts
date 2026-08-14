import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function db() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

function isAdmin(request: NextRequest) {
  return request.cookies.get("admin_session")?.value === process.env.ADMIN_SESSION_TOKEN
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, info } = data
    if (!name || !email || !phone) return NextResponse.json({ success: false, message: "Majburiy maydonlar to'ldirilmagan" }, { status: 400 })

    const { error } = await db().from("applications").insert({ name, email, phone, info: info || "" })
    if (error) throw error
    return NextResponse.json({ success: true, message: "Ariza muvaffaqiyatli yuborildi" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: "Arizani saqlashda xatolik" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ success: false, message: "Ruxsat yo'q" }, { status: 401 })
  const { data, error } = await db().from("applications").select("*").order("created_at", { ascending: false })
  if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  return NextResponse.json({ success: true, applications: data })
}

export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ success: false, message: "Ruxsat yo'q" }, { status: 401 })
  const { id, status } = await request.json()
  const allowed = ["new", "reviewed", "accepted", "rejected"]
  if (!id || !allowed.includes(status)) return NextResponse.json({ success: false, message: "Noto'g'ri ma'lumot" }, { status: 400 })
  const { error } = await db().from("applications").update({ status }).eq("id", id)
  if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ success: false, message: "Ruxsat yo'q" }, { status: 401 })
  const id = request.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ success: false, message: "ID kerak" }, { status: 400 })
  const { error } = await db().from("applications").delete().eq("id", id)
  if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
