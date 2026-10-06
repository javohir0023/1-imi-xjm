"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ArrowLeft, Send, Share2, Tag, ShieldCheck } from "lucide-react"
import { getInitialNewsBySlug } from "@/lib/data/initial-data"

function NewsDetailContent({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const item = getInitialNewsBySlug(slug)

  if (!item) {
    return notFound()
  }

  const title = item.title[language] || item.title.uz
  const content = item.content[language] || item.content.uz
  const formattedDate = new Date(item.publishedAt).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100 min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] dark:text-white hover:text-[#C9A227] dark:hover:text-[#C9A227] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Yangiliklar ro'yxatiga qaytish</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sm:p-12 space-y-8">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="px-3 py-1 rounded-md bg-[#0B1F3A] text-white text-xs font-bold">
              {item.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#C9A227]" />
              <span>{formattedDate}</span>
            </span>
            {item.source && (
              <span className="text-slate-400">· {item.source}</span>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight leading-tight">
            {title}
          </h1>

          {/* Featured Image */}
          {item.imageUrl && (
            <div className="relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden shadow-xs bg-slate-200">
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
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-line">
            {content}
          </div>

          {/* Source Attribution & Telegram Link */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Muallif: <span className="font-semibold text-[#0B1F3A] dark:text-white">{item.author || "Urganch 1-IMI Matbuot xizmati"}</span>
            </div>

            {item.telegramPostUrl && (
              <a
                href={item.telegramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
              >
                <Send size={14} />
                <span>Ushbu xabarni Telegram kanalida ko'rish</span>
              </a>
            )}
          </div>
        </article>
      </main>

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
