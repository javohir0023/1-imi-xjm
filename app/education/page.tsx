"use client"

import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramCTA from "@/components/telegram-cta"
import { BookOpen, Cpu, Atom, Globe, Trophy, CheckCircle, ExternalLink, Sparkles, GraduationCap } from "lucide-react"

function EducationContent() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Ta'lim Dasturlari",
      title: "Ixtisoslashtirilgan Akademik Yo'nalishlar",
      subtitle:
        "Urganch 1-IMI da ta'lim davlat ta'lim andozalari hamda ilg'or xalqaro o'quv rejalari uyg'unligida olib boriladi.",
      direction1Title: "Aniq Fanlar Yo'nalishi",
      direction1Desc: "Matematika, Fizika, Informatika va Sun'iy intellekt texnologiyalari chuqurlashtirilgan dasturlari.",
      direction1Items: [
        "Oliy matematika asoslari, kombinatorika va mantiq",
        "Nazariy va eksperimental fizika laboratoriyalari",
        "Python, C++ va algoritmlar (IOI olimpiada dasturi)",
        "Robototexnika va avtomatlashtirilgan tizimlar",
      ],
      direction2Title: "Tabiiy Fanlar Yo'nalishi",
      direction2Desc: "Kimyo va Biologiya fanlari bo'yicha ilmiy-tadqiqot va tibbiyotga tayyorlov dasturi.",
      direction2Items: [
        "Organik va anorganik kimyo chuqurlashtirilgan kursi",
        "Molekulyar biologiya, genetika va mikroskopik tahlillar",
        "Toshkent Farmatsevtika universiteti bilan qo'shma laboratoriya amaliyotlari",
        "Ekologik va biotexnologik loyihalar",
      ],
      direction3Title: "Xorijiy Tillar & Xalqaro Sertifikatlar",
      direction3Desc: "IELTS, SAT, CEFR va milliy sertifikatlarga kompleks tayyorgarlik tizimi.",
      direction3Items: [
        "Ingliz tili (IELTS 7.5 - 8.5 va SAT imtihonlariga tayyorgarlik)",
        "Nemis tili va Turk tili qo'shimcha kurslari",
        "Rus tili va xalqaro muloqot madaniyati",
        "Xorijiy oliygohlarga qabul uchun akademik insho (Essay) yozish",
      ],
      olympiadTitle: "Olimpiadaga Tayyorlash Tizimi",
      olympiadDesc: "Respublika va Xalqaro fan olimpiadalariga tayyorlov uchun haftalik intensiv mashg'ulotlar va tajribali murabbiylar ko'magi yo'lga qo'yilgan.",
      modeCta: "Maktab rejimiga o'tish",
    },
    ru: {
      badge: "Образовательные программы",
      title: "Специализированные академические направления",
      subtitle:
        "Обучение в Урганч 1-ИМИ сочетает государственные стандарты и передовые международные методики.",
      direction1Title: "Направление точных наук",
      direction1Desc: "Углубленные программы математики, физики, информатики и искусственного интеллекта.",
      direction1Items: [
        "Основы высшей математики, комбинаторика и математическая логика",
        "Теоретическая и экспериментальная физика в лабораториях",
        "Python, C++ и спортивное программирование (олимпиады IOI)",
        "Робототехника и микроэлектроника",
      ],
      direction2Title: "Направление естественных наук",
      direction2Desc: "Научные исследования и подготовка к медицинским вузам по химии и биологии.",
      direction2Items: [
        "Углубленные курсы органической и неорганической химии",
        "Молекулярная биология, генетика и лабораторные исследования",
        "Совместные лабораторные занятия с Ташкентским фармацевтическим университетом",
        "Экологические и биотехнологические проекты",
      ],
      direction3Title: "Иностранные языки и международные сертификаты",
      direction3Desc: "Комплексная подготовка к экзаменам IELTS, SAT, CEFR и национальным сертификатам.",
      direction3Items: [
        "Английский язык (подготовка к IELTS 7.5+ и Digital SAT)",
        "Курсы немецкого и турецкого языков",
        "Русский язык и культура делового общения",
        "Написание академических эссе для ведущих университетов мира",
      ],
      olympiadTitle: "Система олимпиадной подготовки",
      olympiadDesc: "Еженедельные интенсивные тренировки с ведущими педагогами для побед на международных олимпиадах.",
      modeCta: "Режим школы",
    },
    en: {
      badge: "Academic Syllabi",
      title: "Specialized Academic Disciplines",
      subtitle:
        "Urganch 1-IMI integrates rigorous national STEM requirements with global olympiad standards.",
      direction1Title: "Exact Sciences Pathway",
      direction1Desc: "Advanced curricula in Mathematics, Physics, Computer Science, and Artificial Intelligence.",
      direction1Items: [
        "Advanced calculus, combinatorics, and mathematical logic",
        "Theoretical and experimental laboratory physics",
        "Competitive programming in C++ and Python (IOI syllabus)",
        "Robotics, microcontrollers, and applied automation",
      ],
      direction2Title: "Natural Sciences Pathway",
      direction2Desc: "Research-driven preparation in Chemistry and Biology for medicine and bio-engineering.",
      direction2Items: [
        "Comprehensive organic and inorganic chemistry",
        "Molecular biology, genetics, and microscopic histology",
        "Joint research labs with Tashkent Pharmaceutical University",
        "Environmental innovation and bio-startup initiatives",
      ],
      direction3Title: "Global Languages & Testing",
      direction3Desc: "Structured mastery of IELTS, Digital SAT, CEFR, and national credential standards.",
      direction3Items: [
        "English fluency targeted at IELTS 7.5+ and SAT benchmarks",
        "German and Turkish language electives",
        "Academic essay writing for Ivy League and European admissions",
        "Scientific communication and symposium presentations",
      ],
      olympiadTitle: "Elite Olympiad Coaching Framework",
      olympiadDesc: "Weekly accelerated intensives and mentor coaching designed to produce global medal laureates.",
      modeCta: "Open School Mode",
    },
  }[language]

  const directions = [
    {
      title: t.direction1Title,
      desc: t.direction1Desc,
      items: t.direction1Items,
      icon: Cpu,
      color: "border-[#C6A15B]",
    },
    {
      title: t.direction2Title,
      desc: t.direction2Desc,
      items: t.direction2Items,
      icon: Atom,
      color: "border-[#183650]",
    },
    {
      title: t.direction3Title,
      desc: t.direction3Desc,
      items: t.direction3Items,
      icon: Globe,
      color: "border-[#C6A15B]",
    },
  ]

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      <section className="bg-[#10243A] text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
              <BookOpen size={14} className="text-[#C6A15B]" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {directions.map((dir, i) => {
              const Icon = dir.icon
              return (
                <div
                  key={i}
                  className={`p-8 rounded-3xl bg-white dark:bg-[#10243A] border-2 ${dir.color} shadow-xs flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] flex items-center justify-center text-[#C6A15B]">
                      <Icon size={24} />
                    </div>
                    <h2 className="text-xl font-extrabold text-[#10243A] dark:text-white">
                      {dir.title}
                    </h2>
                    <p className="text-xs text-[#68778A] dark:text-slate-300 leading-relaxed font-normal">
                      {dir.desc}
                    </p>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                      {dir.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle size={15} className="text-[#C6A15B] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Olympiad Coaching Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#10243A] to-[#183650] text-white border border-[#C6A15B]/30 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold">
                <Trophy size={14} className="text-[#C6A15B]" />
                <span>Olimpiada Markazi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {t.olympiadTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.olympiadDesc}
              </p>
            </div>

            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 flex-shrink-0"
            >
              <span>{t.modeCta}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <TelegramCTA />
      <Footer />
    </div>
  )
}

export default function EducationPage() {
  return (
    <LanguageProvider>
      <EducationContent />
    </LanguageProvider>
  )
}
