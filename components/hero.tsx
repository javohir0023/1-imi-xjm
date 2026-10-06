"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Award, ExternalLink, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Hero() {
  const { language } = useLanguage()

  const content = {
    uz: {
      badge: "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi",
      titleMain: "URGANCH 1-IMI",
      subtitle: "Kelajakni bugundan quradigan avlod.",
      description:
        "Aniq va tabiiy fanlar chuqurlashtirilgan davlat ixtisoslashtirilgan maktab-internati. Xalqaro olimpiada g'oliblari, 170.9 o'rtacha DTM balli va nufuzli jahon oliygohlariga to'liq grantlar maskani.",
      primaryCta: "Maktab profili",
      secondaryCta: "Qabulga topshirish",
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
        "Государственная специализированная школа-интернат точных и естественных наук. Центр подготовки победителей международных олимпиад и обладателей грантов ведущих мировых вузов.",
      primaryCta: "Профиль школы",
      secondaryCta: "Подать заявку",
      schoolModeCta: "🏫 Режим школы",
      stat1Val: "170.9",
      stat1Label: "Средний балл DTM (рекорд области)",
      stat2Val: "100%",
      stat2Label: "Поступление в высшие учебные заведения",
      stat3Val: "$1.69M",
      stat3Label: "Гранты зарубежных университетов",
    },
    en: {
      badge: "Agency for Specialized Educational Institutions of Uzbekistan",
      titleMain: "URGANCH 1-IMI",
      subtitle: "The generation building the future today.",
      description:
        "Specialized Boarding School No. 1 in Urgench focusing on exact and natural sciences. Home to international olympiad laureates, record 170.9 mean DTM score, and $1.69M in world university scholarships.",
      primaryCta: "School Profile",
      secondaryCta: "Apply for Admission",
      schoolModeCta: "🏫 School Mode",
      stat1Val: "170.9",
      stat1Label: "Mean DTM Score (Khorezm #1)",
      stat2Val: "100%",
      stat2Label: "University Admission Rate",
      stat3Val: "$1.69M",
      stat3Label: "International Scholarships",
    },
  }

  const c = content[language] || content.uz

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#0B1F3A] text-white">
      {/* Background Video with Dark Academic Overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105 transition-transform duration-1000"
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maktab-qisqacha_9Ieo6lJr-DNGCSe7qio3U2M5tiUenr1VUyEpV5j.mp4"
          type="video/mp4"
        />
      </video>

      {/* Elegant Architectural Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-[#0B1F3A]/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full z-10">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200">
            <ShieldCheck size={14} className="text-[#C9A227]" />
            <span>{c.badge}</span>
          </div>

          {/* Main Title & Slogan */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              {c.titleMain}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#C9A227] tracking-tight">
              “{c.subtitle}”
            </p>
          </div>

          {/* Professional Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
            {c.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            {/* Primary CTA: Maktab profili */}
            <Link href="/school-profile">
              <button className="px-7 py-3.5 bg-[#C9A227] hover:bg-[#d8b030] text-[#0B1F3A] font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 group text-sm">
                <BookOpen size={18} />
                <span>{c.primaryCta}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Secondary CTA: Qabulga topshirish */}
            <Link href="/admissions">
              <button className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/25 transition-all text-sm backdrop-blur-xs flex items-center gap-2">
                <Award size={18} className="text-[#C9A227]" />
                <span>{c.secondaryCta}</span>
              </button>
            </Link>

            {/* Maktab rejimi CTA */}
            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-white text-[#0B1F3A] hover:bg-slate-100 font-bold rounded-lg transition-all text-sm shadow-md flex items-center gap-2"
            >
              <span>{c.schoolModeCta}</span>
              <ExternalLink size={14} className="text-[#0B1F3A]" />
            </a>
          </div>

          {/* Verified Official Highlights Bar */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C9A227]">{c.stat1Val}</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">{c.stat1Label}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{c.stat2Val}</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">{c.stat2Label}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C9A227]">{c.stat3Val}</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">{c.stat3Label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
