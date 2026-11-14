"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramCTA from "@/components/telegram-cta"
import { Calendar, ArrowLeft, Send, Share2, Tag, ShieldCheck, Newspaper, ExternalLink } from "lucide-react"
import { NewsItem } from "@/lib/types"
import { getInitialNewsBySlug } from "@/lib/data/initial-data"

function NewsDetailContent({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const [item, setItem] = useState<NewsItem | null>(() => getInitialNewsBySlug(slug) || null)
  const [loading, setLoading] = useState(!item)

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/news?slug=${encodeURIComponent(slug)}`)
        if (res.ok) {
          const json = await res.json()
          if (json.data) {
            setItem(json.data)
          }
        }
      } catch (err) {
        console.error("Failed to load news item:", err)
      } finally {
        setLoading(false)
      }
    }
    loadItem()
  }, [slug])

  if (loading) {
    return (
      <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-500">
          Xabar yuklanmoqda...
        </div>
        <Footer />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#10243A] dark:text-white">Xabar topilmadi</h1>
          <p className="text-xs text-slate-500">Ushbu yangilik mavjud emas yoki o'chirilgan bo'lishi mumkin.</p>
          <Link href="/news">
            <button className="px-5 py-2.5 bg-[#10243A] text-white text-xs font-bold rounded-xl">
              Barcha yangiliklarga qaytish
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const title = item.title[language] || item.title.uz
  const content = item.content[language] || item.content.uz
  const formattedDate = new Date(item.publishedAt).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#10243A] dark:text-white hover:text-[#C6A15B] dark:hover:text-[#C6A15B] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Yangiliklar ro'yxatiga qaytish</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white dark:bg-[#10243A] rounded-3xl border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs p-8 sm:p-12 space-y-8">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#68778A] dark:text-slate-400">
            <span className="px-3 py-1 rounded-md bg-[#10243A] text-white text-xs font-bold">
              {item.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#C6A15B]" />
              <span>{formattedDate}</span>
            </span>
            {item.source && (
              <span className="text-slate-400">· {item.source}</span>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172638] dark:text-white tracking-tight leading-tight">
            {title}
          </h1>

          {/* Featured Image */}
          {item.imageUrl && (
            <div className="relative w-full h-[360px] sm:h-[460px] rounded-2xl overflow-hidden shadow-xs bg-slate-200 dark:bg-slate-800">
              <Image
                src={item.imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Body Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line font-normal">
            {content}
          </div>

          {/* Telegram Source Link & Attribution */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-xs text-[#68778A] dark:text-slate-400">
              Manba / Muallif:{" "}
              <span className="font-semibold text-[#10243A] dark:text-white">
                {item.author || "Urganch 1-IMI Matbuot xizmati"}
              </span>
            </div>

            {item.telegramPostUrl && (
              <a
                href={item.telegramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0088cc] hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                <Send size={14} />
                <span>Ushbu postni rasmiy Telegram kanalida ko'rish</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </article>
      </main>

      <TelegramCTA />
      <Footer />
    </div>
  )
}

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params)
  return (
    <LanguageProvider>
      <NewsDetailContent slug={unwrappedParams.slug} />
    </LanguageProvider>
  )
}
