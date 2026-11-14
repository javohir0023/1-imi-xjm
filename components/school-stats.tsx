"use client"

import { useLanguage } from "@/lib/language-context"
import { Award, Users, GraduationCap, Trophy, FileCheck, CheckCircle } from "lucide-react"

export default function SchoolStats() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Tasdiqlangan Ko'rsatkichlar",
      title: "Maktabimiz Raqamlarda",
      subtitle:
        "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tomonidan rasman tasdiqlangan akademik ko'rsatkichlar.",
      stat1Val: "170.9",
      stat1Title: "O'rtacha DTM Balli",
      stat1Desc: "Xorazm viloyatidagi barcha umumta'lim va ixtisoslashtirilgan maktablar o'rtasida 1-o'rin rekordi",
      stat2Val: "100%",
      stat2Title: "OTMlarga Kirish",
      stat2Desc: "Barcha bitiruvchilarimiz nufuzli davlat va xalqaro universitetlar talabalari bo'lishdi",
      stat3Val: "674+",
      stat3Title: "Rasmiy Sertifikatlar",
      stat3Desc: "O'quvchilarimiz qo'lga kiritgan Milliy, IELTS, SAT va fan sertifikatlari (ERP tizimi bo'yicha)",
      stat4Val: "103",
      stat4Title: "Olimpiada Mukofotlari",
      stat4Desc: "Xalqaro, respublika va viloyat miqyosidagi fan olimpiadalarida qo'lga kiritilgan medallar",
      stat5Val: "46+",
      stat5Title: "Malakali Pedagoglar",
      stat5Desc: "100% oliy toifali, PhD va xalqaro sertifikatga ega mutaxassislar",
      stat6Val: "$1.69M",
      stat6Title: "Xorijiy Grantlar",
      stat6Desc: "Jahonning top-100 universitetlaridan bitiruvchilarimiz yutib olgan umumiy stipendiya hajmi",
    },
    ru: {
      badge: "Подтвержденные показатели",
      title: "Наша школа в цифрах",
      subtitle:
        "Официально подтвержденные показатели академической результативности Агентства специализированных образовательных учреждений.",
      stat1Val: "170.9",
      stat1Title: "Средний балл DTM",
      stat1Desc: "1-е место и абсолютный рекорд среди специализированных школ Хорезмской области",
      stat2Val: "100%",
      stat2Title: "Поступление в вузы",
      stat2Desc: "Все выпускники зачислены в ведущие государственные и зарубежные университеты",
      stat3Val: "674+",
      stat3Title: "Сертификатов в базе",
      stat3Desc: "Национальные сертификаты, IELTS, SAT, подтвержденные в единой ERP-базе",
      stat4Val: "103",
      stat4Title: "Награды олимпиад",
      stat4Desc: "Призовые места и медали международных и республиканских олимпиад",
      stat5Val: "46+",
      stat5Title: "Опытных педагогов",
      stat5Desc: "100% высшей квалификационной категории, доктора наук (PhD) и сертифицированные наставники",
      stat6Val: "$1.69M",
      stat6Title: "Зарубежных грантов",
      stat6Desc: "Стипендии выпускников в ведущих мировых университетах из топ-100 QS",
    },
    en: {
      badge: "Verified Statistics",
      title: "Our Institution by the Numbers",
      subtitle:
        "Accredited institutional performance verified by the Agency for Specialized Educational Institutions.",
      stat1Val: "170.9",
      stat1Title: "Mean DTM Score",
      stat1Desc: "Ranked #1 in Khorezm across all specialized and state secondary schools",
      stat2Val: "100%",
      stat2Title: "College Matriculation",
      stat2Desc: "Uncompromising 100% acceptance into competitive universities domestically and abroad",
      stat3Val: "674+",
      stat3Title: "Verified Certificates",
      stat3Desc: "National subject certificates, IELTS, and SAT credentials recorded in the official ERP roster",
      stat4Val: "103",
      stat4Title: "Olympiad Laureates",
      stat4Desc: "Honors and medals earned across international, national, and regional STEM competitions",
      stat5Val: "46+",
      stat5Title: "Faculty Members",
      stat5Desc: "100% hold advanced state certification, PhD degrees, or international credentials",
      stat6Val: "$1.69M",
      stat6Title: "Global Scholarships",
      stat6Desc: "Total funding won by our seniors at global top-ranked universities",
    },
  }[language]

  const stats = [
    {
      val: t.stat1Val,
      title: t.stat1Title,
      desc: t.stat1Desc,
      icon: Trophy,
      highlight: true,
    },
    {
      val: t.stat2Val,
      title: t.stat2Title,
      desc: t.stat2Desc,
      icon: GraduationCap,
      highlight: false,
    },
    {
      val: t.stat3Val,
      title: t.stat3Title,
      desc: t.stat3Desc,
      icon: FileCheck,
      highlight: true,
    },
    {
      val: t.stat4Val,
      title: t.stat4Title,
      desc: t.stat4Desc,
      icon: Award,
      highlight: false,
    },
    {
      val: t.stat5Val,
      title: t.stat5Title,
      desc: t.stat5Desc,
      icon: Users,
      highlight: false,
    },
    {
      val: t.stat6Val,
      title: t.stat6Title,
      desc: t.stat6Desc,
      icon: CheckCircle,
      highlight: true,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#10243A] border-b border-[#E2E8F0] dark:border-[#1E3650] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/10 text-[#10243A] dark:text-[#C6A15B] text-xs font-bold mb-3 border border-[#C6A15B]/20">
            <CheckCircle size={14} className="text-[#C6A15B]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172638] dark:text-white tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-base text-[#68778A] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] hover:border-[#C6A15B] transition-all hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-[#10243A] dark:text-white tracking-tight group-hover:text-[#C6A15B] transition-colors">
                      {s.val}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] flex items-center justify-center text-[#C6A15B] shadow-xs">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#172638] dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#68778A] dark:text-slate-400 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
