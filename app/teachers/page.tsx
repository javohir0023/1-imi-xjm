"use client"

import { useState } from "react"
import Image from "next/image"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Users, GraduationCap, Award, Search, BookOpen, ShieldCheck } from "lucide-react"
import { getInitialTeachers } from "@/lib/data/initial-data"

function TeachersPageContent() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const t = {
    uz: {
      badge: "Pedagoglar Tarkibi",
      title: "Urganch 1-IMI Pedagogik Jamoasi",
      subtitle:
        "44 nafar tajribali va malakali o'qituvchilar: 2 nafar fan doktori (PhD), 22 nafar magistr va 95.4% oliy davlat toifasidagi pedagoglar.",
      searchPlaceholder: "O'qituvchi ismi yoki fan bo'yicha qidiruv...",
      all: "Barchasi",
      administration: "Rahbariyat",
      science: "Aniq & Tabiiy fanlar",
      languageTab: "Til fanlari",
      other: "Boshqa mutaxassislar",
      noResults: "Qidiruv bo'yicha pedagoglar topilmadi.",
    },
    ru: {
      badge: "Педагогический состав",
      title: "Педагогический коллектив Урганч 1-ИМИ",
      subtitle:
        "44 квалифицированных преподавателя: 2 доктора философии (PhD), 22 магистра и 95.4% специалистов высшей государственной категории.",
      searchPlaceholder: "Поиск по имени или предмету...",
      all: "Все",
      administration: "Руководство",
      science: "Точные и естественные науки",
      languageTab: "Языковые дисциплины",
      other: "Другие специалисты",
      noResults: "Педагоги не найдены.",
    },
    en: {
      badge: "Faculty Directory",
      title: "Urganch 1-IMI Academic Faculty",
      subtitle:
        "44 dedicated faculty members: 2 PhDs, 22 master's degree holders, and 95.4% holding highest state category appointments.",
      searchPlaceholder: "Search by name or subject...",
      all: "All",
      administration: "Administration",
      science: "Exact & Natural Sciences",
      languageTab: "Languages",
      other: "Other Specialists",
      noResults: "No faculty members found.",
    },
  }[language]

  const teachers = getInitialTeachers()

  const categories = [
    { id: "all", label: t.all },
    { id: "administration", label: t.administration },
    { id: "science", label: t.science },
    { id: "language", label: t.languageTab },
    { id: "other", label: t.other },
  ]

  const filteredTeachers = teachers.filter((member) => {
    const name = (member.nameUz + " " + member.nameRu + " " + member.nameEn).toLowerCase()
    const pos = (member.positionUz + " " + member.positionRu + " " + member.positionEn).toLowerCase()
    const subj = (member.subjectUz || "").toLowerCase()
    const query = searchQuery.toLowerCase()

    const matchesSearch = !searchQuery || name.includes(query) || pos.includes(query) || subj.includes(query)
    const matchesCategory = activeCategory === "all" || member.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const getName = (member: (typeof teachers)[0]) => {
    if (language === "ru") return member.nameRu
    if (language === "en") return member.nameEn
    return member.nameUz
  }

  const getPosition = (member: (typeof teachers)[0]) => {
    if (language === "ru") return member.positionRu
    if (language === "en") return member.positionEn
    return member.positionUz
  }

  return (
    <div className="bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9A227] text-xs font-bold">
              <Users size={14} />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.title}
            </h1>
            <p className="text-base text-slate-300 font-normal leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#0B1F3A] dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
            <Users size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-500">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTeachers.map((member) => (
              <div
                key={member.id}
                className="academic-card p-6 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-3 border-[#C9A227] shadow-xs bg-slate-200">
                    <Image
                      src={member.image || "/images/logo.jpg"}
                      alt={getName(member)}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-[#0B1F3A] dark:text-white text-sm mb-1 leading-snug">
                    {getName(member)}
                  </h3>

                  <p className="text-xs text-[#123B66] dark:text-blue-300 font-medium mb-3">
                    {getPosition(member)}
                  </p>
                </div>

                <div>
                  {member.degree && (
                    <div className="inline-block px-2.5 py-1 rounded-md bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-[#0B1F3A] dark:text-slate-200 mb-2">
                      {member.degree}
                    </div>
                  )}
                  {member.qualification && !member.degree && (
                    <div className="inline-block px-2.5 py-1 rounded-md bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-2">
                      {member.qualification}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
