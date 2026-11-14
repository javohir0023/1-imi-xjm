import { type NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/admin-auth"
import { getCertificates, saveCertificate } from "@/lib/db"
import { CertificateItem } from "@/lib/types"

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  try {
    const list = getCertificates()
    return NextResponse.json({
      success: true,
      total: list.length,
      duplicates: list.filter((c) => c.isDuplicate).length,
      incomplete: list.filter((c) => c.isIncomplete).length,
      data: list,
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, message: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401 })
  }
  try {
    const body = await request.json()
    if (!body.studentName || !body.subject) {
      return NextResponse.json({ success: false, error: "O'quvchi ismi va fan majburiy" }, { status: 400 })
    }

    const list = getCertificates()
    const isDup = list.some(
      (c) =>
        c.studentName.toLowerCase().trim() === body.studentName.toLowerCase().trim() &&
        c.subject.toLowerCase().trim() === body.subject.toLowerCase().trim() &&
        c.certType.toLowerCase().trim() === (body.certType || "").toLowerCase().trim()
    )

    const newCert: CertificateItem = {
      id: "cert-" + Date.now(),
      rowNumber: list.length + 1,
      studentName: body.studentName,
      category: body.category || "Миллий сертификат",
      certType: body.certType || "Umumtaʼlim fanini bilish darajasi toʻgʻrisidagi milliy sertifikat",
      subject: body.subject,
      level: body.level || "B2",
      score: body.score || "",
      teacher: body.teacher || "",
      school: "Urganch shahar 1-son IMI",
      date: body.date || new Date().toISOString().slice(0, 10),
      year: new Date().getFullYear().toString(),
      isDuplicate: isDup,
      isIncomplete: !body.level && !body.score,
      reviewNotes: isDup ? "Qo'shilgan dublikat yozuv" : null,
      source: "Admin panel orqali kiritilgan",
    }

    saveCertificate(newCert)
    return NextResponse.json({ success: true, data: newCert })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, message: err.message }, { status: 500 })
  }
}
