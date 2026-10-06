import fs from "fs"
import path from "path"
import { NewsItem, ApplicationItem, AchievementItem, TeacherItem, GalleryItem, ContactMessageItem } from "./types"
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

// News functions
export function getNews(status: "all" | "published" | "pending" = "published"): NewsItem[] {
  const db = getDb()
  if (status === "all") return db.news
  return db.news.filter((n) => n.status === status)
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  const db = getDb()
  return db.news.find((n) => n.slug === slug || n.id === slug)
}

export function saveNewsItem(item: NewsItem): NewsItem {
  const db = getDb()
  const index = db.news.findIndex((n) => n.id === item.id)
  if (index >= 0) {
    db.news[index] = item
  } else {
    db.news.unshift(item)
  }
  saveDb(db)
  return item
}

export function deleteNewsItem(id: string): boolean {
  const db = getDb()
  const initialLen = db.news.length
  db.news = db.news.filter((n) => n.id !== id)
  if (db.news.length !== initialLen) {
    saveDb(db)
    return true
  }
  return false
}

// Applications functions
export async function getApplications(): Promise<ApplicationItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && Array.isArray(data)) {
        return data.map((row: any) => ({
          id: row.id,
          studentName: row.student_name ?? row.studentName ?? "",
          parentName: row.parent_name ?? row.parentName ?? "",
          phone: row.phone ?? "",
          grade: row.grade ?? "5-sinf",
          region: row.region ?? "Urganch shahar",
          message: row.message ?? "",
          status: row.status ?? "yangi",
          createdAt: row.created_at ?? row.createdAt ?? new Date().toISOString(),
          updatedAt: row.updated_at ?? row.updatedAt,
          notes: row.notes ?? "",
        }))
      }
      if (error) {
        console.warn("[Supabase] Failed to fetch applications, falling back to local:", error.message)
      }
    } catch (err) {
      console.warn("[Supabase] Applications fetch exception, falling back:", err)
    }
  }

  const db = getDb()
  return db.applications || []
}

export async function addApplication(
  app: Omit<ApplicationItem, "id" | "createdAt" | "status">
): Promise<ApplicationItem> {
  const newItem: ApplicationItem = {
    ...app,
    id: "app-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    status: "yangi",
    createdAt: new Date().toISOString(),
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("applications").insert({
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
      if (error) {
        console.error("[Supabase] Error saving application to Supabase:", error.message)
      } else {
        console.log(`[Supabase] Application successfully saved: ID=${newItem.id}`)
      }
    } catch (err) {
      console.error("[Supabase] Insert application exception:", err)
    }
  }

  // Also save to local db for offline development if possible
  try {
    const db = getDb()
    if (!db.applications) db.applications = []
    db.applications.unshift(newItem)
    saveDb(db)
  } catch (err) {
    // In serverless read-only environment, ignore local fs write errors
  }

  return newItem
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationItem["status"],
  notes?: string,
): Promise<ApplicationItem | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const updatePayload: Record<string, any> = {
        status,
        updated_at: new Date().toISOString(),
      }
      if (notes !== undefined) updatePayload.notes = notes

      const { data, error } = await supabase
        .from("applications")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single()

      if (!error && data) {
        return {
          id: data.id,
          studentName: data.student_name ?? data.studentName ?? "",
          parentName: data.parent_name ?? data.parentName ?? "",
          phone: data.phone ?? "",
          grade: data.grade ?? "5-sinf",
          region: data.region ?? "Urganch shahar",
          message: data.message ?? "",
          status: data.status ?? "yangi",
          createdAt: data.created_at ?? data.createdAt,
          updatedAt: data.updated_at ?? data.updatedAt,
          notes: data.notes ?? "",
        }
      }
      if (error) {
        console.warn("[Supabase] Failed to update application:", error.message)
      }
    } catch (err) {
      console.warn("[Supabase] Update application error:", err)
    }
  }

  const db = getDb()
  const app = db.applications.find((a) => a.id === id)
  if (!app) return null
  app.status = status
  app.updatedAt = new Date().toISOString()
  if (notes !== undefined) app.notes = notes
  try {
    saveDb(db)
  } catch {
    // Ignore read-only fs error
  }
  return app
}

