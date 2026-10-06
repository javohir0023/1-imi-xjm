"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, ExternalLink, Send, Newspaper } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getInitialNews } from "@/lib/data/initial-data"

export default function News() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const t = {
    uz: {
      badge: "So'nggi Yangiliklar",
      title: "Maktab Hayoti va E'lonlar",
      subtitle:
        "Urganch 1-IMI ning rasmiy Telegram kanali (@Urganch_IMI) va maktab yangiliklar tasmalaridan dolzarb xabarlar.",
      all: "Barchasi",
      readMore: "Batafsil o'qish",
      telegramSource: "Telegramda ko'rish",
      viewAllNews: "Barcha yangiliklar arxiviga o'tish",
    },
    ru: {
      badge: "Последние новости",
      title: "Жизнь школы и объявления",
      subtitle:
        "Актуальные новости из официального Telegram-канала (@Urganch_IMI) и пресс-службы Урганч 1-ИМИ.",
      all: "Все",
      readMore: "Читать подробнее",
      telegramSource: "Смотреть в Telegram",
      viewAllNews: "Перейти ко всем новостям",
    },
    en: {
      badge: "Institutional Press",
      title: "Latest News & Announcements",
      subtitle:
        "Timely updates and press releases sourced from the official school channel (@Urganch_IMI).",
      all: "All",
      readMore: "Read More",
      telegramSource: "View on Telegram",
      viewAllNews: "View All News Archive",
    },
  }[language]

  const newsItems = getInitialNews("published")

  const filteredNews = newsItems.filter((item) => {
    if (selectedCategory === "all") return true
    return item.category === selectedCategory
  })

  // Show top 6 on homepage
  const displayedNews = filteredNews.slice(0, 6)

  return (
    <section id="news" className="py-20 md:py-28 bg-white dark:bg-[#0B1F3A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Newspaper size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["all", "Yutuqlar", "Hamkorlik", "Maktab hayoti"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                selectedCategory === cat
                  ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {cat === "all" ? t.all : cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedNews.map((item) => {
            const title = item.title[language] || item.title.uz
            const excerpt = item.excerpt[language] || item.excerpt.uz
            const formattedDate = new Date(item.publishedAt).toLocaleDateString("uz-UZ", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })

            return (
              <article
                key={item.id}
                className="academic-card rounded-2xl overflow-hidden bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                    <Image
                      src={item.imageUrl || "/images/photo-2025-10-24-21-21-29.jpg"}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1F3A]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <Calendar size={14} className="text-[#C9A227]" />
                      <span>{formattedDate}</span>
                    </div>

                    <h3 className="font-bold text-[#0B1F3A] dark:text-white text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-[#123B66] dark:group-hover:text-[#C9A227] transition-colors">
                      {title}
                    </h3>

                    <p className="text-xs text-[#64748B] dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-[#0B1F3A] dark:text-white hover:text-[#C9A227] dark:hover:text-[#C9A227] inline-flex items-center gap-1 transition-colors pt-3"
                  >
                    <span>{t.readMore}</span>
                    <ArrowRight size={13} />
                  </Link>

                  {item.telegramPostUrl && (
                    <a
                      href={item.telegramPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 dark:text-sky-400 hover:text-sky-700 inline-flex items-center gap-1 transition-colors pt-3"
                      title={t.telegramSource}
                    >
                      <Send size={12} />
                      <span className="text-[11px]">Telegram</span>
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {/* Link to News Page */}
        <div className="text-center">
          <Link href="/news">
            <button className="px-6 py-3 bg-[#0B1F3A] hover:bg-[#123B66] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-all shadow-xs inline-flex items-center gap-2">
              <span>{t.viewAllNews}</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
