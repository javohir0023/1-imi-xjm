"use client"

import { FileText, Download, CheckCircle, ArrowRight, ShieldCheck, GraduationCap } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export default function SchoolProfileBanner() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Rasmiy Institutiv Hujjat",
      title: "Urganch 1-IMI Rasmiy Maktab Profili (2025–2026)",
      subtitle:
        "Maktabning ta'lim yo'nalishlari, akademik natijalari, xalqaro olimpiadalar tarixi va universitetlarga qabul ko'rsatkichlari to'liq jamlangan rasmiy ma'lumotnoma.",
      downloadPdf: "Maktab profilini yuklab olish (PDF)",
      viewPage: "Batafsil sahifada ko'rish",
      stat1: "170.9 o'rtacha DTM balli",
      stat2: "100% oliygohlarga qabul",
      stat3: "$1.69M xorijiy grantlar",
      stat4: "103 ta olimpiada mukofotlari",
    },
    ru: {
      badge: "Официальный документ",
      title: "Официальный профиль школы Урганч 1-ИМИ (2025–2026)",
      subtitle:
        "Полный институциональный обзор: академическая программа, результаты олимпиад, статистика поступлений и показатели преподавательского состава.",
      downloadPdf: "Скачать профиль школы (PDF)",
      viewPage: "Подробнее на странице",
      stat1: "170.9 средний балл DTM",
      stat2: "100% поступление в вузы",
      stat3: "$1.69M грантов за рубежом",
      stat4: "103 призовых места олимпиад",
    },
    en: {
      badge: "Official Institutional Dossier",
      title: "Urganch 1-IMI Official School Profile (2025–2026)",
      subtitle:
        "The comprehensive institutional profile documenting curriculum, mean DTM score progression, olympiad medals, and worldwide university placements.",
      downloadPdf: "Download School Profile (PDF)",
      viewPage: "Explore Online Profile",
      stat1: "170.9 Mean DTM Score",
      stat2: "100% University Acceptance",
      stat3: "$1.69M Abroad Scholarships",
      stat4: "103 Olympiad Prizes",
    },
  }[language]

  return (
    <section className="py-16 md:py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Background architectural geometric shapes */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#123B66] to-[#0B1F3A] border border-white/15 shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9A227] text-xs font-bold">
                <ShieldCheck size={14} />
                <span>{t.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
                {t.subtitle}
              </p>

              {/* 4 bullet points */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[t.stat1, t.stat2, t.stat3, t.stat4].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle size={14} className="text-[#C9A227] flex-shrink-0" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3.5 sm:items-start lg:items-end justify-center">
              {/* Primary PDF Download Button */}
              <a
                href="/urganch-1-imi-school-profile.pdf"
                download="urganch-1-imi-school-profile.pdf"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#C9A227] hover:bg-[#d8b030] text-[#0B1F3A] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>{t.downloadPdf}</span>
              </a>

              {/* View Online Page */}
              <Link
                href="/school-profile"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-xs"
              >
                <FileText size={16} className="text-[#C9A227]" />
                <span>{t.viewPage}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
