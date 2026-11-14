"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Award, ExternalLink, ShieldCheck, CheckCircle, Play } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Hero() {
  const { language } = useLanguage()

  const content = {
    uz: {
      badge: "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi",
      titleMain: "URGANCH 1-IMI",
      subtitle: "Kelajakni bugundan quradigan avlod.",
      description:
        "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati — aniq va tabiiy fanlar chuqurlashtirilgan davlat ta'lim maskani. Xalqaro olimpiada sovrindorlari, 170.9 viloyat rekord DTM balli hamda dunyoning nufuzli oliygohlariga to'liq grantlar markazi.",
      primaryCta: "Maktab haqida",
      secondaryCta: "Qabul jarayoni",
      videoCta: "Intro videoni ko'rish",
      schoolModeCta: "🏫 Maktab rejimi",
      stat1Val: "170.9",
      stat1Label: "O'rtacha DTM balli (viloyat rekordi)",
      stat2Val: "100%",
      stat2Label: "Oliy ta'limga qabul ko'rsatkichi",
      stat3Val: "$1.69M",
      stat3Label: "Xorijiy universitetlar grantlari",
    },
    ru: {
      badge: "Агентство специализированных образовательных учреждений Узбекистана",
      titleMain: "УРГАНЧ 1-ИМИ",
      subtitle: "Поколение, созидающее будущее уже сегодня.",
      description:
        "Специализированная школа-интернат №1 г. Ургенча — государственное учреждение точных и естественных наук. Центр подготовки призеров международных олимпиад, рекордного среднего балла DTM 170.9 и грантов ведущих мировых вузов.",
      primaryCta: "О школе",
      secondaryCta: "Приём документов",
      videoCta: "Смотреть интро-видео",
      schoolModeCta: "🏫 Режим школы",
      stat1Val: "170.9",
      stat1Label: "Средний балл DTM (рекорд области)",
      stat2Val: "100%",
      stat2Label: "Поступление в вузы",
      stat3Val: "$1.69M",
      stat3Label: "Гранты зарубежных университетов",
    },
    en: {
      badge: "Agency for Specialized Educational Institutions of Uzbekistan",
      titleMain: "URGANCH 1-IMI",
      subtitle: "The generation building the future today.",
      description:
        "Urganch Specialized Boarding School No. 1 — premier state institution for exact and natural sciences. Home to international olympiad laureates, record 170.9 mean DTM score, and $1.69M in world university scholarships.",
      primaryCta: "About School",
      secondaryCta: "Admissions Process",
      videoCta: "Watch Intro Video",
      schoolModeCta: "🏫 School Mode",
      stat1Val: "170.9",
      stat1Label: "Mean DTM Score (Khorezm #1)",
      stat2Val: "100%",
      stat2Label: "University Matriculation",
      stat3Val: "$1.69M",
      stat3Label: "International Scholarships",
    },
  }

  const c = content[language] || content.uz

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#10243A] text-white">
      {/* Background authentic school image or video */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/photo-2025-10-24-21-21-29.jpg"
          alt="Urganch 1-IMI binosi"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
      </div>

      {/* Elegant Academic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10243A] via-[#10243A]/95 to-[#10243A]/80 z-1"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#10243A] via-transparent to-transparent z-1"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full z-10">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200">
            <ShieldCheck size={14} className="text-[#C6A15B]" />
            <span>{c.badge}</span>
          </div>

          {/* Main Title & Slogan */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              {c.titleMain}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#C6A15B] tracking-tight">
              “{c.subtitle}”
            </p>
          </div>

          {/* Institutional Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
            {c.description}
          </p>

          {/* Action CTAs: Main CTA "Maktab haqida", Secondary "Qabul jarayoni", "Maktab rejimi" */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            {/* Main CTA: Maktab haqida */}
            <Link href="/about">
              <button className="px-7 py-3.5 bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group text-sm">
                <BookOpen size={18} />
                <span>{c.primaryCta}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Secondary CTA: Qabul jarayoni */}
            <Link href="/admissions">
              <button className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all text-sm backdrop-blur-xs flex items-center gap-2">
                <Award size={18} className="text-[#C6A15B]" />
                <span>{c.secondaryCta}</span>
              </button>
            </Link>

            {/* Maktab rejimi Direct CTA */}
            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-white text-[#10243A] hover:bg-slate-100 font-bold rounded-xl transition-all text-sm shadow-md flex items-center gap-2"
            >
              <span>{c.schoolModeCta}</span>
              <ExternalLink size={14} className="text-[#10243A]" />
            </a>

            {/* Intro Video Direct Anchor CTA */}
            <a
              href="#intro-video"
              className="px-5 py-3.5 bg-white/10 hover:bg-[#C6A15B]/20 text-slate-200 hover:text-white font-semibold rounded-xl border border-white/20 hover:border-[#C6A15B]/40 transition-all text-sm backdrop-blur-xs flex items-center gap-2"
            >
              <Play size={15} className="fill-[#C6A15B] text-[#C6A15B]" />
              <span>{c.videoCta}</span>
            </a>
          </div>

          {/* Highlights Bar */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C6A15B]">{c.stat1Val}</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">{c.stat1Label}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{c.stat2Val}</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">{c.stat2Label}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C6A15B]">{c.stat3Val}</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">{c.stat3Label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
