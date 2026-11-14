"use client"

import { BookMarked, Trophy, Users, Cpu, Rocket, Library, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ForStudents() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "O'quvchilar Hayoti",
      title: "O'quvchilar Uchun Imkoniyatlar",
      subtitle:
        "Maktabimizda akademik bilimlar bilan bir qatorda ijodiy, texnologik va yetakchilik ko'nikmalarini shakllantirish uchun keng muhit yaratilgan.",
      res1Title: "Axborot-Resurs Markazi (ARM)",
      res1Desc: "10 000 dan ziyod darslik, ilmiy-ommabop adabiyotlar va elektron kutubxona fondi.",
      res2Title: "Ilmiy To'garaklar & Laboratoriyalar",
      res2Desc: "Fizika, kimyo, biologiya va robototexnika laboratoriyalarida amaliy izlanishlar.",
      res3Title: "Fan Olimpiadalari Tayyorgarligi",
      res3Desc: "Xalqaro va respublika olimpiadalariga tajribali murabbiylar rahbarligida maqsadli tayyorgarlik.",
      res4Title: "Yoshlar Startaplari & Loyihalar",
      res4Desc: "Smart Heating, Real Rate va Loopify kabi 10 ta mualliflik loyihalari va grantlar.",
    },
    ru: {
      badge: "Студенческая жизнь",
      title: "Возможности для учеников",
      subtitle:
        "В нашей школе создана среда для всестороннего развития: от научных исследований до творческих и спортивных клубов.",
      res1Title: "Информационно-ресурсный центр",
      res1Desc: "Более 10 000 учебников, научной литературы и доступ к электронным библиотечным фондам.",
      res2Title: "Научные кружки и лаборатории",
      res2Desc: "Практические занятия в лабораториях физики, химии, биологии и робототехники.",
      res3Title: "Олимпиадная подготовка",
      res3Desc: "Целенаправленная подготовка к национальным и международным олимпиадам с наставниками.",
      res4Title: "Молодежные стартапы и проекты",
      res4Desc: "10 стартап-проектов школы, включая Smart Heating, Real Rate и Loopify.",
    },
    en: {
      badge: "Student Life & Extracurriculars",
      title: "Student Opportunities",
      subtitle:
        "Beyond rigorous academics, Urganch 1-IMI fosters leadership, research, and collaborative innovation.",
      res1Title: "Library & Information Resource Center",
      res1Desc: "Over 10,000 academic texts, periodicals, and digital learning databases.",
      res2Title: "Research Labs & Robotics Suites",
      res2Desc: "Hands-on research in specialized physics, chemistry, biology, and robotics studios.",
      res3Title: "Olympiad Coaching Program",
      res3Desc: "Targeted preparation for prestigious international and regional STEM contests.",
      res4Title: "Student Startups & Innovation",
      res4Desc: "Ten active student-led initiatives including Smart Heating System and Loopify.",
    },
  }[language]

  const resources = [
    { icon: Library, title: t.res1Title, desc: t.res1Desc },
    { icon: Cpu, title: t.res2Title, desc: t.res2Desc },
    { icon: Trophy, title: t.res3Title, desc: t.res3Desc },
    { icon: Rocket, title: t.res4Title, desc: t.res4Desc },
  ]

  return (
    <section id="students" className="py-20 md:py-28 bg-[#F7F9FC] dark:bg-[#071324] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Users size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid (No schedule!) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((res, index) => {
            const Icon = res.icon
            return (
              <div
                key={index}
                className="academic-card p-6 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/5 dark:bg-white/10 flex items-center justify-center text-[#C9A227] mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-base mb-2">
                  {res.title}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
                  {res.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
