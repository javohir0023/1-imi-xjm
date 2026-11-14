"use client"

import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramCTA from "@/components/telegram-cta"
import { Users, Rocket, Cpu, Award, Globe, Heart, CheckCircle2, Send, ExternalLink } from "lucide-react"

function StudentsContent() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "O'quvchilar Jamiyati",
      title: "Maktab Hayoti va Yoshlar Tashabbuslari",
      subtitle:
        "Urganch 1-IMI o'quvchilari nafaqat kuchli akademik bilim oladilar, balki ijtimoiy loyihalar, startaplar, robototexnika va sportda faol ishtirok etadilar.",
      clubsTitle: "Iqtidor To'garaklari va Klublar",
      club1Title: "Robototexnika & STEM Klubi",
      club1Desc: "Arduino, mikrokontrollerlar, dronlar va avtomatlashtirilgan robotlar konstruksiyasi.",
      club2Title: "Dasturlash & Algoritmlar Klubi",
      club2Desc: "Python, C++, veb-dasturlash va kiberxavfsizlik asoslari bo'yicha amaliy to'garak.",
      club3Title: "Debat & Notiqlik Klubi",
      club3Desc: "O'zbek va ingliz tillarida rasmiy Karl Popper andozasidagi intellektual munozaralar.",
      club4Title: "Yosh Ixtirochilar & Startaplar",
      club4Desc: "Smart Heating, Loopify va Edu Bus kabi yoshlar grantlarini yutgan innovatsion loyihalar.",
      councilTitle: "O'quvchilar Kengashi (Student Council)",
      councilDesc: "Maktab ma'muriyati bilan hamkorlikda madaniy, ma'rifiy va sport tadbirlarini tashkil etuvchi iqtidorli o'quvchilar yetakchilik organi.",
      telegramInvite: "O'quvchilar hayotini Telegramda kuzating",
    },
    ru: {
      badge: "Студенческое сообщество",
      title: "Жизнь школы и молодежные инициативы",
      subtitle:
        "Учащиеся Урганч 1-ИМИ активно реализуют стартапы, участвуют в робототехнике, спорте и дебатах.",
      clubsTitle: "Клубы по интересам и кружки",
      club1Title: "Клуб робототехники и STEM",
      club1Desc: "Конструирование роботов, пайка, программирование микроконтроллеров и дроны.",
      club2Title: "Клуб программирования",
      club2Desc: "Практическое освоение Python, C++, веб-технологий и кибербезопасности.",
      club3Title: "Дебатный клуб",
      club3Desc: "Интеллектуальные дискуссии и ораторское мастерство на узбекском и английском языках.",
      club4Title: "Стартапы и инновации",
      club4Desc: "Проекты-победители национальных грантов: Smart Heating, Loopify и Edu Bus.",
      councilTitle: "Школьный совет учащихся",
      councilDesc: "Орган самоуправления учеников, организующий конкурсы, благотворительные и спортивные акции.",
      telegramInvite: "Следите за событиями в Telegram",
    },
    en: {
      badge: "Student Community",
      title: "Campus Life & Student Initiatives",
      subtitle:
        "Urganch 1-IMI scholars excel in competitive research, engineering clubs, student government, and athletics.",
      clubsTitle: "Student Clubs & Co-Curriculars",
      club1Title: "Robotics & STEM Studio",
      club1Desc: "Designing autonomous robots, sensor telemetry, and embedded electronics.",
      club2Title: "Coding & Cyber Guild",
      club2Desc: "Algorithms in C++, applied Python pipelines, and foundational cybersecurity.",
      club3Title: "Debate & Oratory Society",
      club3Desc: "Formal parliamentary debates in Uzbek and English advancing public persuasion.",
      club4Title: "Youth Startup Incubator",
      club4Desc: "National grant-winning ventures including Smart Heating System and Loopify.",
      councilTitle: "Elected Student Council",
      councilDesc: "Collaborative student leadership driving community initiatives and academic integrity.",
      telegramInvite: "Follow Student Life on Telegram",
    },
  }[language]

  const clubs = [
    { title: t.club1Title, desc: t.club1Desc, icon: Cpu },
    { title: t.club2Title, desc: t.club2Desc, icon: Globe },
    { title: t.club3Title, desc: t.club3Desc, icon: Users },
    { title: t.club4Title, desc: t.club4Desc, icon: Rocket },
  ]

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      <section className="bg-[#10243A] text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
              <Users size={14} className="text-[#C6A15B]" />
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

      {/* Clubs & Activities */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] dark:text-white mb-3">
              {t.clubsTitle}
            </h2>
            <p className="text-sm text-[#68778A] dark:text-slate-400">
              O'quvchilarimiz darsdan so'ng qiziqishlari bo'yicha mustaqil klublarda faoliyat olib boradilar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubs.map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={i}
                  className="p-7 rounded-2xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs hover:border-[#C6A15B] transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] flex items-center justify-center text-[#C6A15B] mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-bold text-[#10243A] dark:text-white mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#68778A] dark:text-slate-400 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Student Council & Activities Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl font-extrabold text-[#10243A] dark:text-white">
                {t.councilTitle}
              </h3>
              <p className="text-sm text-[#68778A] dark:text-slate-300 leading-relaxed">
                {t.councilDesc}
              </p>
            </div>
            <a
              href="https://t.me/Urganch_IMI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#0088cc] hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 flex-shrink-0"
            >
              <Send size={15} />
              <span>{t.telegramInvite}</span>
            </a>
          </div>
        </div>
      </section>

      <TelegramCTA />
      <Footer />
    </div>
  )
}

export default function StudentsPage() {
  return (
    <LanguageProvider>
      <StudentsContent />
    </LanguageProvider>
  )
}
