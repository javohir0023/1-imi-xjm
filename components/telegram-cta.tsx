"use client"

import { Send, ExternalLink, Bell, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function TelegramCTA() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Rasmiy Axborot Manbasi",
      title: "Telegram Kanalimizga Obuna Bo'ling",
      subtitle:
        "Urganch shahar 1-son ixtisoslashtirilgan maktab-internatining eng tezkor va ishonchli xabarlari, olimpiada g'oliblari, e'lonlar va maktab hayoti yoritib boriladi.",
      channelTag: "@Urganch_IMI",
      buttonText: "Telegram kanaliga obuna bo‘lish",
      feature1: "Kunlik rasmiy yangiliklar va foto-hisobotlar",
      feature2: "Fan olimpiadalari va tanlov natijalari",
      feature3: "Qabul jarayoni va muhim sanalar haqida e'lonlar",
      feature4: "O'quvchilar va ustozlarimizning erishgan yutuqlari",
      membersNotice: "Barcha o'quvchilar, ota-onalar va ustozlar kuzatib boradi",
    },
    ru: {
      badge: "Официальный источник информации",
      title: "Подписывайтесь на наш Telegram-канал",
      subtitle:
        "Оперативные новости, объявления, результаты олимпиад и яркие моменты жизни школы-интерната №1 г. Ургенча.",
      channelTag: "@Urganch_IMI",
      buttonText: "Подписаться на Telegram-канал",
      feature1: "Ежедневные официальные новости и фотоотчеты",
      feature2: "Результаты предметных олимпиад и конкурсов",
      feature3: "Объявления о процессе приёма и важных датах",
      feature4: "Достижения наших учащихся и педагогов",
      membersNotice: "Официальный канал для учащихся, родителей и преподавателей",
    },
    en: {
      badge: "Official Information Stream",
      title: "Join Our Official Telegram Channel",
      subtitle:
        "Stay informed with real-time school news, olympiad triumphs, institutional notices, and campus highlights from Urganch 1-IMI.",
      channelTag: "@Urganch_IMI",
      buttonText: "Subscribe to Telegram Channel",
      feature1: "Daily official briefings and photo reports",
      feature2: "Science olympiad results and recognitions",
      feature3: "Admissions schedule and institutional deadlines",
      feature4: "Student accolades and faculty distinctions",
      membersNotice: "Followed by students, guardians, and academic community",
    },
  }[language]

  return (
    <section className="py-16 md:py-24 bg-[#10243A] text-white relative overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#183650] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#183650]/90 via-[#10243A] to-[#10243A] border border-[#C6A15B]/30 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
                <Send size={13} className="text-[#C6A15B]" />
                <span>{t.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
                {t.subtitle}
              </p>

              {/* Verified Features */}
              <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                {[t.feature1, t.feature2, t.feature3, t.feature4].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                    <CheckCircle2 size={16} className="text-[#C6A15B] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-slate-400 font-medium flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#C6A15B]" />
                <span>{t.membersNotice}</span>
              </div>
            </div>

            {/* Right Action Button Card */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start lg:items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-16 h-16 rounded-2xl bg-[#0088cc] flex items-center justify-center text-white shadow-lg mb-4">
                <Send size={32} />
              </div>

              <div className="text-center mb-6">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Rasmiy kanal
                </div>
                <div className="text-xl font-extrabold text-white mt-1">
                  {t.channelTag}
                </div>
              </div>

              <a
                href="https://t.me/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>{t.buttonText}</span>
                <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://t.me/s/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2.5 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/20 flex items-center justify-center gap-1.5"
              >
                <span>Ommaviy veb-tasmani ochish (t.me/s/Urganch_IMI)</span>
                <ExternalLink size={13} />
              </a>

              <p className="text-[11px] text-slate-400 text-center mt-3">
                t.me/Urganch_IMI hamda t.me/s/Urganch_IMI orqali ochiq
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
