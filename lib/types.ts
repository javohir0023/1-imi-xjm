export type Language = "uz" | "ru" | "en"

export interface LocalizedString {
  uz: string
  ru: string
  en: string
}

export interface NewsItem {
  id: string
  slug: string
  title: LocalizedString
  excerpt: LocalizedString
  content: LocalizedString
  category: "Hamkorlik" | "Maktab hayoti" | "Olimpiada" | "Yutuqlar" | "Qabul" | "Tadbirlar"
  imageUrl?: string
  publishedAt: string
  telegramPostUrl?: string
  telegramMessageId?: number
  status: "published" | "pending" | "archived"
  views?: number
  source?: string
  author?: string
}

export interface ApplicationItem {
  id: string
  studentName: string
  parentName: string
  phone: string
  grade: string
  region: string
  message?: string
  status: "yangi" | "korib_chiqilmoqda" | "qabul_qilindi" | "rad_etildi" | "arxiv"
  createdAt: string
  updatedAt?: string
  notes?: string
}

export interface AchievementItem {
  id: string
  year: string
  title: LocalizedString
  category: "international" | "national" | "academic" | "creative" | "university"
  level: "Xalqaro" | "Respublika" | "Viloyat"
  medal?: "Oltin" | "Kumush" | "Bronza" | "1-o'rin" | "2-o'rin" | "3-o'rin"
  description: LocalizedString
  studentOrTeam?: string
  imageUrl?: string
  badgeText?: string
}

export interface TeacherItem {
  id: number
  nameUz: string
  nameRu: string
  nameEn: string
  positionUz: string
  positionRu: string
  positionEn: string
  subjectUz?: string
  qualification?: string
  degree?: string
  image?: string
  category: "administration" | "science" | "language" | "other"
  isQualified?: boolean
  bio?: LocalizedString
}

export interface GalleryItem {
  id: string
  title: LocalizedString
  category: "campus" | "events" | "labs" | "students"
  imageUrl: string
  date?: string
}
