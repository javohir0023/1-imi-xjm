import fs from "fs"
import path from "path"
import { NewsItem, ApplicationItem, AchievementItem, TeacherItem, GalleryItem, ContactMessageItem, CertificateItem } from "./types"
import { INITIAL_NEWS, INITIAL_ACHIEVEMENTS, INITIAL_TEACHERS, INITIAL_GALLERY } from "./data/initial-data"
import { supabase, isSupabaseConfigured } from "./supabase"

const DB_PATH = path.join(process.cwd(), "lib", "data", "db.json")

interface DatabaseSchema {
  news: NewsItem[]
  applications: ApplicationItem[]
  contactMessages?: ContactMessageItem[]
  achievements: AchievementItem[]
  teachers: TeacherItem[]
  gallery: GalleryItem[]
  telegramSyncLog: {
    lastSyncedAt?: string
    importedCount?: number
  }
}

// Default initial verified data
const INITIAL_DATA: DatabaseSchema = {
  news: INITIAL_NEWS,
  applications: [],
  contactMessages: [],
  achievements: INITIAL_ACHIEVEMENTS,
  teachers: INITIAL_TEACHERS,
  gallery: INITIAL_GALLERY,
  telegramSyncLog: {
    lastSyncedAt: new Date().toISOString(),
    importedCount: INITIAL_NEWS.length,
  },
}

// Database helper functions
export function getDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), "utf-8")
      return INITIAL_DATA
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8")
    const parsed = JSON.parse(raw) as DatabaseSchema
    return {
      news: parsed.news || INITIAL_DATA.news,
      applications: parsed.applications || [],
      contactMessages: parsed.contactMessages || [],
      achievements: parsed.achievements || INITIAL_DATA.achievements,
      teachers: parsed.teachers || INITIAL_DATA.teachers,
      gallery: parsed.gallery || INITIAL_DATA.gallery,
      telegramSyncLog: parsed.telegramSyncLog || {},
    }
  } catch (error) {
    console.error("[Database] Error reading db.json, returning initial seed:", error)
    return INITIAL_DATA
  }
}

export function saveDb(data: DatabaseSchema): boolean {
  try {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    // Safe atomic write
    const tempPath = `${DB_PATH}.tmp.${Date.now()}`
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8")
    fs.renameSync(tempPath, DB_PATH)
    return true
  } catch (error) {
    console.error("[Database] Error saving db.json, falling back to direct write:", error)
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8")
      return true
    } catch (err2) {
      console.error("[Database] Direct write also failed:", err2)
      return false
    }
  }
}

// ---------------------------------------------------------------------------
// News: statik boshlang'ich yangiliklar (db.json) + Supabase'dagi `news` jadvali.
// Jadvaldagi yozuv (Telegram'dan kelgan yoki admin tahrirlagan) statikni id bo'yicha almashtiradi.
// ---------------------------------------------------------------------------
async function loadAllNews(): Promise<NewsItem[]> {
  const base = getDb().news || []
  if (!(isSupabaseConfigured && supabase)) return base
  const { data, error } = await supabase.from("news").select("data").limit(5000)
  if (error) {
    console.error("[Supabase] news o'qish:", error.message)
    return base
  }
  const rows = (data || []).map((r: any) => r.data as NewsItem).filter(Boolean)
  const ids = new Set(rows.map((r) => r.id))
  return [...rows, ...base.filter((n) => !ids.has(n.id))]
}

export async function getNews(status: "all" | "published" | "pending" = "published"): Promise<NewsItem[]> {
  const all = await loadAllNews()
  if (status === "all") return all
  return all.filter((n) => n.status === status)
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const all = await loadAllNews()
  return all.find((n) => n.slug === slug || n.id === slug)
}

export async function saveNewsItem(item: NewsItem): Promise<NewsItem> {
  if (isSupabaseConfigured && supabase) {
    const d = new Date(item.publishedAt)
    const { error } = await supabase.from("news").upsert({
      id: item.id,
      data: item,
      status: item.status,
      published_at: isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString(),
      updated_at: new Date().toISOString(),
    })
    if (error) throw dbError("yangilikni saqlash", error.message)
    return item
  }
  const db = getDb()
  const index = db.news.findIndex((n) => n.id === item.id)
  if (index >= 0) db.news[index] = item
  else db.news.unshift(item)
  if (!saveDb(db)) throw new StorageError(READONLY_MSG)
  return item
}

