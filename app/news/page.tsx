"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramCTA from "@/components/telegram-cta"
import { Calendar, Search, ArrowRight, Send, Newspaper, Filter, ExternalLink, Radio, ChevronDown } from "lucide-react"
import { NewsItem } from "@/lib/types"

function NewsPageContent() {
  const { language } = useLanguage()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<"all" | "telegram" | "official">("all")
  const [visibleCount, setVisibleCount] = useState<number>(9)

  const t = {
    uz: {
      badge: "Rasmiy Xabarlar Tasmari",
      title: "Maktab Yangiliklari va Telegram Tasmamiz",
      subtitle:
        "Urganch shahar 1-son ixtisoslashtirilgan maktab-internatining rasmiy yangiliklari hamda @Urganch_IMI Telegram kanali bilan sinxronlangan eng so'nggi postlar.",
      searchPlaceholder: "Yangiliklar bo'yicha qidiruv...",
      all: "Barcha xabarlar",
      sourceAll: "Barchasi",
      sourceTelegram: "Telegram kanali (@Urganch_IMI)",
      sourceOfficial: "Rasmiy yangiliklar",
      readMore: "Batafsil o'qish",
      openOriginal: "Telegramda ko'rish",
      noResults: "Qidiruv shartlariga mos yangiliklar topilmadi.",
      loadMore: "Yana yangiliklarni yuklash",
      channelTitle: "Rasmiy Telegram Kanalimiz: @Urganch_IMI",
      channelDesc: "Barcha yangiliklar https://t.me/s/Urganch_IMI ommaviy veb-tasmasi bilan to'g'ridan-to'g'ri bog'langan.",
      subscribeBtn: "Kanalga obuna bo'lish",
      openPreviewBtn: "Ommaviy veb-tasmani ochish (t.me/s/Urganch_IMI)",
      liveBadge: "Avtomatik Sinxronizatsiya Onlayn",
      syncedWith: "Sinxronlangan rasmiy manba:",
    },
    ru: {
      badge: "Официальная лента новостей",
      title: "Новости школы и Telegram-канал",
      subtitle:
        "Официальные новости и публикации, напрямую синхронизированные с Telegram-каналом @Urganch_IMI.",
      searchPlaceholder: "Поиск по новостям...",
      all: "Все сообщения",
      sourceAll: "Все",
      sourceTelegram: "Telegram-канал (@Urganch_IMI)",
      sourceOfficial: "Официальные пресс-релизы",
      readMore: "Читать подробнее",
      openOriginal: "Смотреть в Telegram",
      noResults: "По вашему запросу новостей не найдено.",
      loadMore: "Загрузить больше",
      channelTitle: "Официальный Telegram-канал: @Urganch_IMI",
      channelDesc: "Все новости синхронизированы с общедоступной веб-лентой https://t.me/s/Urganch_IMI.",
      subscribeBtn: "Подписаться на канал",
      openPreviewBtn: "Открыть публичную веб-ленту (t.me/s/Urganch_IMI)",
      liveBadge: "Авто-синхронизация онлайн",
      syncedWith: "Источник синхронизации:",
    },
    en: {
      badge: "Press & Telegram Center",
      title: "School News & Telegram Feed",
      subtitle:
        "Combined institutional press announcements and real-time posts from our official Telegram channel (@Urganch_IMI).",
      searchPlaceholder: "Search articles...",
      all: "All Articles",
      sourceAll: "All",
      sourceTelegram: "Telegram Channel (@Urganch_IMI)",
      sourceOfficial: "Official Releases",
      readMore: "Read More",
      openOriginal: "Open in Telegram",
      noResults: "No news articles found matching your query.",
      loadMore: "Load More Articles",
      channelTitle: "Official Telegram Channel: @Urganch_IMI",
      channelDesc: "All posts synchronized in real time with public web preview https://t.me/s/Urganch_IMI.",
      subscribeBtn: "Subscribe to Channel",
      openPreviewBtn: "Open Public Web Preview (t.me/s/Urganch_IMI)",
      liveBadge: "Auto-Sync Live",
      syncedWith: "Live Source:",
    },
  }[language]

  useEffect(() => {
    async function fetchNews() {
      setLoading(true)
      try {
        const res = await fetch("/api/news?status=published")
        if (res.ok) {
          const json = await res.json()
          setNews(json.data || [])
        }
      } catch (err) {
        console.error("Failed to load news:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  useEffect(() => {
    setVisibleCount(9)
  }, [sourceFilter, selectedCategory, searchQuery])

  const categories = ["all", "Yutuqlar", "Olimpiada", "Hamkorlik", "Maktab hayoti", "Qabul"]

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      // Source filter
      if (sourceFilter === "telegram" && !item.telegramPostUrl) return false
      if (sourceFilter === "official" && item.telegramPostUrl && item.id.startsWith("tg-")) return false

      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false

      // Text search
      if (searchQuery) {
        const title = (item.title[language] || item.title.uz).toLowerCase()
        const excerpt = (item.excerpt[language] || item.excerpt.uz).toLowerCase()
        const content = (item.content[language] || item.content.uz).toLowerCase()
        const query = searchQuery.toLowerCase().trim()
        if (!title.includes(query) && !excerpt.includes(query) && !content.includes(query)) {
          return false
        }
      }

      return true
    })
  }, [news, sourceFilter, selectedCategory, searchQuery, language])

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero Header */}
      <section className="bg-[#10243A] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
              <Newspaper size={14} />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-base text-slate-300 font-normal leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Telegram Channel Live Integration Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#10243A] via-[#142d48] to-[#183650] text-white shadow-lg border border-white/10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#0088cc]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0088cc] text-white shadow-xs">
                  <Send size={12} />
                  <span>@Urganch_IMI</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t.liveBadge}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {t.channelTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {t.channelDesc}
              </p>

              <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center gap-1 text-[#C6A15B] font-semibold">
                  <Radio size={12} className="animate-pulse" />
                  <span>{t.syncedWith}</span>
                </div>
                <a
                  href="https://t.me/s/Urganch_IMI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 hover:text-white underline font-semibold inline-flex items-center gap-1"
                >
                  <span>https://t.me/s/Urganch_IMI</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-shrink-0">
              <a
                href="https://t.me/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>{t.subscribeBtn}</span>
              </a>

              <a
                href="https://t.me/s/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <span>{t.openPreviewBtn}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-[#172638] dark:text-white focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            {/* Source tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: "all", label: t.sourceAll },
                { id: "telegram", label: t.sourceTelegram },
                { id: "official", label: t.sourceOfficial },
              ].map((src) => (
                <button
                  key={src.id}
                  onClick={() => setSourceFilter(src.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    sourceFilter === src.id
                      ? "bg-[#10243A] text-white shadow-xs dark:bg-[#C6A15B] dark:text-[#10243A]"
                      : "bg-[#F5F7FA] text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {src.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#C6A15B] text-[#10243A] font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {cat === "all" ? t.all : cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">Yangiliklar tasmari yuklanmoqda...</div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] rounded-2xl">
            <p className="text-slate-500 text-sm">{t.noResults}</p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.slice(0, visibleCount).map((item) => {
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
                    className="rounded-2xl overflow-hidden bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs flex flex-col justify-between group hover:border-[#C6A15B] transition-all hover:shadow-md"
                  >
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <Image
                          src={item.imageUrl || "/images/photo-2025-10-24-21-21-29.jpg"}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#10243A]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                          {item.category}
                        </div>

                        {item.telegramPostUrl && (
                          <div className="absolute top-3 right-3 bg-[#0088cc] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Send size={10} />
                            <span>Telegram</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-[#68778A] dark:text-slate-400 mb-3">
                          <Calendar size={14} className="text-[#C6A15B]" />
                          <span>{formattedDate}</span>
                        </div>

                        <h2 className="font-extrabold text-[#172638] dark:text-white text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-[#183650] dark:group-hover:text-[#C6A15B] transition-colors">
                          {title}
                        </h2>

                        <p className="text-xs text-[#68778A] dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                          {excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold">
                      <Link
                        href={`/news/${item.slug}`}
                        className="text-[#10243A] dark:text-white hover:text-[#C6A15B] dark:hover:text-[#C6A15B] inline-flex items-center gap-1 transition-colors pt-3"
                      >
                        <span>{t.readMore}</span>
                        <ArrowRight size={13} />
                      </Link>

                      {item.telegramPostUrl && (
                        <a
                          href={item.telegramPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0088cc] hover:text-sky-700 dark:text-sky-400 inline-flex items-center gap-1.5 transition-colors pt-3"
                        >
                          <Send size={12} />
                          <span className="text-[11px]">{t.openOriginal}</span>
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>

            {filteredNews.length > visibleCount && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                  className="px-6 py-3 bg-[#10243A] hover:bg-[#183650] dark:bg-[#183650] dark:hover:bg-[#10243A] text-white text-xs font-bold rounded-xl transition-all shadow-xs hover:shadow inline-flex items-center gap-2 border border-white/10"
                >
                  <span>{t.loadMore}</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <TelegramCTA />
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
