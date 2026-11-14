"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, ExternalLink, Send, Newspaper, Radio, ChevronRight, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { NewsItem } from "@/lib/types"

export default function News() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)

  const t = {
    uz: {
      badge: "Rasmiy Telegram Tasmamiz",
      title: "Maktab Yangiliklari va Telegram Tasmamiz",
      subtitle:
        "Urganch shahar 1-son ixtisoslashtirilgan maktab-internatining rasmiy https://t.me/s/Urganch_IMI veb-tasmari bilan to'liq integratsiya qilingan dolzarb yangiliklar.",
      channelTitle: "Rasmiy Telegram Kanalimiz: @Urganch_IMI",
      channelDesc:
        "Maktab hayoti, fan olimpiadalari, tanlovlar va muhim e'lonlar https://t.me/s/Urganch_IMI ommaviy veb-tasmasidan avtomatik uzatiladi.",
      subscribeBtn: "Telegram kanaliga obuna bo'lish",
      openPreviewBtn: "Ommaviy veb-tasmani ochish (t.me/s/Urganch_IMI)",
      all: "Barchasi",
      readMore: "Batafsil o'qish",
      telegramSource: "Telegramda ko'rish",
      viewAllNews: "Barcha yangiliklar arxiviga o'tish",
      liveBadge: "Avtomatik Sinxronizatsiya Onlayn",
      syncedWith: "Sinxronlangan rasmiy manba:",
    },
    ru: {
      badge: "Официальная лента Telegram",
      title: "Новости школы и Telegram-канал",
      subtitle:
        "Актуальные сообщения школы, напрямую интегрированные с общедоступной веб-лентой https://t.me/s/Urganch_IMI.",
      channelTitle: "Официальный Telegram-канал: @Urganch_IMI",
      channelDesc:
        "Академическая жизнь, результаты олимпиад и объявления автоматически синхронизируются с https://t.me/s/Urganch_IMI.",
      subscribeBtn: "Подписаться на Telegram-канал",
      openPreviewBtn: "Открыть публичную веб-ленту (t.me/s/Urganch_IMI)",
      all: "Все",
      readMore: "Читать подробнее",
      telegramSource: "Смотреть в Telegram",
      viewAllNews: "Перейти ко всем новостям",
      liveBadge: "Авто-синхронизация онлайн",
      syncedWith: "Источник синхронизации:",
    },
    en: {
      badge: "Official Telegram Feed",
      title: "School News & Telegram Feed",
      subtitle:
        "Real-time institutional news and notices synchronized directly with the public web preview https://t.me/s/Urganch_IMI.",
      channelTitle: "Official Telegram Channel: @Urganch_IMI",
      channelDesc:
        "School activities, olympiad victories, and announcements synchronized automatically from https://t.me/s/Urganch_IMI.",
      subscribeBtn: "Subscribe to Telegram Channel",
      openPreviewBtn: "Open Public Web Preview (t.me/s/Urganch_IMI)",
      all: "All",
      readMore: "Read More",
      telegramSource: "View on Telegram",
      viewAllNews: "View Complete News Archive",
      liveBadge: "Auto-Sync Live",
      syncedWith: "Live Source:",
    },
  }[language]

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      try {
        const res = await fetch("/api/news?status=published")
        if (res.ok) {
          const data = await res.json()
          setNewsItems(data.data || [])
        }
      } catch (err) {
        console.error("Failed to load news:", err)
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [])

  const filteredNews = newsItems.filter((item) => {
    if (selectedCategory === "all") return true
    return item.category === selectedCategory
  })

  // Show top 6 on homepage
  const displayedNews = filteredNews.slice(0, 6)

  return (
    <section id="news" className="py-20 md:py-28 bg-[#F5F7FA] dark:bg-[#0B1726] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0088cc]/10 text-[#0088cc] dark:text-sky-400 text-xs font-bold mb-3 border border-[#0088cc]/20">
            <Send size={13} />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172638] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#68778A] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Telegram Channel Live Integration Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#10243A] via-[#142d48] to-[#183650] text-white shadow-lg border border-white/10 relative overflow-hidden">
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

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {t.channelTitle}
              </h3>

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

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["all", "Yutuqlar", "Olimpiada", "Hamkorlik", "Maktab hayoti"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedCategory === cat
                  ? "bg-[#10243A] text-white shadow-xs dark:bg-[#C6A15B] dark:text-[#10243A]"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#10243A] dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E3650]"
              }`}
            >
              {cat === "all" ? t.all : cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">Yangiliklar tasmari yuklanmoqda...</div>
        ) : displayedNews.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] rounded-2xl">
            <p className="text-slate-500 text-sm">Hozircha ushbu toifada yangiliklar mavjud emas.</p>
          </div>
        ) : (
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
                        <a
                          href={item.telegramPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-3 right-3 bg-[#0088cc] hover:bg-sky-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs transition-colors"
                          title="Telegramda ochish"
                        >
                          <Send size={10} />
                          <span>Telegram {item.telegramMessageId ? `#${item.telegramMessageId}` : ""}</span>
                        </a>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#68778A] dark:text-slate-400 mb-3">
                        <Calendar size={14} className="text-[#C6A15B]" />
                        <span>{formattedDate}</span>
                      </div>

                      <h3 className="font-bold text-[#172638] dark:text-white text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-[#183650] dark:group-hover:text-[#C6A15B] transition-colors">
                        {title}
                      </h3>

                      <p className="text-xs text-[#68778A] dark:text-slate-400 line-clamp-3 leading-relaxed mb-4 font-normal">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold">
                    <Link
                      href={`/news/${item.slug}`}
                      className="text-[#10243A] dark:text-white hover:text-[#C6A15B] dark:hover:text-[#C6A15B] inline-flex items-center gap-1 transition-colors pt-3"
                    >
                      <span>{t.readMore}</span>
                      <ArrowRight size={13} />
                    </Link>

                    {item.telegramPostUrl ? (
                      <a
                        href={item.telegramPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0088cc] hover:text-sky-700 dark:text-sky-400 inline-flex items-center gap-1 transition-colors pt-3"
                        title={t.telegramSource}
                      >
                        <Send size={12} />
                        <span className="text-[11px]">Telegramda ko'rish</span>
                        <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span className="text-slate-400 text-[11px] pt-3">Urganch 1-IMI</span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* View all news CTA */}
        <div className="text-center">
          <Link href="/news">
            <button className="px-6 py-3.5 bg-[#10243A] hover:bg-[#183650] text-white dark:bg-[#C6A15B] dark:text-[#10243A] text-xs font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-2">
              <Newspaper size={14} />
              <span>{t.viewAllNews}</span>
              <ChevronRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