export async function deleteNewsItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const existing = (await loadAllNews()).find((n) => n.id === id)
    if (!existing) return false
    const isStatic = (getDb().news || []).some((n) => n.id === id)
    if (isStatic) {
      // Statik yangilikni o'chirib bo'lmaydi: arxivga o'tkazib yashiramiz
      await saveNewsItem({ ...existing, status: "archived" })
    } else {
      const { error } = await supabase.from("news").delete().eq("id", id)
      if (error) throw dbError("yangilikni o'chirish", error.message)
    }
    return true
  }
  const db = getDb()
  const initialLen = db.news.length
  db.news = db.news.filter((n) => n.id !== id)
  if (db.news.length !== initialLen) {
    if (!saveDb(db)) throw new StorageError(READONLY_MSG)
    return true
  }
  return false
}

// ---------------------------------------------------------------------------
// Doimiy saqlash (Applications + Contact messages)
// Vercel'da fayl tizimi faqat o'qish uchun, shuning uchun arizalar Supabase'da saqlanadi.
// Lokal (npm run dev) rejimda Supabase bo'lmasa, db.json'ga yoziladi.
// ---------------------------------------------------------------------------
export class StorageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "StorageError"
  }
}

const READONLY_MSG =
  "Vercel'da fayl tizimi faqat o'qish uchun: bu bo'lim (yangilik/o'qituvchi/sertifikat) o'zgarishlari saqlanmaydi. Ma'lumotni GitHub'dagi lib/data fayllarida yangilab, qayta deploy qiling."

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)

function requireStorageMode(): "supabase" | "local" {
  if (isSupabaseConfigured && supabase) return "supabase"
  if (IS_SERVERLESS) {
    throw new StorageError(
      "Ma'lumotlar bazasi ulanmagan. Vercel'da NEXT_PUBLIC_SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY o'zgaruvchilarini kiriting va qayta deploy qiling.",
    )
  }
  return "local"
}

function mapApplicationRow(row: any): ApplicationItem {
  return {
    id: row.id,
    studentName: row.student_name ?? "",
    parentName: row.parent_name ?? "",
    phone: row.phone ?? "",
    grade: row.grade ?? "5-sinf",
    region: row.region ?? "Urganch shahar",
    message: row.message ?? "",
    status: row.status ?? "yangi",
    createdAt: row.created_at ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? undefined,
    notes: row.notes ?? "",
  }
}

function mapMessageRow(row: any): ContactMessageItem {
  return {
    id: row.id,
    name: row.name ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    subject: row.subject ?? "",
    message: row.message ?? "",
    status: row.status ?? "yangi",
    createdAt: row.created_at ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? undefined,
  }
}

function dbError(action: string, message: string): StorageError {
  console.error(`[Supabase] ${action}:`, message)
  return new StorageError(`Bazaga murojaat xatosi (${action}): ${message}`)
}

// Applications functions
export async function getApplications(): Promise<ApplicationItem[]> {
  if (requireStorageMode() === "supabase") {
    const { data, error } = await supabase!
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) throw dbError("arizalarni o'qish", error.message)
    return (data || []).map(mapApplicationRow)
  }
  return getDb().applications || []
}

export async function addApplication(
  app: Omit<ApplicationItem, "id" | "createdAt" | "status">,
): Promise<ApplicationItem> {
  const mode = requireStorageMode()
  const newItem: ApplicationItem = {
    ...app,
    id: "app-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    status: "yangi",
    createdAt: new Date().toISOString(),
  }

  if (mode === "supabase") {
    const { error } = await supabase!.from("applications").insert({
      id: newItem.id,
      student_name: newItem.studentName,
      parent_name: newItem.parentName,
      phone: newItem.phone,
      grade: newItem.grade,
      region: newItem.region,
      message: newItem.message || "",
      status: newItem.status,
      created_at: newItem.createdAt,
      notes: newItem.notes || "",
    })
    if (error) throw dbError("arizani saqlash", error.message)
    return newItem
  }

  const db = getDb()
  if (!db.applications) db.applications = []
  db.applications.unshift(newItem)
  if (!saveDb(db)) throw new StorageError("Arizani lokal faylga yozib bo'lmadi")
  return newItem
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationItem["status"],
  notes?: string,
): Promise<ApplicationItem | null> {
  if (requireStorageMode() === "supabase") {
    const payload: Record<string, any> = { status, updated_at: new Date().toISOString() }
    if (notes !== undefined) payload.notes = notes
    const { data, error } = await supabase!
      .from("applications")
      .update(payload)
      .eq("id", id)
      .select()
      .maybeSingle()
    if (error) throw dbError("arizani yangilash", error.message)
    return data ? mapApplicationRow(data) : null
  }

  const db = getDb()
  const app = db.applications.find((a) => a.id === id)
  if (!app) return null
  app.status = status
  app.updatedAt = new Date().toISOString()
  if (notes !== undefined) app.notes = notes
  saveDb(db)
  return app
}

