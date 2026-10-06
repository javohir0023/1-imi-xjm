"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, GraduationCap, Award, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getInitialTeachers } from "@/lib/data/initial-data"

export default function Staff() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const t = {
    uz: {
      badge: "Pedagogik Tarkib",
      title: "Maktab Rahbariyati va O'qituvchilari",
      subtitle:
        "44 nafar tajribali pedagog: 2 nafar fan doktori (PhD), 22 nafar magistr va 95.4% oliy toifali mutaxassislar.",
      all: "Barchasi",
      administration: "Rahbariyat",
      science: "Aniq va Tabiiy fanlar",
      languageTab: "Til fanlari",
      viewAllBtn: "Barcha o'qituvchilar ro'yxati",
    },
    ru: {
      badge: "Педагогический состав",
      title: "Руководство и педагоги школы",
      subtitle:
        "44 опытных педагога: 2 доктора философии (PhD), 22 магистра и 95.4% учителей высшей категории.",
      all: "Все",
      administration: "Руководство",
      science: "Точные и естественные науки",
      languageTab: "Языковые дисциплины",
      viewAllBtn: "Все преподаватели",
    },
    en: {
      badge: "Faculty & Administration",
      title: "School Leadership & Faculty",
      subtitle:
        "44 qualified faculty members: 2 PhDs, 22 master's degree holders, and 95.4% with highest state category.",
      all: "All",
      administration: "Leadership",
      science: "Exact & Natural Sciences",
      languageTab: "Languages",
      viewAllBtn: "Complete Faculty Directory",
    },
  }[language]

  const teachers = getInitialTeachers()

  const filteredTeachers = teachers.filter((member) => {
    if (activeCategory === "all") return true
    if (activeCategory === "language") return member.category === "language"
    return member.category === activeCategory
  })

  // Show top featured on homepage
  const displayed = filteredTeachers.slice(0, 8)

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
    <section id="teachers" className="py-20 md:py-28 bg-white dark:bg-[#0B1F3A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Users size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: "all", label: t.all },
            { id: "administration", label: t.administration },
            { id: "science", label: t.science },
            { id: "language", label: t.languageTab },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Teachers grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {displayed.map((member) => (
            <div
              key={member.id}
              className="academic-card p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-between"
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
                  <div className="inline-block px-2.5 py-1 rounded-md bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-[#0B1F3A] dark:text-slate-200 mb-2">
                    {member.degree}
                  </div>
                )}
                {member.qualification && !member.degree && (
                  <div className="inline-block px-2.5 py-1 rounded-md bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {member.qualification}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all faculty CTA */}
        <div className="text-center">
          <Link href="/teachers">
            <button className="px-6 py-3 bg-[#0B1F3A] hover:bg-[#123B66] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-all shadow-xs inline-flex items-center gap-2">
              <span>{t.viewAllBtn}</span>
              <ChevronRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
