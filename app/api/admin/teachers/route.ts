import { type NextRequest, NextResponse } from "next/server"
import { isAuthorized, NO_CACHE_HEADERS } from "@/lib/admin-auth"
import { getTeachers, saveTeacher, deleteTeacher, getNextTeacherId } from "@/lib/db"
import { TeacherItem } from "@/lib/types"

export const dynamic = "force-dynamic"
export const revalidate = 0

const unauthorized = () =>
  NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401, headers: NO_CACHE_HEADERS })

const fail = (err: any) =>
  NextResponse.json({ success: false, error: err.message, message: err.message }, { status: 500, headers: NO_CACHE_HEADERS })

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "")

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized()
  try {
    const list = await getTeachers()
    return NextResponse.json({ success: true, total: list.length, data: list }, { headers: NO_CACHE_HEADERS })
  } catch (err: any) {
    return fail(err)
  }
}

function pickFields(body: any) {
  return {
    nameUz: str(body.nameUz),
    positionUz: str(body.positionUz),
    subjectUz: str(body.subjectUz),
    qualification: str(body.qualification) || "Oliy toifa",
    degree: str(body.degree),
    section: str(body.section) || "Asosiy o'qituvchilar",
    category: (body.category || "science") as TeacherItem["category"],
    image: typeof body.image === "string" && body.image ? body.image.slice(0, 1000) : null,
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized()
  try {
    const body = await request.json()
    const f = pickFields(body)
    if (!f.nameUz || !f.positionUz) {
      return NextResponse.json({ success: false, error: "Ism va lavozim majburiy" }, { status: 400 })
    }
    const newTeacher: TeacherItem = {
      id: await getNextTeacherId(),
      ...f,
      nameRu: f.nameUz,
      nameEn: f.nameUz,
      positionRu: f.positionUz,
      positionEn: f.positionUz,
      isQualified: true,
    }
    await saveTeacher(newTeacher)
    return NextResponse.json({ success: true, data: newTeacher }, { headers: NO_CACHE_HEADERS })
  } catch (err: any) {
    return fail(err)
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized()
  try {
    const body = await request.json()
    const id = Number(body.id)
    if (!id) return NextResponse.json({ success: false, error: "ID talab etiladi" }, { status: 400 })
    const current = (await getTeachers()).find((t) => t.id === id)
    if (!current) return NextResponse.json({ success: false, error: "Xodim topilmadi" }, { status: 404 })
    const f = pickFields(body)
    if (!f.nameUz || !f.positionUz) {
      return NextResponse.json({ success: false, error: "Ism va lavozim majburiy" }, { status: 400 })
    }
    const updated: TeacherItem = {
      ...current,
      ...f,
      nameRu: f.nameUz,
      nameEn: f.nameUz,
      positionRu: f.positionUz,
      positionEn: f.positionUz,
    }
    await saveTeacher(updated)
    return NextResponse.json({ success: true, data: updated }, { headers: NO_CACHE_HEADERS })
  } catch (err: any) {
    return fail(err)
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized()
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id") || "0", 10)
    if (!id) return NextResponse.json({ success: false, error: "ID talab etiladi" }, { status: 400 })
    const res = await deleteTeacher(id)
    return NextResponse.json({ success: res }, { headers: NO_CACHE_HEADERS })
  } catch (err: any) {
    return fail(err)
  }
}