export async function deleteApplication(id: string): Promise<boolean> {
  if (requireStorageMode() === "supabase") {
    const { data, error } = await supabase!.from("applications").delete().eq("id", id).select("id")
    if (error) throw dbError("arizani o'chirish", error.message)
    return (data?.length ?? 0) > 0
  }

  const db = getDb()
  const before = db.applications.length
  db.applications = db.applications.filter((a) => a.id !== id)
  if (db.applications.length === before) return false
  saveDb(db)
  return true
}

// Contact Messages functions (Murojaatlar)
export async function getContactMessages(): Promise<ContactMessageItem[]> {
  if (requireStorageMode() === "supabase") {
    const { data, error } = await supabase!
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) throw dbError("murojaatlarni o'qish", error.message)
    return (data || []).map(mapMessageRow)
  }
  return getDb().contactMessages || []
}

export async function addContactMessage(
  msg: Omit<ContactMessageItem, "id" | "createdAt" | "status">,
): Promise<ContactMessageItem> {
  const mode = requireStorageMode()
  const newItem: ContactMessageItem = {
    ...msg,
    id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    status: "yangi",
    createdAt: new Date().toISOString(),
  }

  if (mode === "supabase") {
    const { error } = await supabase!.from("contact_messages").insert({
      id: newItem.id,
      name: newItem.name,
      email: newItem.email || "",
      phone: newItem.phone || "",
      subject: newItem.subject || "",
      message: newItem.message,
      status: newItem.status,
      created_at: newItem.createdAt,
    })
    if (error) throw dbError("murojaatni saqlash", error.message)
    return newItem
  }

  const db = getDb()
  if (!db.contactMessages) db.contactMessages = []
  db.contactMessages.unshift(newItem)
  if (!saveDb(db)) throw new StorageError("Murojaatni lokal faylga yozib bo'lmadi")
  return newItem
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageItem["status"],
): Promise<ContactMessageItem | null> {
  if (requireStorageMode() === "supabase") {
    const { data, error } = await supabase!
      .from("contact_messages")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle()
    if (error) throw dbError("murojaatni yangilash", error.message)
    return data ? mapMessageRow(data) : null
  }

  const db = getDb()
  const item = (db.contactMessages || []).find((m) => m.id === id)
  if (!item) return null
  item.status = status
  item.updatedAt = new Date().toISOString()
  saveDb(db)
  return item
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (requireStorageMode() === "supabase") {
    const { data, error } = await supabase!.from("contact_messages").delete().eq("id", id).select("id")
    if (error) throw dbError("murojaatni o'chirish", error.message)
    return (data?.length ?? 0) > 0
  }

  const db = getDb()
  const before = (db.contactMessages || []).length
  db.contactMessages = (db.contactMessages || []).filter((m) => m.id !== id)
  if (db.contactMessages.length === before) return false
  saveDb(db)
  return true
}

// Teachers functions
const TEACHERS_JSON_PATH = path.join(process.cwd(), "lib", "data", "teachers.json")
const CERTIFICATES_JSON_PATH = path.join(process.cwd(), "lib", "data", "certificates.json")

function readStaticTeachers(): TeacherItem[] {
  try {
    if (fs.existsSync(TEACHERS_JSON_PATH)) {
      const list = JSON.parse(fs.readFileSync(TEACHERS_JSON_PATH, "utf-8")) as TeacherItem[]
      if (Array.isArray(list) && list.length > 0) return list
    }
  } catch (err) {
    console.warn("[Teachers] teachers.json o'qilmadi:", err)
  }
  return getDb().teachers || []
}

// Statik ro'yxat (lib/data/teachers.json) + Supabase'dagi `teachers` jadvali (tahrirlar, yangilar, o'chirilganlar)
export async function getTeachers(): Promise<TeacherItem[]> {
  const base = readStaticTeachers()
  if (!(isSupabaseConfigured && supabase)) return base
  const { data, error } = await supabase.from("teachers").select("id, data, deleted").limit(5000)
  if (error) {
    console.error("[Supabase] teachers o'qish:", error.message)
    return base
  }
  const rows = new Map<number, { data: TeacherItem; deleted: boolean }>()
  for (const r of data || []) rows.set(r.id, { data: r.data as TeacherItem, deleted: !!r.deleted })
  const result: TeacherItem[] = []
  for (const t of base) {
    const row = rows.get(t.id)
    if (!row) result.push(t)
    else if (!row.deleted) result.push({ ...t, ...row.data, id: t.id })
  }
  const baseIds = new Set(base.map((t) => t.id))
  for (const [id, row] of rows) {
    if (!baseIds.has(id) && !row.deleted) result.push({ ...row.data, id })
  }
  return result
}

