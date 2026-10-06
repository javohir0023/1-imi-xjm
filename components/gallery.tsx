"use client"

import { useState } from "react"
import Image from "next/image"
import { Image as ImageIcon, Camera } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getInitialGallery } from "@/lib/data/initial-data"

export default function Gallery() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState<string>("all")

  const t = {
    uz: {
      badge: "Fotolavhalar",
      title: "Maktab Galereyasi",
      subtitle:
        "Urganch 1-son ixtisoslashtirilgan maktab-internatining zamonaviy binosi, laboratoriyalari va o'quv jarayonidan fotolavhalar.",
      all: "Barchasi",
      campus: "Bino va Kampus",
      labs: "Laboratoriyalar",
      events: "Tadbirlar",
      students: "O'quvchilar",
    },
    ru: {
      badge: "Фотогалерея",
      title: "Галерея школы",
      subtitle:
        "Фотографии современного кампуса, лабораторий и мероприятий Урганчской специализированной школы-интерната №1.",
      all: "Все",
      campus: "Кампус и здание",
      labs: "Лаборатории",
      events: "Мероприятия",
      students: "Учащиеся",
    },
    en: {
      badge: "Visual Archive",
      title: "Campus Gallery",
      subtitle:
        "Photographic records of our state-of-the-art campus, laboratories, academic events, and student life.",
      all: "All",
      campus: "Campus",
      labs: "Laboratories",
      events: "Events",
      students: "Students",
    },
  }[language]

  const items = getInitialGallery()

  const filtered = items.filter((item) => {
    if (filter === "all") return true
    return item.category === filter
  })

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#F7F9FC] dark:bg-[#071324] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Camera size={14} />
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
            { id: "campus", label: t.campus },
            { id: "labs", label: t.labs },
            { id: "events", label: t.events },
            { id: "students", label: t.students },
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

        {/* Responsive Image Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const title = item.title[language] || item.title.uz
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-xs h-72"
              >
                <Image
                  src={item.imageUrl}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                      {item.category}
                    </span>
                    <h3 className="text-white text-sm font-bold leading-snug mt-1">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
