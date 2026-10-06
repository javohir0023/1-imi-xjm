"use client"

import { ExternalLink, Laptop, BookOpen, UserCheck, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function SchoolModeBanner() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Raqamli Maktab Tizimi",
      title: "🏫 Maktab rejimi — O‘quvchi va maktab tizimi",
      subtitle:
        "O'quvchilar, ota-onalar va o'qituvchilar uchun interaktiv ta'lim boshqaruvi, baholar va maktab ichki platformasi.",
      cta: "Maktab rejimiga o'tish",
      item1: "O'quvchi profili va kundalik",
      item2: "Akademik o'zlashtirish tahlili",
      item3: "Ota-onalar monitoring kabineti",
    },
    ru: {
      badge: "Цифровая школа",
      title: "🏫 Режим школы — Система ученика и школы",
      subtitle:
        "Интерактивная платформа управления обучением, оценками и школьными процессами для учеников, родителей и педагогов.",
      cta: "Перейти в режим школы",
      item1: "Профиль ученика и дневник",
      item2: "Анализ успеваемости",
      item3: "Кабинет родительского контроля",
    },
    en: {
      badge: "Digital School Portal",
      title: "🏫 School Mode — Student & School System",
      subtitle:
        "Interactive academic dashboard, grade analytics, and internal student portal for learners, guardians, and educators.",
      cta: "Launch School Mode",
      item1: "Student digital records",
      item2: "Academic performance analytics",
      item3: "Parental monitoring interface",
    },
  }[language]

  return (
    <section className="py-12 md:py-16 bg-[#F7F9FC] dark:bg-[#071324] border-t border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0B1F3A] border-2 border-[#C9A227]/30 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold">
              <Laptop size={14} className="text-[#C9A227]" />
              <span>{t.badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
              {t.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
              {t.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
                {t.item1}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
                {t.item2}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
                {t.item3}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#0B1F3A] hover:bg-[#123B66] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{t.cta}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