export async function getNextTeacherId(): Promise<number> {
  let max = readStaticTeachers().reduce((m, t) => Math.max(m, t.id), 0)
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("teachers").select("id").order("id", { ascending: false }).limit(1)
    if (data && data[0]) max = Math.max(max, data[0].id)
  }
  return max + 1
}

export async function saveTeacher(item: TeacherItem): Promise<TeacherItem> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("teachers").upsert({
      id: item.id,
      data: item,
      deleted: false,
      updated_at: new Date().toISOString(),
    })
    if (error) throw dbError("o'qituvchini saqlash", error.message)
    return item
  }
  const db = getDb()
  const index = db.teachers.findIndex((t) => t.id === item.id)
  if (index >= 0) db.teachers[index] = item
  else db.teachers.push(item)
  if (!saveDb(db)) throw new StorageError(READONLY_MSG)
  try {
    if (fs.existsSync(TEACHERS_JSON_PATH)) {
      const list = JSON.parse(fs.readFileSync(TEACHERS_JSON_PATH, "utf-8")) as TeacherItem[]
      const idx = list.findIndex((t) => t.id === item.id)
      if (idx >= 0) list[idx] = item
      else list.push(item)
      fs.writeFileSync(TEACHERS_JSON_PATH, JSON.stringify(list, null, 2), "utf-8")
    }
  } catch (err) {
    console.error("[Teachers] teachers.json yangilanmadi:", err)
  }
  return item
}

export async function deleteTeacher(id: number): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const current = (await getTeachers()).find((t) => t.id === id)
    if (!current) return false
    const { error } = await supabase.from("teachers").upsert({
      id,
      data: current,
      deleted: true,
      updated_at: new Date().toISOString(),
    })
    if (error) throw dbError("o'qituvchini o'chirish", error.message)
    return true
  }
  const db = getDb()
  const initialLen = db.teachers.length
  db.teachers = db.teachers.filter((t) => t.id !== id)
  if (db.teachers.length !== initialLen && !saveDb(db)) throw new StorageError(READONLY_MSG)
  try {
    if (fs.existsSync(TEACHERS_JSON_PATH)) {
      let list = JSON.parse(fs.readFileSync(TEACHERS_JSON_PATH, "utf-8")) as TeacherItem[]
      list = list.filter((t) => t.id !== id)
      fs.writeFileSync(TEACHERS_JSON_PATH, JSON.stringify(list, null, 2), "utf-8")
    }
  } catch (err) {
    console.error("[Teachers] teachers.json'dan o'chirilmadi:", err)
  }
  return true
}

// Kichik kalit-qiymat saqlash (Telegram sinxronlash holati uchun)
export async function kvGet<T>(key: string): Promise<T | null> {
  if (!(isSupabaseConfigured && supabase)) return null
  const { data } = await supabase.from("site_kv").select("value").eq("key", key).maybeSingle()
  return (data?.value as T) ?? null
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  if (!(isSupabaseConfigured && supabase)) return
  const { error } = await supabase
    .from("site_kv")
    .upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) console.error("[Supabase] site_kv yozish:", error.message)
}

// Student Certificates Archive functions (Excel import + 23.10 ERP data)
export function getCertificates(): CertificateItem[] {
  try {
    if (fs.existsSync(CERTIFICATES_JSON_PATH)) {
      const raw = fs.readFileSync(CERTIFICATES_JSON_PATH, "utf-8")
      const list = JSON.parse(raw) as CertificateItem[]
      if (Array.isArray(list)) return list
    }
  } catch (err) {
    console.error("[Certificates] Error reading certificates.json:", err)
  }
  return []
}

export function saveCertificate(item: CertificateItem): CertificateItem {
  const list = getCertificates()
  const idx = list.findIndex((c) => c.id === item.id)
  if (idx >= 0) {
    list[idx] = item
  } else {
    list.unshift(item)
  }
  try {
    fs.writeFileSync(CERTIFICATES_JSON_PATH, JSON.stringify(list, null, 2), "utf-8")
  } catch (err) {
    console.error("[Certificates] Failed to save certificates.json:", err)
    throw new StorageError(READONLY_MSG)
  }
  return item
}

// Achievements functions
export function getAchievements(): AchievementItem[] {
  const db = getDb()
  return db.achievements || []
}

// Gallery functions
export function getGallery(): GalleryItem[] {
  const db = getDb()
  return db.gallery || []
}
