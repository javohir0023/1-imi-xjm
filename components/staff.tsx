"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, GraduationCap, Award, ChevronRight, BookOpen, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { TeacherItem } from "@/lib/types"

export default function Staff() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [teachers, setTeachers] = useState<TeacherItem[]>([])
  const [loading, setLoading] = useState(false)

  const t = {
    uz: {
      badge: "Pedagogik Tarkib",
      title: "Maktab Rahbariyati va Pedagoglar Jamoasi",
      subtitle:
        "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimidagi malakali ustozlar, fan nomzodlari va xalqaro sertifikatga ega pedagoglar.",
      all: "Barchasi",
      administration: "Rahbariyat",
      science: "Aniq va Tabiiy fanlar",
      languageTab: "Til fanlari",
      viewAllBtn: "Barcha 79 nafar xodim va o'qituvchilar ro'yxati",
    },
    ru: {
      badge: "Педагогический состав",
      title: "Руководство и педагогический коллектив",
      subtitle:
        "Квалифицированные преподаватели, кандидаты наук (PhD) и сертифицированные наставники школы-интерната №1.",
      all: "Все",
      administration: "Руководство",
      science: "Точные и естественные науки",
      languageTab: "Языковые дисциплины",
      viewAllBtn: "Весь список из 79 сотрудников и педагогов",
    },
    en: {
      badge: "Faculty & Leadership",
      title: "School Leadership & Academic Faculty",
      subtitle:
        "Qualified educators, doctorate degree holders, and internationally certified mentors within the Agency network.",
      all: "All",
      administration: "Leadership",
      science: "Exact & Natural Sciences",
      languageTab: "Languages",
      viewAllBtn: "View Complete 79 Faculty & Staff Directory",
    },
  }[language]

  useEffect(() => {
    async function loadTeachers() {
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
    loadTeachers()
  }, [])

  const filteredTeachers = teachers.filter((member) => {
    if (activeCategory === "all") return true
    if (activeCategory === "language") return member.category === "language"
    return member.category === activeCategory
  })

  // Prioritize showing those with authentic portraits on the homepage
  const sorted = [...filteredTeachers].sort((a, b) => {
    if (a.image && !b.image) return -1
    if (!a.image && b.image) return 1
    return 0
  })

  const displayed = sorted.slice(0, 8)

  return (
    <section id="teachers" className="py-20 md:py-28 bg-white dark:bg-[#10243A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/10 text-[#10243A] dark:text-[#C6A15B] text-xs font-bold mb-3 border border-[#C6A15B]/20">
            <Users size={14} className="text-[#C6A15B]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172638] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#68778A] dark:text-slate-300 leading-relaxed font-normal">
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
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeCategory === cat.id
                  ? "bg-[#10243A] text-white shadow-xs dark:bg-[#C6A15B] dark:text-[#10243A]"
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
              className="p-6 rounded-2xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] text-center flex flex-col justify-between hover:border-[#C6A15B] transition-all hover:shadow-md group"
            >
              <div>
                <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#C6A15B] shadow-xs bg-slate-200">
                  <Image
                    src={member.image || "/images/logo.jpg"}
                    alt={member.nameUz}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-bold text-[#172638] dark:text-white text-sm mb-1 leading-snug">
                  {member.nameUz}
                </h3>

                <p className="text-xs text-[#183650] dark:text-sky-300 font-semibold mb-3">
                  {member.positionUz}
                </p>
              </div>

              <div className="pt-2">
                {member.subjectUz && (
                  <span className="inline-block px-2.5 py-1 rounded-md bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] text-[11px] font-semibold text-[#10243A] dark:text-[#C6A15B]">
                    {member.subjectUz}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all faculty CTA */}
        <div className="text-center">
          <Link href="/teachers">
            <button className="px-6 py-3.5 bg-[#10243A] hover:bg-[#183650] text-white dark:bg-[#C6A15B] dark:text-[#10243A] text-xs font-bold rounded-xl transition-all shadow-sm inline-flex items-center gap-2">
              <span>{t.viewAllBtn}</span>
              <ChevronRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
