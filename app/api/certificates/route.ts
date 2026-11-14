import { type NextRequest, NextResponse } from "next/server"
import { getCertificates } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")?.toLowerCase().trim() || ""
    const category = searchParams.get("category") || "all"
    const certType = searchParams.get("certType") || "all"
    const subject = searchParams.get("subject") || "all"
    const level = searchParams.get("level") || "all"
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "50", 10)

    const allCertificates = getCertificates()

    let filtered = allCertificates.filter((item) => {
      // Search across student name, teacher, subject, cert type
      if (search) {
        const matchesName = item.studentName.toLowerCase().includes(search)
        const matchesTeacher = item.teacher.toLowerCase().includes(search)
        const matchesSubject = item.subject.toLowerCase().includes(search)
        const matchesType = item.certType.toLowerCase().includes(search)
        if (!matchesName && !matchesTeacher && !matchesSubject && !matchesType) {
          return false
        }
      }

      // Category filter (Milliy / Xalqaro)
      if (category !== "all" && item.category !== category) {
        return false
      }

      // CertType filter
      if (certType !== "all" && item.certType !== certType) {
        return false
      }

      // Subject filter
      if (subject !== "all" && item.subject !== subject) {
        return false
      }

      // Level filter
      if (level !== "all" && item.level !== level) {
        return false
      }

      return true
    })

    const total = filtered.length
    const startIndex = (page - 1) * limit
    const paginated = filtered.slice(startIndex, startIndex + limit)

    // Aggregate statistics
    const stats = {
      totalFound: allCertificates.length,
      filteredCount: total,
      duplicates: allCertificates.filter((c) => c.isDuplicate).length,
      incomplete: allCertificates.filter((c) => c.isIncomplete).length,
      subjectsCount: Array.from(new Set(allCertificates.map((c) => c.subject).filter(Boolean))).length,
      nationalCount: allCertificates.filter((c) => c.category === "Миллий сертификат").length,
      internationalCount: allCertificates.filter((c) => c.category === "Халқаро сертификат").length,
    }

    return NextResponse.json({
      success: true,
      stats,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: paginated,
    })
  } catch (error: any) {
    console.error("[API Certificates] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
