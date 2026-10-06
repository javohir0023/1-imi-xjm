import fs from "fs"
import path from "path"
import { NewsItem, ApplicationItem, AchievementItem, TeacherItem, GalleryItem } from "./types"
import { INITIAL_NEWS, INITIAL_ACHIEVEMENTS, INITIAL_TEACHERS, INITIAL_GALLERY } from "./data/initial-data"

const DB_PATH = path.join(process.cwd(), "lib", "data", "db.json")

interface DatabaseSchema {
  news: NewsItem[]
  applications: ApplicationItem[]
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
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("[Database] Error saving db.json:", error)
    return false
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
export function getApplications(): ApplicationItem[] {
  const db = getDb()
  return db.applications || []
}

export function addApplication(app: Omit<ApplicationItem, "id" | "createdAt" | "status">): ApplicationItem {
  const db = getDb()
  const newItem: ApplicationItem = {
    ...app,
    id: "app-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    status: "yangi",
    createdAt: new Date().toISOString(),
  }
  db.applications.unshift(newItem)
  saveDb(db)
  return newItem
}

export function updateApplicationStatus(
  id: string,
  status: ApplicationItem["status"],
  notes?: string,
): ApplicationItem | null {
  const db = getDb()
  const app = db.applications.find((a) => a.id === id)
  if (!app) return null
  app.status = status
  app.updatedAt = new Date().toISOString()
  if (notes !== undefined) app.notes = notes
  saveDb(db)
  return app
}

export function deleteApplication(id: string): boolean {
  const db = getDb()
  const initialLen = db.applications.length
  db.applications = db.applications.filter((a) => a.id !== id)
  if (db.applications.length !== initialLen) {
    saveDb(db)
    return true
  }
  return false
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
