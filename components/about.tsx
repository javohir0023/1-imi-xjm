"use client"

import { BookOpen, Users, Award, Building2, Shield, Compass, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export default function About() {
  const { language } = useLanguage()

  const translations = {
    uz: {
      badge: "Rasmiy Institutiv Ma'lumot",
      title: "Urganch 1-IMI Haqida",
      subtitle:
        "O'zbekiston Respublikasi Prezidentining 2022-yildagi PF-269-sonli Farmoniga muvofiq tashkil etilgan ilg'or davlat ta'lim maskani.",
      missionTitle: "Maktabning Asosiy Missiyasi",
      missionText:
        "Ilm-fanni hayot bilan bog'laydigan, mustaqil va tanqidiy fikrlaydigan hamda O'zbekiston taraqqiyotiga hissa qo'shadigan intellektual yetakchilar avlodini tarbiyalash.",
      decreeTitle: "Davlat maqomi va Yo'nalishlar",
      decreeText:
        "Maktab O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi huzuridagi Ixtisoslashtirilgan ta'lim muassasalari agentligi tasarrufidagi aniq va tabiiy fanlarga ixtisoslashtirilgan muassasadir. Ta'lim davlat granti asosida bepul amalga oshiriladi.",
      feature1Title: "Ixtisoslashtirilgan Ta'lim",
      feature1Desc: "Aniq fanlar (matematika, fizika) va tabiiy fanlar (biologiya, kimyo) chuqurlashtirilgan dasturlari.",
      feature2Title: "Kuchli Pedagoglar Tarkibi",
      feature2Desc: "44 nafar tajribali o'qituvchi: 2 nafar fan doktori (PhD), 22 nafar magistr, 95.4% oliy davlat toifasi.",
      feature3Title: "Zamonaviy Infratuzilma",
      feature3Desc: "576 o'rinli 3 qavatli bino, matematika bloki, fizika va kimyo laboratoriyalari, axborot-resurs markazi.",
      feature4Title: "Xalqaro Natijadorlik",
      feature4Desc: "Xalqaro va respublika fan olimpiadalarida 103 ta mukofot, 100% oliy o'quv yurtlariga qabul.",
      campusHighlights: "Kampus Infratuzilmasi",
      cItem1: "3 qavatli ixtisoslashtirilgan o'quv korpusi",
      cItem2: "Zamonaviy fizika, kimyo va biologiya laboratoriyalari",
      cItem3: "Robototexnika va axborot texnologiyalari xonalari",
      cItem4: "Axborot-resurs markazi va boy kitob fondi",
      cItem5: "Sport zali va sun'iy qoplamali futbol maydoni",
      cItem6: "2027-yilda foydalanishga topshiriladigan yangi yotoqxona",
      moreBtn: "To'liq maktab profilini o'qish",
    },
    ru: {
      badge: "Официальная информация",
      title: "О школе Урганч 1-ИМИ",
      subtitle:
        "Передовое государственное образовательное учреждение, созданное в соответствии с Указом Президента Республики Узбекистан № УП-269 от 2022 года.",
      missionTitle: "Миссия школы",
      missionText:
        "Воспитание поколения интеллектуальных лидеров, связывающих знания с жизнью, мыслящих критически и вносящих вклад в развитие Узбекистана.",
      decreeTitle: "Государственный статус и направления",
      decreeText:
        "Школа входит в систему Агентства специализированных образовательных учреждений и специализируется на точных и естественных науках. Обучение осуществляется полностью за счет государственного гранта.",
      feature1Title: "Специализированное образование",
      feature1Desc: "Углубленные программы по точным (математика, физика) и естественным (биология, химия) наукам.",
      feature2Title: "Квалифицированный состав",
      feature2Desc: "44 преподавателя: 2 доктора философии (PhD), 22 магистра, 95.4% высшей квалификационной категории.",
      feature3Title: "Современная инфраструктура",
      feature3Desc: "3-этажный корпус на 576 мест, лаборатории физики и химии, информационно-ресурсный центр.",
      feature4Title: "Международные достижения",
      feature4Desc: "103 призовых места на олимпиадах за 4 года, 100% поступление в вузы.",
      campusHighlights: "Инфраструктура кампуса",
      cItem1: "3-этажный специализированный учебный корпус",
      cItem2: "Лаборатории физики, химии и биологии",
      cItem3: "Кабинеты робототехники и IT",
      cItem4: "Информационно-ресурсный центр с богатым книжным фондом",
      cItem5: "Спортивный зал и футбольное поле",
      cItem6: "Строящееся современное общежитие (сдача в 2027 г.)",
      moreBtn: "Читать профиль школы",
    },
    en: {
      badge: "Official Institutional Profile",
      title: "About Urganch 1-IMI",
      subtitle:
        "An advanced state boarding school established under Presidential Decree PF-269 in 2022.",
      missionTitle: "School Mission",
      missionText:
        "To raise a generation of intellectual leaders who connect knowledge to life, think independently and critically, and contribute to Uzbekistan’s development.",
      decreeTitle: "Institutional Status & Pathways",
      decreeText:
        "Operating within the national network of the Agency for Specialized Educational Institutions, specializing in exact and natural sciences. Admission is strictly by competitive merit examination and fully state-funded.",
      feature1Title: "Specialized Curriculum",
      feature1Desc: "Advanced syllabi in exact sciences (math, physics) and natural sciences (biology, chemistry) exceeding general requirements.",
      feature2Title: "Distinguished Faculty",
      feature2Desc: "44 teachers: 2 PhDs, 22 master's degree holders, 95.4% holding highest state category.",
      feature3Title: "Modern Campus",
      feature3Desc: "576-capacity 3-storey building, dedicated mathematics block, labs, gym, and resource center.",
      feature4Title: "Proven Excellence",
      feature4Desc: "103 olympiad prizes over 4 years, 100% university admission rate, and $1.69M abroad scholarships.",
      campusHighlights: "Campus Infrastructure",
      cItem1: "Three-storey specialized academic building",
      cItem2: "Dedicated physics, chemistry and biology laboratories",
      cItem3: "Robotics and IT computer suites",
      cItem4: "Library and Information Resource Centre",
      cItem5: "Indoor gymnasium and football pitch",
      cItem6: "Purpose-built dormitory completing in autumn 2027",
      moreBtn: "Read Full School Profile",
    },
  }

  const t = translations[language] || translations.uz

  const features = [
    { icon: Compass, title: t.feature1Title, desc: t.feature1Desc },
    { icon: Users, title: t.feature2Title, desc: t.feature2Desc },
    { icon: Building2, title: t.feature3Title, desc: t.feature3Desc },
    { icon: Award, title: t.feature4Title, desc: t.feature4Desc },
  ]

  const highlights = [t.cItem1, t.cItem2, t.cItem3, t.cItem4, t.cItem5, t.cItem6]

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F7F9FC] dark:bg-[#071324] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Shield size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Institutional Presentation */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative group">
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-[#0B1F3A]">
              <img
                src="/images/photo-2025-10-24-21-21-29.jpg"
                alt="Urganch 1-IMI binosi"
                className="w-full h-[380px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="p-5 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-[#0B1F3A] dark:text-white">
                  Urganch shahar, Sheroziy ko'chasi 2-uy
                </div>
                <div className="text-[11px] text-[#64748B] dark:text-slate-400 mt-0.5">
                  576 o'rinli ixtisoslashtirilgan ta'lim kampusi
                </div>
              </div>
            </div>
            {/* Accent badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#C9A227] text-[#0B1F3A] px-4 py-2 rounded-xl font-bold text-xs shadow-md hidden sm:block">
              PF-269 Farmoni asosida
            </div>
          </div>

          {/* Mission & Detailed Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 shadow-xs">
              <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white mb-2 flex items-center gap-2">
                <BookOpen size={18} className="text-[#C9A227]" />
                <span>{t.missionTitle}</span>
              </h3>
              <p className="text-sm text-[#111827] dark:text-slate-200 leading-relaxed">
                {t.missionText}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 shadow-xs">
              <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white mb-2 flex items-center gap-2">
                <Shield size={18} className="text-[#C9A227]" />
                <span>{t.decreeTitle}</span>
              </h3>
              <p className="text-sm text-[#64748B] dark:text-slate-300 leading-relaxed mb-4">
                {t.decreeText}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-[#C9A227] mb-2.5">
                {t.campusHighlights}:
              </h4>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#111827] dark:text-slate-300">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#C9A227] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link href="/school-profile">
                <button className="px-6 py-2.5 bg-[#0B1F3A] hover:bg-[#123B66] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] font-bold text-xs rounded-lg transition-all shadow-xs flex items-center gap-2">
                  <span>{t.moreBtn}</span>
                  <span>→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid: School Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="academic-card p-6 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/5 dark:bg-white/10 flex items-center justify-center text-[#C9A227] mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-base mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
