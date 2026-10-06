"use client"

import { useState } from "react"
import { Trophy, Medal, Award, Globe, Star, Sparkles, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getInitialAchievements } from "@/lib/data/initial-data"

export default function Achievements() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState<string>("all")

  const t = {
    uz: {
      badge: "Xalqaro va Respublika Natijalari",
      title: "Maktabimiz Yutuqlari",
      subtitle:
        "O'quvchilarimiz va ustozlarimizning xalqaro fan olimpiadalari, DTM imtihonlari va nufuzli ko'riklardagi yuksak natijalari.",
      all: "Barcha yutuqlar",
      international: "Xalqaro Olimpiadalar",
      academic: "Akademik & DTM",
      university: "Universitet & Grantlar",
      creative: "Ijodiy & Startaplar",
      viewProfileBtn: "Barcha yutuqlar ro'yxati Maktab profilida",
    },
    ru: {
      badge: "Международные и республиканские результаты",
      title: "Достижения нашей школы",
      subtitle:
        "Высокие результаты наших учащихся и педагогов на международных олимпиадах, экзаменах DTM и конкурсах.",
      all: "Все достижения",
      international: "Международные",
      academic: "Академические & DTM",
      university: "Вузы & Гранты",
      creative: "Творчество & Стартапы",
      viewProfileBtn: "Полный список достижений в Профиле школы",
    },
    en: {
      badge: "International & National Records",
      title: "Institutional Achievements",
      subtitle:
        "Distinguished outcomes of our students and faculty at international science olympiads, DTM assessments, and global admissions.",
      all: "All Achievements",
      international: "International",
      academic: "Academic & DTM",
      university: "Universities & Grants",
      creative: "Creative & Startups",
      viewProfileBtn: "View complete records in School Profile",
    },
  }[language]

  const achievements = getInitialAchievements()

  const filtered = achievements.filter((item) => {
    if (filter === "all") return true
    return item.category === filter
  })

  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#F7F9FC] dark:bg-[#071324] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Trophy size={14} className="text-[#C9A227]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: "all", label: t.all },
            { id: "international", label: t.international },
            { id: "academic", label: t.academic },
            { id: "university", label: t.university },
            { id: "creative", label: t.creative },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === tab.id
                  ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#0B1F3A] dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Achievements Cards Grid (NO RAW CERTIFICATE TABLE) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filtered.map((item) => {
            const title = item.title[language] || item.title.uz
            const desc = item.description[language] || item.description.uz
            return (
              <div
                key={item.id}
                className="academic-card p-6 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold text-[#123B66] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                      {item.year}
                    </span>
                    {item.badgeText && (
                      <span className="text-[11px] font-bold text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-0.5 rounded-full border border-[#C9A227]/20">
                        {item.badgeText}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-[#0B1F3A] dark:text-white text-base mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed mb-4">
                    {desc}
                  </p>
                </div>

                {item.level && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Globe size={12} className="text-[#C9A227]" />
                      <span>{item.level} miqyosida</span>
                    </span>
                    <span className="text-[#0B1F3A] dark:text-slate-300 font-bold">1-IMI</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* School Profile PDF Link Banner */}
        <div className="p-6 rounded-2xl bg-[#0B1F3A] text-white flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A227] flex-shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Barcha 103 ta olimpiada mukofotlari va bitiruvchilar statistikasi
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Maktabning rasmiy 2025–2026 Maktab profilida to'liq hujjatlashtirilgan.
              </div>
            </div>
          </div>
          <a
            href="/school-profile"
            className="px-5 py-2.5 bg-[#C9A227] hover:bg-[#d8b030] text-[#0B1F3A] text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm"
          >
            <span>{t.viewProfileBtn}</span>
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