export async function deleteApplication(id: string): Promise<boolean> {
  let supabaseDeleted = false
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("applications").delete().eq("id", id)
      if (!error) supabaseDeleted = true
      else console.warn("[Supabase] Delete application error:", error.message)
    } catch (err) {
      console.warn("[Supabase] Delete application exception:", err)
    }
  }

  const db = getDb()
  const initialLen = db.applications.length
  db.applications = db.applications.filter((a) => a.id !== id)
  if (db.applications.length !== initialLen) {
    try {
      saveDb(db)
    } catch {}
    return true
  }
  return supabaseDeleted
}

// Contact Messages functions (Murojaatlar)
export async function getContactMessages(): Promise<ContactMessageItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && Array.isArray(data)) {
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email || "",
          phone: row.phone || "",
          subject: row.subject || "",
          message: row.message || "",
          status: row.status || "yangi",
          createdAt: row.created_at || row.createdAt || new Date().toISOString(),
          updatedAt: row.updated_at || row.updatedAt,
        }))
      }
      if (error) {
        console.warn("[Supabase] Failed to fetch contact messages:", error.message)
      }
    } catch (err) {
      console.warn("[Supabase] Contact messages fetch exception:", err)
    }
  }

  const db = getDb()
  return db.contactMessages || []
}

export async function addContactMessage(
  msg: Omit<ContactMessageItem, "id" | "createdAt" | "status">
): Promise<ContactMessageItem> {
  const newItem: ContactMessageItem = {
    ...msg,
    id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    status: "yangi",
    createdAt: new Date().toISOString(),
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("contact_messages").insert({
        id: newItem.id,
        name: newItem.name,
        email: newItem.email || "",
        phone: newItem.phone || "",
        subject: newItem.subject || "",
        message: newItem.message,
        status: newItem.status,
        created_at: newItem.createdAt,
      })
      if (error) {
        console.error("[Supabase] Error saving contact message:", error.message)
      }
    } catch (err) {
      console.error("[Supabase] Insert contact message exception:", err)
    }
  }

  try {
    const db = getDb()
    if (!db.contactMessages) db.contactMessages = []
    db.contactMessages.unshift(newItem)
    saveDb(db)
  } catch (err) {
    // Ignore in serverless
  }

  return newItem
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageItem["status"],
): Promise<ContactMessageItem | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          email: data.email || "",
          phone: data.phone || "",
          subject: data.subject || "",
          message: data.message,
          status: data.status,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        }
      }
    } catch (err) {
      console.warn("[Supabase] Error updating contact message:", err)
    }
  }

  const db = getDb()
  if (!db.contactMessages) return null
  const item = db.contactMessages.find((m) => m.id === id)
  if (!item) return null
  item.status = status
  item.updatedAt = new Date().toISOString()
  try {
    saveDb(db)
  } catch {}
  return item
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  let supabaseDeleted = false
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id)
      if (!error) supabaseDeleted = true
    } catch (err) {
      console.warn("[Supabase] Error deleting contact message:", err)
    }
  }

  const db = getDb()
  if (!db.contactMessages) return supabaseDeleted
  const initialLen = db.contactMessages.length
  db.contactMessages = db.contactMessages.filter((m) => m.id !== id)
  if (db.contactMessages.length !== initialLen) {
    try {
      saveDb(db)
    } catch {}
    return true
  }
  return supabaseDeleted
}

// Teachers functions
export function getTeachers(): TeacherItem[] {
  const db = getDb()
  return db.teachers || []
}

export function saveTeacher(item: TeacherItem): TeacherItem {
  const db = getDb()
  const index = db.teachers.findIndex((t) => t.id === item.id)
  if (index >= 0) {
    db.teachers[index] = item
  } else {
    db.teachers.push(item)
  }
  saveDb(db)
  return item
}

export function deleteTeacher(id: number): boolean {
  const db = getDb()
  const initialLen = db.teachers.length
  db.teachers = db.teachers.filter((t) => t.id !== id)
  if (db.teachers.length !== initialLen) {
    saveDb(db)
    return true
  }
  return false
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
