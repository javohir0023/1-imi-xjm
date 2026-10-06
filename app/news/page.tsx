"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, Search, ArrowRight, Send, Newspaper, Filter } from "lucide-react"
import { getInitialNews } from "@/lib/data/initial-data"

function NewsPageContent() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const t = {
    uz: {
      badge: "Rasmiy Xabarlar Tasmari",
      title: "Maktab Yangiliklari va E'lonlar",
      subtitle:
        "Urganch 1-IMI ning barcha rasmiy yangiliklari, tadbirlari, hamkorlik memorandumlari va Telegram xabarlari.",
      searchPlaceholder: "Yangiliklar bo'yicha qidiruv...",
      all: "Barchasi",
      readMore: "Batafsil o'qish",
      noResults: "Qidiruvingiz bo'yicha yangiliklar topilmadi.",
    },
    ru: {
      badge: "Официальная лента новостей",
      title: "Новости и объявления школы",
      subtitle:
        "Все официальные новости, события, меморандумы о сотрудничестве и публикации Telegram Урганч 1-ИМИ.",
      searchPlaceholder: "Поиск по новостям...",
      all: "Все",
      readMore: "Читать подробнее",
      noResults: "По вашему запросу новостей не найдено.",
    },
    en: {
      badge: "Official Press Center",
      title: "School News & Press Releases",
      subtitle:
        "Official news releases, academic events, collaborative memoranda, and Telegram updates.",
      searchPlaceholder: "Search articles...",
      all: "All",
      readMore: "Read More",
      noResults: "No news articles found matching your query.",
    },
  }[language]

  const newsItems = getInitialNews("published")

  const categories = ["all", "Yutuqlar", "Hamkorlik", "Maktab hayoti"]

  const filteredNews = newsItems.filter((item) => {
    const title = (item.title[language] || item.title.uz).toLowerCase()
    const excerpt = (item.excerpt[language] || item.excerpt.uz).toLowerCase()
    const query = searchQuery.toLowerCase()

    const matchesSearch = !searchQuery || title.includes(query) || excerpt.includes(query)
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero Header */}
      <section className="bg-[#0B1F3A] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9A227] text-xs font-bold">
              <Newspaper size={14} />
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Category Filter Bar */}
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
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#0B1F3A] dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {cat === "all" ? t.all : cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
            <Newspaper size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-500">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => {
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
                  className="academic-card rounded-2xl overflow-hidden bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                      <Image
                        src={item.imageUrl || "/images/photo-2025-10-24-21-21-29.jpg"}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#0B1F3A]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <Calendar size={14} className="text-[#C9A227]" />
                        <span>{formattedDate}</span>
                      </div>

                      <h2 className="font-bold text-[#0B1F3A] dark:text-white text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-[#123B66] dark:group-hover:text-[#C9A227] transition-colors">
                        {title}
                      </h2>

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
        )}
      </div>

      <Footer />
    </div>
  )
}

export default function NewsPage() {
  return (
    <LanguageProvider>
      <NewsPageContent />
    </LanguageProvider>
  )
}
