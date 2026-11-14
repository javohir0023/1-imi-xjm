"use client"

import { useState, useEffect, useMemo } from "react"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramCTA from "@/components/telegram-cta"
import {
  Trophy,
  Award,
  Search,
  Filter,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Download,
  Calendar,
  Layers,
} from "lucide-react"
import { CertificateItem } from "@/lib/types"

function AchievementsArchiveContent() {
  const { language } = useLanguage()
  const [certificates, setCertificates] = useState<CertificateItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCertType, setSelectedCertType] = useState("all")
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 30

  const t = {
    uz: {
      badge: "Rasmiy Akademik Arxiv",
      title: "O'quvchilar Yutuqlari va Sertifikatlari Arxiv Portali",
      subtitle:
        "Urganch 1-son ixtisoslashtirilgan maktab-internati o'quvchilarining 23.10 sanali ERP bazasidagi 674 ta rasmiy milliy va xalqaro sertifikatlari.",
      searchPlaceholder: "O'quvchi ismi, o'qituvchi yoki fan bo'yicha qidiruv...",
      totalCertificates: "Jami sertifikatlar",
      uniqueRecords: "Noyob yozuvlar",
      duplicateNotice: "Dublikatlar holati",
      erpDate: "ERP ro'yxatga olish sanasi",
      allCategories: "Barcha toifalar",
      allSubjects: "Barcha fanlar",
      allLevels: "Barcha darajalar",
      allTypes: "Barcha sertifikat turlari",
      studentName: "O'quvchining F.I.Sh.",
      certType: "Sertifikat Turi",
      subject: "Fan",
      level: "Darajasi",
      score: "Ball / Natija",
      teacher: "Mas'ul Ustoz",
      dateCol: "Sana",
      statusCol: "Holati",
      erpBadge: "ERP 23.10 Rasmiy",
      duplicateTag: "Dublikat yozuv",
      verifiedTag: "Tasdiqlangan",
      noResults: "Qidiruv shartlariga mos keluvchi sertifikat topilmadi.",
      showing: "Ko'rsatilmoqda",
      from: "dan",
      records: "ta yozuv",
    },
    ru: {
      badge: "Официальный академический архив",
      title: "Архив достижений и сертификатов учащихся",
      subtitle:
        "Полный реестр из 674 национальных и международных сертификатов учащихся Урганч 1-ИМИ на основе данных ERP от 23.10.",
      searchPlaceholder: "Поиск по имени, предмету или преподавателю...",
      totalCertificates: "Всего сертификатов",
      uniqueRecords: "Уникальных записей",
      duplicateNotice: "Статус дубликатов",
      erpDate: "Дата фиксации в ERP",
      allCategories: "Все категории",
      allSubjects: "Все предметы",
      allLevels: "Все уровни",
      allTypes: "Все типы сертификатов",
      studentName: "Ф.И.О. ученика",
      certType: "Тип сертификата",
      subject: "Предмет",
      level: "Уровень",
      score: "Балл / Результат",
      teacher: "Преподаватель-наставник",
      dateCol: "Дата",
      statusCol: "Статус",
      erpBadge: "ERP 23.10 Официально",
      duplicateTag: "Дубликат",
      verifiedTag: "Подтвержден",
      noResults: "Сертификаты по вашему запросу не найдены.",
      showing: "Показано",
      from: "из",
      records: "записей",
    },
    en: {
      badge: "Accredited Academic Archive",
      title: "Student Achievements & Certificate Roster",
      subtitle:
        "The comprehensive registry of 674 official national and international certificates verified in the ERP system dated 23.10.",
      searchPlaceholder: "Search by student name, subject, or mentor...",
      totalCertificates: "Total Certificates",
      uniqueRecords: "Unique Records",
      duplicateNotice: "Duplicates Status",
      erpDate: "ERP Audit Timestamp",
      allCategories: "All Categories",
      allSubjects: "All Subjects",
      allLevels: "All Levels",
      allTypes: "All Certificate Types",
      studentName: "Student Full Name",
      certType: "Certificate Type",
      subject: "Academic Subject",
      level: "Level / Band",
      score: "Score / Result",
      teacher: "Mentor Teacher",
      dateCol: "Date",
      statusCol: "Status",
      erpBadge: "ERP 23.10 Verified",
      duplicateTag: "Duplicate Record",
      verifiedTag: "Accredited",
      noResults: "No certificate records matching your query.",
      showing: "Showing",
      from: "of",
      records: "entries",
    },
  }[language]

  // Load all certificates from API
  useEffect(() => {
    async function loadAll() {
      setLoading(true)
      try {
        const res = await fetch("/api/certificates?limit=1000")
        if (res.ok) {
          const json = await res.json()
          setCertificates(json.data || [])
        }
      } catch (err) {
        console.error("Failed to fetch certificates:", err)
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  // Extract filter option sets
  const subjects = useMemo(() => {
    const set = new Set<string>()
    certificates.forEach((c) => {
      if (c.subject) set.add(c.subject)
    })
    return Array.from(set).sort()
  }, [certificates])

  const certTypes = useMemo(() => {
    const set = new Set<string>()
    certificates.forEach((c) => {
      if (c.certType) set.add(c.certType)
    })
    return Array.from(set).sort()
  }, [certificates])

  const levels = useMemo(() => {
    const set = new Set<string>()
    certificates.forEach((c) => {
      if (c.level) set.add(c.level)
    })
    return Array.from(set).sort()
  }, [certificates])

  // Filtered dataset
  const filtered = useMemo(() => {
    return certificates.filter((item) => {
      if (showDuplicatesOnly && !item.isDuplicate) return false

      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false
      }
      if (selectedSubject !== "all" && item.subject !== selectedSubject) {
        return false
      }
      if (selectedCertType !== "all" && item.certType !== selectedCertType) {
        return false
      }
      if (selectedLevel !== "all" && item.level !== selectedLevel) {
        return false
      }

      if (search) {
        const q = search.toLowerCase()
        const matchName = item.studentName.toLowerCase().includes(q)
        const matchTeacher = item.teacher.toLowerCase().includes(q)
        const matchSubject = item.subject.toLowerCase().includes(q)
        const matchType = item.certType.toLowerCase().includes(q)
        if (!matchName && !matchTeacher && !matchSubject && !matchType) return false
      }

      return true
    })
  }, [
    certificates,
    search,
    selectedCategory,
    selectedSubject,
    selectedCertType,
    selectedLevel,
    showDuplicatesOnly,
  ])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [search, selectedCategory, selectedSubject, selectedCertType, selectedLevel, showDuplicatesOnly])

  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paginatedRecords = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#10243A] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
              <Trophy size={14} className="text-[#C6A15B]" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {t.subtitle}
            </p>

            {/* Quick Stats Summary Pill */}
            <div className="pt-4 flex flex-wrap gap-3 text-xs">
              <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                <span className="text-slate-400 mr-1.5">{t.totalCertificates}:</span>
                <span className="font-extrabold text-[#C6A15B]">674 ta</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                <span className="text-slate-400 mr-1.5">{t.uniqueRecords}:</span>
                <span className="font-extrabold text-white">674 ta</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                <span className="text-slate-400 mr-1.5">{t.duplicateNotice}:</span>
                <span className="font-bold text-emerald-400">0 ta (tozalangan)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                <span className="text-slate-400 mr-1.5">{t.erpDate}:</span>
                <span className="font-semibold text-slate-200">23.10.2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Explorer Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Filter Bar Controls */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Field */}
              <div className="md:col-span-4 relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {/* Subject Dropdown */}
              <div className="md:col-span-3">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="all">{t.allSubjects}</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cert Type Dropdown */}
              <div className="md:col-span-3">
                <select
                  value={selectedCertType}
                  onChange={(e) => setSelectedCertType(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="all">{t.allTypes}</option>
                  {certTypes.map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Dropdown */}
              <div className="md:col-span-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="all">{t.allLevels}</option>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      Daraja: {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Filter Tags & Toggle */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3 text-xs">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[#68778A] dark:text-slate-400 font-semibold mr-1">Toifa:</span>
                {["all", "Миллий сертификат", "Халқаро сертификат"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                      selectedCategory === cat
                        ? "bg-[#10243A] text-white dark:bg-[#C6A15B] dark:text-[#10243A] font-bold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {cat === "all" ? t.allCategories : cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={showDuplicatesOnly}
                    onChange={(e) => setShowDuplicatesOnly(e.target.checked)}
                    className="rounded text-[#C6A15B] focus:ring-[#C6A15B]"
                  />
                  <span>Faqat dublikatlarni ko'rish (3 ta)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-[#10243A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3650] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#0B1726] border-b border-[#E2E8F0] dark:border-[#1E3650] text-[#172638] dark:text-slate-200 font-bold">
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4">{t.studentName}</th>
                    <th className="py-3.5 px-4">{t.certType}</th>
                    <th className="py-3.5 px-4">{t.subject}</th>
                    <th className="py-3.5 px-4">{t.level} / {t.score}</th>
                    <th className="py-3.5 px-4">{t.teacher}</th>
                    <th className="py-3.5 px-4 w-28 text-center">{t.statusCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500">
                        Sertifikatlar bazasi yuklanmoqda...
                      </td>
                    </tr>
                  ) : paginatedRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500">
                        {t.noResults}
                      </td>
                    </tr>
                  ) : (
                    paginatedRecords.map((cert, index) => {
                      const absoluteIndex = (page - 1) * pageSize + index + 1
                      return (
                        <tr
                          key={cert.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3.5 px-4 text-center font-mono text-[11px] text-slate-400">
                            {absoluteIndex}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#10243A] dark:text-white">
                            {cert.studentName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            <div className="font-medium">{cert.certType}</div>
                            <div className="text-[10px] text-slate-400">{cert.category}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#183650] dark:text-blue-300 font-semibold text-[11px]">
                              {cert.subject}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-[#C6A15B] mr-1.5">{cert.level}</span>
                            {cert.score && (
                              <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                                ({cert.score})
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                            {cert.teacher || "—"}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {cert.isDuplicate ? (
                              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 text-[10px] font-bold">
                                {t.duplicateTag}
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-[10px] font-bold">
                                {t.verifiedTag}
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 bg-slate-50 dark:bg-[#0B1726] border-t border-[#E2E8F0] dark:border-[#1E3650] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <div className="text-[#68778A] dark:text-slate-400">
                {t.showing} <span className="font-bold text-[#172638] dark:text-white">{filtered.length > 0 ? (page - 1) * pageSize + 1 : 0}</span>-
                <span className="font-bold text-[#172638] dark:text-white">
                  {Math.min(page * pageSize, filtered.length)}
                </span>{" "}
                {t.from} <span className="font-bold text-[#172638] dark:text-white">{filtered.length}</span> {t.records}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-lg bg-white dark:bg-[#10243A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-3 font-semibold text-slate-700 dark:text-slate-200">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg bg-white dark:bg-[#10243A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TelegramCTA />
      <Footer />
    </div>
  )
}

export default function AchievementsPage() {
  return (
    <LanguageProvider>
      <AchievementsArchiveContent />
    </LanguageProvider>
  )
}
