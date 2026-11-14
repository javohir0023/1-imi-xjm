import { type NextRequest, NextResponse } from "next/server"
import { getTeachers, saveTeacher, deleteTeacher } from "@/lib/db"
import { TeacherItem } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const list = getTeachers()
    return NextResponse.json({
      success: true,
      total: list.length,
      data: list,
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.nameUz || !body.positionUz) {
      return NextResponse.json({ success: false, error: "Ism va lavozim majburiy" }, { status: 400 })
    }

    const list = getTeachers()
    const maxId = list.reduce((m, t) => Math.max(m, t.id), 0)

    const newTeacher: TeacherItem = {
      id: maxId + 1,
      nameUz: body.nameUz,
      nameRu: body.nameRu || body.nameUz,
      nameEn: body.nameEn || body.nameUz,
      positionUz: body.positionUz,
      positionRu: body.positionRu || body.positionUz,
      positionEn: body.positionEn || body.positionUz,
      subjectUz: body.subjectUz || "",
      qualification: body.qualification || "Oliy toifa",
      degree: body.degree || "",
      image: body.image || null,
      section: body.section || "Asosiy o'qituvchilar",
      category: body.category || "science",
      isQualified: true,
    }

    saveTeacher(newTeacher)
    return NextResponse.json({ success: true, data: newTeacher })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id") || "0", 10)
    if (!id) {
      return NextResponse.json({ success: false, error: "ID talab etiladi" }, { status: 400 })
    }
    const res = deleteTeacher(id)
    return NextResponse.json({ success: res })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
