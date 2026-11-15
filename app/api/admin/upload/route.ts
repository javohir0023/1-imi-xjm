import { type NextRequest, NextResponse } from "next/server"
import { isAuthorized, NO_CACHE_HEADERS } from "@/lib/admin-auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export const dynamic = "force-dynamic"

const BUCKET = "teacher-photos"
const MAX_BYTES = 3 * 1024 * 1024
const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Ruxsat berilmagan" }, { status: 401, headers: NO_CACHE_HEADERS })
  }
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      { success: false, error: "Rasm yuklash uchun Supabase ulanmagan" },
      { status: 503, headers: NO_CACHE_HEADERS },
    )
  }
  try {
    const form = await request.formData()
    const file = form.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Fayl topilmadi" }, { status: 400 })
    }
    const ext = TYPES[file.type]
    if (!ext) {
      return NextResponse.json({ success: false, error: "Faqat JPG, PNG yoki WEBP rasm yuklash mumkin" }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ success: false, error: "Rasm hajmi 3 MB dan oshmasligi kerak" }, { status: 400 })
    }
    const path = `teachers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false })
    if (error) {
      return NextResponse.json({ success: false, error: `Yuklashda xato: ${error.message}` }, { status: 500 })
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return NextResponse.json({ success: true, url: data.publicUrl }, { headers: NO_CACHE_HEADERS })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
