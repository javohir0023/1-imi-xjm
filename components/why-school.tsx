"use client"

import { Cpu, GraduationCap, Trophy, Globe, Sparkles, Building, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function WhySchool() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Afzalliklar va Imkoniyatlar",
      title: "Nima uchun aynan Urganch 1-IMI?",
      subtitle:
        "O'quvchilarning intellektual salohiyatini ro'yobga chiqarish va xalqaro maydonga olib chiqish uchun yaratilgan 6 ta asosiy ustun.",
      item1Title: "Viloyatda 1-o'rindagi DTM Natijasi",
      item1Desc: "Bitiruvchilarimiz o'rtacha 170.9 ball (maksimal 189 balldan) to'plab, Xorazmdagi eng yuqori natijani qayd etgan.",
      item2Title: "Xalqaro Fan Olimpiadalari Tayyorgarligi",
      item2Desc: "Kiberxavfsizlik, Al-Xorazmiy, IJSO va IMO xalqaro olimpiadalarida kumush va bronza medallari qo'lga kiritilgan.",
      item3Title: "Oliy Ta'limga 100% Qabul",
      item3Desc: "Barcha bitiruvchilar nufuzli davlat oliygohlariga va Manchester, Harbin, Michigan kabi xorijiy universitetlarga qabul qilingan.",
      item4Title: "Zamonaviy IT, Robototexnika va STEM",
      item4Desc: "Smart isitish, Loopify, Edu Bus kabi talabalar startaplari va 14 million so'mlik innovatsiya grantlari joriy etilgan.",
      item5Title: "$1 690 000 Xorijiy Grantlar Jamg'armasi",
      item5Desc: "Bitiruvchilarimiz dunyo top-100 va top-20 oliygohlarida to'liq moliyalashtirilgan grantlar sohibi bo'lmoqda.",
      item6Title: "Davlat Tomonidan To'liq Moliyalashtirilgan",
      item6Desc: "Ta'lim, yotoqxona va 2 mahal issiq ovqat davlat granti hisobidan to'liq qoplanadi.",
    },
    ru: {
      badge: "Преимущества и возможности",
      title: "Почему именно Урганч 1-ИМИ?",
      subtitle:
        "6 ключевых преимуществ для раскрытия интеллектуального потенциала учащихся и выхода на международный уровень.",
      item1Title: "1-е место по баллам DTM в области",
      item1Desc: "Средний балл наших выпускников составляет 170.9 из 189 возможных — лучший результат среди школ Хорезма.",
      item2Title: "Подготовка к международным олимпиадам",
      item2Desc: "Медали на престижных олимпиадах по кибербезопасности, Аль-Хорезми, IJSO и IMO.",
      item3Title: "100% поступление в университеты",
      item3Desc: "Все выпускники поступают в ведущие государственные вузы и зарубежные университеты (Manchester, Harbin, Michigan).",
      item4Title: "Современные IT, робототехника и STEM",
      item4Desc: "Студенческие стартапы, собственные проекты и 14 млн сумов грантов на молодежные инновации.",
      item5Title: "$1 690 000 в стипендиях и грантах",
      item5Desc: "Стипендии ведущих мировых вузов из топ-100 и топ-20 рейтингов QS.",
      item6Title: "Полное государственное финансирование",
      item6Desc: "Обучение, проживание и питание полностью финансируются за счет государственного бюджета.",
    },
    en: {
      badge: "Institutional Excellence",
      title: "Why Choose Urganch 1-IMI?",
      subtitle:
        "Six institutional pillars engineered to foster academic brilliance and global university placements.",
      item1Title: "#1 Mean DTM Score in Khorezm",
      item1Desc: "Our graduates average 170.9 points out of 189, representing the highest performance of any specialized school in Khorezm.",
      item2Title: "Elite Olympiad Coaching",
      item2Desc: "Medals won at the International Cybersecurity Olympiad, Al-Khwarizmi, IJSO Romania, and IMO Turkmenistan.",
      item3Title: "100% University Admission Rate",
      item3Desc: "Every graduate matriculates into competitive state universities and premier global destinations.",
      item4Title: "Applied Robotics, AI & STEM",
      item4Desc: "Active student startups including Smart Heating, Loopify, and Edu Bus backed by national innovation grants.",
      item5Title: "$1.69 Million in Scholarships Abroad",
      item5Desc: "Offers from world top-50 universities including University of Manchester (QS 34) and Harbin Institute of Technology.",
      item6Title: "Fully State-Funded Education",
      item6Desc: "Instruction, boarding, meals, and laboratory resources are 100% covered by merit-based state funding.",
    },
  }[language]

  const pillars = [
    { icon: Trophy, title: t.item1Title, desc: t.item1Desc, color: "text-[#C9A227]" },
    { icon: Globe, title: t.item2Title, desc: t.item2Desc, color: "text-[#123B66] dark:text-blue-400" },
    { icon: GraduationCap, title: t.item3Title, desc: t.item3Desc, color: "text-[#0B1F3A] dark:text-sky-300" },
    { icon: Cpu, title: t.item4Title, desc: t.item4Desc, color: "text-[#C9A227]" },
    { icon: Sparkles, title: t.item5Title, desc: t.item5Desc, color: "text-[#123B66] dark:text-blue-400" },
    { icon: Building, title: t.item6Title, desc: t.item6Desc, color: "text-[#0B1F3A] dark:text-sky-300" },
  ]

  return (
    <section id="education" className="py-20 md:py-28 bg-white dark:bg-[#0B1F3A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Sparkles size={14} className="text-[#C9A227]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="academic-card p-7 rounded-2xl bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800 transition-all hover:border-[#C9A227]"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0B1F3A] shadow-xs flex items-center justify-center mb-5 border border-slate-200 dark:border-slate-700">
                  <Icon size={24} className={item.color} />
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
