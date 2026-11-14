"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramCTA from "@/components/telegram-cta"
import { Users, GraduationCap, Award, Search, BookOpen, ShieldCheck, Mail, Phone, ChevronRight } from "lucide-react"
import { TeacherItem } from "@/lib/types"

function TeachersPageContent() {
  const { language } = useLanguage()
  const [teachers, setTeachers] = useState<TeacherItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const t = {
    uz: {
      badge: "Pedagogik Tarkib",
      title: "Urganch 1-IMI Ustozlar va Xodimlar Tarkibi",
      subtitle:
        "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tasarrufidagi maktabimizning barcha 79 nafar oliy toifali pedagog va xodimlari.",
      searchPlaceholder: "O'qituvchi ismi yoki fan bo'yicha qidiruv...",
      all: "Barcha xodimlar",
      administration: "Rahbariyat va boshqaruv",
      science: "Aniq va Tabiiy fanlar",
      languageTab: "Til fanlari",
      other: "Boshqa fanlar",
      adjunct: "O'rindosh o'qituvchilar",
      technical: "Texnik xodimlar",
      noResults: "Qidiruv bo'yicha pedagoglar topilmadi.",
      totalStaff: "Jami xodimlar",
      mainTeachers: "Asosiy o'qituvchilar",
      certifiedBadge: "Agentlik attestatsiyasidan o'tgan",
    },
    ru: {
      badge: "Педагогический состав",
      title: "Педагогический коллектив и сотрудники Урганч 1-ИМИ",
      subtitle:
        "Реестр всех 79 квалифицированных преподавателей и сотрудников специализированной школы-интерната №1 г. Ургенча.",
      searchPlaceholder: "Поиск по имени или предмету...",
      all: "Все сотрудники",
      administration: "Руководство",
      science: "Точные и естественные науки",
      languageTab: "Языковые дисциплины",
      other: "Другие предметы",
      adjunct: "Совместители",
      technical: "Технический персонал",
      noResults: "Сотрудники не найдены.",
      totalStaff: "Всего сотрудников",
      mainTeachers: "Основных преподавателей",
      certifiedBadge: "Аттестованные специалисты",
    },
    en: {
      badge: "Faculty & Administration",
      title: "Urganch 1-IMI Faculty & Academic Staff",
      subtitle:
        "Complete roster of all 79 educators, leaders, and support specialists operating under the Agency network.",
      searchPlaceholder: "Search by name or subject...",
      all: "All Staff",
      administration: "Leadership & Administration",
      science: "Exact & Natural Sciences",
      languageTab: "Languages",
      other: "Other Disciplines",
      adjunct: "Adjunct Faculty",
      technical: "Support Staff",
      noResults: "No faculty members found.",
      totalStaff: "Total Staff",
      mainTeachers: "Core Faculty",
      certifiedBadge: "Agency Certified",
    },
  }[language]

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch("/api/teachers")
        if (res.ok) {
          const data = await res.json()
          setTeachers(data.data || [])
        }
      } catch (err) {
        console.error("Failed to load teachers:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const categories = [
    { id: "all", label: t.all },
    { id: "administration", label: t.administration },
    { id: "science", label: t.science },
    { id: "language", label: t.languageTab },
    { id: "other", label: t.other },
    { id: "adjunct", label: t.adjunct },
    { id: "technical", label: t.technical },
  ]

  const filteredTeachers = useMemo(() => {
    return teachers.filter((member) => {
      const name = (member.nameUz + " " + (member.nameRu || "") + " " + (member.nameEn || "")).toLowerCase()
      const pos = (member.positionUz + " " + (member.positionRu || "") + " " + (member.positionEn || "")).toLowerCase()
      const subj = (member.subjectUz || "").toLowerCase()
      const query = searchQuery.toLowerCase().trim()

      const matchesSearch = !query || name.includes(query) || pos.includes(query) || subj.includes(query)
      const matchesCategory = activeCategory === "all" || member.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [teachers, searchQuery, activeCategory])

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero Header Banner */}
      <section className="bg-[#10243A] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
              <Users size={14} className="text-[#C6A15B]" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {t.subtitle}
            </p>

            <div className="pt-3 flex flex-wrap gap-3 text-xs">
              <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                <span className="text-slate-400 mr-1.5">{t.totalStaff}:</span>
                <span className="font-extrabold text-[#C6A15B]">79 nafar</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                <span className="text-slate-400 mr-1.5">{t.mainTeachers}:</span>
                <span className="font-bold text-white">45 nafar</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                <span className="text-slate-400 mr-1.5">Portretlar:</span>
                <span className="font-bold text-[#C6A15B]">31 ta haqiqiy fotosurat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#10243A] text-white shadow-xs dark:bg-[#C6A15B] dark:text-[#10243A]"
                      : "bg-[#F5F7FA] text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Teachers Cards Grid */}
          {loading ? (
            <div className="py-20 text-center text-slate-500">O'qituvchilar ma'lumotlari yuklanmoqda...</div>
          ) : filteredTeachers.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] text-slate-500">
              {t.noResults}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTeachers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] p-6 text-center flex flex-col justify-between hover:border-[#C6A15B] transition-all hover:shadow-md group"
                >
                  <div>
                    {/* Portrait Avatar */}
                    <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#C6A15B] shadow-xs bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={member.image || "/images/logo.jpg"}
                        alt={member.nameUz}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h3 className="font-extrabold text-[#172638] dark:text-white text-sm mb-1.5 leading-snug">
                      {member.nameUz}
                    </h3>

                    <p className="text-xs font-semibold text-[#183650] dark:text-sky-300 mb-2">
                      {member.positionUz}
                    </p>

                    {member.section && (
                      <span className="text-[10px] text-slate-400 font-medium block mb-3">
                        {member.section}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    {member.subjectUz && (
                      <span className="inline-block px-3 py-1 rounded-md bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] text-[11px] font-semibold text-[#10243A] dark:text-[#C6A15B]">
                        {member.subjectUz}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <TelegramCTA />
      <Footer />
    </div>
  )
}

export default function TeachersPage() {
  return (
    <LanguageProvider>
      <TeachersPageContent />
    </LanguageProvider>
  )
}
