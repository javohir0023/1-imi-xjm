"use client"

import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SchoolStats from "@/components/school-stats"
import TelegramCTA from "@/components/telegram-cta"
import { Shield, BookOpen, Compass, Building2, Users, Award, CheckCircle, ExternalLink, Download } from "lucide-react"
import Link from "next/link"

function AboutContent() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Maktabimiz Tarixi va Maqsadi",
      title: "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati",
      subtitle:
        "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tasarrufidagi aniq va tabiiy fanlarga ixtisoslashtirilgan yetakchi davlat ta'lim maskani.",
      historyTitle: "Tashkil etilishi va Maqomi",
      historyP1:
        "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati O'zbekiston Respublikasi Prezidentining 2022-yildagi PF-269-sonli Farmoniga muvofiq, iqtidorli yoshlarni aniqlash, ularni chuqurlashtirilgan davlat standartlari asosida o'qitish va xalqaro maydonga tayyorlash maqsadida tashkil etilgan.",
      historyP2:
        "Maktabda ta'lim to'liq davlat granti asosida bepul olib boriladi. O'quvchilar xavfsiz internat yotoqxonasi, kuniga 5 mahal issiq ovqat, zamonaviy laboratoriyalar va yuqori tezlikdagi axborot texnologiyalari bilan ta'minlangan.",
      missionTitle: "Missiyamiz va Falsafamiz",
      missionP1:
        "Bizning asosiy maqsadimiz — shunchaki nazariy bilim berish emas, balki tanqidiy va tahliliy fikrlaydigan, ilmiy muammolarga kreativ yondashuvchi, xalqaro fan olimpiadalarida yurtimiz bayrog'ini baland ko'taruvchi hamda jahonning eng ilg'or oliygohlarida raqobatbardosh bo'lgan vatanparvar yetakchilarni tarbiyalashdir.",
      infraTitle: "Zamonaviy Kampus va Infratuzilma",
      infraItem1: "576 o'ringa mo'ljallangan 3 qavatli zamonaviy ixtisoslashtirilgan bino",
      infraItem2: "Germaniya va Yaponiya andozasidagi Fizika, Kimyo va Biologiya laboratoriyalari",
      infraItem3: "Robototexnika, Sun'iy intellekt va dasturlash uchun jihozlangan IT markaz",
      infraItem4: "10 000 dan ortiq ilmiy va badiiy kitoblarga ega Axborot-resurs markazi (ARM)",
      infraItem5: "Yopiq sport majmuasi, sun'iy qoplamali stadion va workout maydonchasi",
      infraItem6: "2027-yilda to'liq foydalanishga topshiriladigan yangi zamonaviy yotoqxona korpusi",
      downloadDossier: "Maktab Profilini Yuklab Olish (PDF)",
      schoolModeBtn: "Maktab Rejimini Ko'rish",
    },
    ru: {
      badge: "История и миссия школы",
      title: "Специализированная школа-интернат №1 г. Ургенча",
      subtitle:
        "Ведущее государственное образовательное учреждение точных и естественных наук в системе Агентства специализированных образовательных учреждений.",
      historyTitle: "Создание и государственный статус",
      historyP1:
        "Школа-интернат создана в соответствии с Указом Президента Республики Узбекистан № УП-269 от 2022 года с целью воспитания интеллектуально одаренной молодежи.",
      historyP2:
        "Обучение полностью бесплатное за счет государственного гранта. Учащиеся обеспечены комфортным общежитием, 5-разовым питанием и научными лабораториями.",
      missionTitle: "Наша миссия и философия",
      missionP1:
        "Наша цель — воспитание поколения ученых, инженеров и лидеров, способных решать глобальные вызовы и прославлять страну на международной арене.",
      infraTitle: "Современный кампус и инфраструктура",
      infraItem1: "3-этажный учебный корпус на 576 учащихся",
      infraItem2: "Лаборатории физики, химии и биологии международного стандарта",
      infraItem3: "IT-центр робототехники и искусственного интеллекта",
      infraItem4: "Информационно-ресурсный центр с фондом свыше 10 000 книг",
      infraItem5: "Спортивный комплекс и футбольное поле с искусственным покрытием",
      infraItem6: "Строящееся общежитие (ввод в 2027 г.)",
      downloadDossier: "Скачать Профиль Школы (PDF)",
      schoolModeBtn: "Режим школы",
    },
    en: {
      badge: "History & Institutional Mission",
      title: "Urganch Specialized Boarding School No. 1",
      subtitle:
        "A premier state academy specializing in exact and natural sciences operating under the Agency for Specialized Educational Institutions.",
      historyTitle: "Founding and Accreditation",
      historyP1:
        "Established under Presidential Decree PF-269 in 2022, Urganch 1-IMI is an elite boarding institution designed to cultivate academic excellence among gifted learners.",
      historyP2:
        "Tuition is completely merit-based and 100% state-funded. Students receive boarding accommodations, daily nutritional meal programs, and research lab access.",
      missionTitle: "Our Mission & Educational Philosophy",
      missionP1:
        "We are committed to nurturing critical thinkers, innovative problem solvers, and patriotic leaders prepared to excel at top global universities.",
      infraTitle: "Campus Infrastructure & Laboratories",
      infraItem1: "3-storey specialized academic facility accommodating 576 students",
      infraItem2: "Fully-equipped physics, chemistry, and biology research laboratories",
      infraItem3: "Dedicated robotics, artificial intelligence, and coding suites",
      infraItem4: "Information Resource Center housing over 10,000 academic texts",
      infraItem5: "Indoor athletics gymnasium and artificial turf football arena",
      infraItem6: "State-of-the-art dormitory complex opening in 2027",
      downloadDossier: "Download School Dossier (PDF)",
      schoolModeBtn: "View School Mode",
    },
  }[language]

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero Header */}
      <section className="bg-[#10243A] text-white py-16 lg:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
              <Shield size={14} className="text-[#C6A15B]" />
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

      {/* Main Content Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* History & Status */}
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] dark:text-white">
                {t.historyTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#68778A] dark:text-slate-300 leading-relaxed">
                {t.historyP1}
              </p>
              <p className="text-sm sm:text-base text-[#68778A] dark:text-slate-300 leading-relaxed">
                {t.historyP2}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="/urganch-1-imi-school-profile.pdf"
                  download
                  className="px-5 py-3 bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <Download size={15} />
                  <span>{t.downloadDossier}</span>
                </a>
                <a
                  href="https://dish-load-05854082.figma.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#10243A] hover:bg-[#183650] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <span>{t.schoolModeBtn}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#1E3650] shadow-md bg-white dark:bg-[#10243A]">
              <img
                src="/images/photo-2025-10-24-21-21-29.jpg"
                alt="Urganch 1-IMI kampusi"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-[#10243A] dark:text-white">
                  Urganch shahar, Sheroziy ko'chasi 2-uy
                </div>
                <div className="text-[11px] text-[#68778A] dark:text-slate-400 mt-0.5">
                  576 o'rinli ixtisoslashtirilgan ta'lim kampusi
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Philosophy */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] dark:text-white">
              {t.missionTitle}
            </h2>
            <p className="text-base text-[#68778A] dark:text-slate-300 leading-relaxed max-w-4xl">
              {t.missionP1}
            </p>
          </div>

          {/* Infrastructure Highlights */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] dark:text-white">
              {t.infraTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                t.infraItem1,
                t.infraItem2,
                t.infraItem3,
                t.infraItem4,
                t.infraItem5,
                t.infraItem6,
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs flex items-start gap-3"
                >
                  <CheckCircle size={18} className="text-[#C6A15B] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Stats */}
      <SchoolStats />

      {/* Telegram CTA */}
      <TelegramCTA />

      <Footer />
    </div>
  )
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  )
}
