"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Youtube, Send, ShieldCheck, Sparkles, ExternalLink, Film, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function IntroVideo() {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeVideoId, setActiveVideoId] = useState("local-intro")

  const videos = [
    {
      id: "local-intro",
      type: "local",
      src: "/maktab intro.MOV",
      titleUz: "Urganch 1-IMI rasmiy intro videoroligi",
      titleRu: "Официальный интро-видеоролик Урганч 1-ИМИ",
      titleEn: "Urganch 1-IMI Official Intro Video",
      descUz: "Urganch shahar 1-son IMI o'quv muhiti, innovatsion sharoitlari va iqtidorli yoshlar hayoti.",
      badge: "Asosiy Intro Video",
    },
    {
      id: "BcGrHz6sbxY",
      type: "youtube",
      youtubeId: "BcGrHz6sbxY",
      titleUz: "Maktab taqdimoti va foydalanishga topshirilishi",
      titleRu: "Презентация и открытие Урганч 1-ИМИ",
      titleEn: "Urganch 1-IMI Inauguration Tour",
      descUz: "Maktab binosi, zamonaviy auditoriyalar va tantanali ochilish marosimidan lavhalar.",
      badge: "YouTube Taqdimot",
    },
    {
      id: "qrbE9bw7q0g",
      type: "youtube",
      youtubeId: "qrbE9bw7q0g",
      titleUz: "Maktab hayoti va o'quv jarayonidan maxsus lavha",
      titleRu: "Специальный репортаж о жизни школы",
      titleEn: "Campus Life & Academic Routine Report",
      descUz: "O'quvchilarning laboratoriya mashg'ulotlari, to'garaklar va dars jarayonlari.",
      badge: "O'quv Muhiti",
    },
  ]

  const t = {
    uz: {
      badge: "Rasmiy Video Taqdimot",
      title: "Maktabimiz bilan Yaqindan Tanishing",
      subtitle:
        "Urganch shahar 1-son ixtisoslashtirilgan maktab-internatining zamonaviy o'quv korpusi, innovatsion laboratoriyalari va intellektual muhiti haqida rasmiy videolavha.",
      watchVideo: "Videoni tomosha qilish",
      nowPlaying: "Hozir ko'rilmoqda",
      quality: "Full HD 1080p",
      verifiedSource: "Rasmiy YouTube kanali lavhasi",
      youtubeBtn: "YouTube'da to'liq tomosha qilish",
      telegramBtn: "Telegram kanalimizdagi videolar",
      highlight1: "3 qavatli 576 o'rinli zamonaviy kampus",
      highlight2: "Zamonaviy fizika va kimyo laboratoriyalari",
      highlight3: "Aniq fanlar va Cambridge xalqaro dasturlari",
      highlight4: "Robototexnika, sport va ijodiy to'garaklar",
    },
    ru: {
      badge: "Официальный видео-обзор",
      title: "Познакомьтесь с нашей школой",
      subtitle:
        "Официальный видеоролик о современном кампусе, инновационных лабораториях и академической атмосфере Урганч 1-ИМИ.",
      watchVideo: "Смотреть видео",
      nowPlaying: "Сейчас играет",
      quality: "Full HD 1080p",
      verifiedSource: "Официальный сюжет YouTube-канала",
      youtubeBtn: "Смотреть на YouTube",
      telegramBtn: "Видео в Telegram",
      highlight1: "3-этажный кампус на 576 учащихся",
      highlight2: "Современные лаборатории физики и химии",
      highlight3: "Точные науки и стандарты Cambridge",
      highlight4: "Робототехника, спорт и секции",
    },
    en: {
      badge: "Official Video Tour",
      title: "Discover Urganch 1-IMI on Video",
      subtitle:
        "An authentic visual tour showcasing our modern campus, advanced STEM laboratories, and inspiring academic environment.",
      watchVideo: "Watch Intro Video",
      nowPlaying: "Now Playing",
      quality: "Full HD 1080p",
      verifiedSource: "Official YouTube Channel Feature",
      youtubeBtn: "Watch on Official YouTube",
      telegramBtn: "Browse Videos on Telegram",
      highlight1: "Three-storey 576-capacity campus",
      highlight2: "State-of-the-art physics and chemistry labs",
      highlight3: "Exact sciences & Cambridge curricula",
      highlight4: "Robotics studio, sports arena, and arts",
    },
  }[language]

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0]

  return (
    <section id="intro-video" className="py-20 md:py-28 bg-[#10243A] text-white relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0088cc]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold mb-3 border border-white/15">
            <Film size={14} className="text-[#C6A15B]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            {t.title}
          </h2>
          <p className="text-base text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Video Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {videos.map((vid) => {
            const title =
              language === "ru" ? vid.titleRu : language === "en" ? vid.titleEn : vid.titleUz
            const isActive = activeVideoId === vid.id
            return (
              <button
                key={vid.id}
                onClick={() => {
                  setActiveVideoId(vid.id)
                  setIsPlaying(true)
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#C6A15B] text-[#10243A] border-[#C6A15B] shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/15"
                }`}
              >
                <Play size={13} className={isActive ? "fill-current" : ""} />
                <span>{title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? "bg-[#10243A] text-white" : "bg-white/10 text-[#C6A15B]"
                  }`}
                >
                  {vid.badge}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cinematic Video Player Container */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-black relative">
          <div className="relative w-full aspect-video">
            {isPlaying ? (
              activeVideo.type === "local" ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover bg-black"
                >
                  <source src="/maktab intro.MOV" type="video/mp4" />
                  <source src="/maktab intro.MOV" type="video/quicktime" />
                  Brauzeringiz HTML5 videoni qo'llab-quvvatlamaydi.
                </video>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.titleUz}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )
            ) : (
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                <Image
                  src="/images/photo-2025-10-24-21-21-29.jpg"
                  alt="Urganch 1-IMI Intro Video Poster"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700 opacity-75"
                  priority
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>

                {/* Top Info Bar */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-semibold">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10243A]/80 backdrop-blur-md border border-white/10">
                    <ShieldCheck size={14} className="text-[#C6A15B]" />
                    <span>{t.verifiedSource}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-red-600/90 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    <span>{t.quality}</span>
                  </div>
                </div>

                {/* Center Giant Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative group/btn">
                    <div className="absolute -inset-4 bg-[#C6A15B]/30 rounded-full blur-md animate-pulse"></div>
                    <button
                      aria-label="Play Intro Video"
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110"
                    >
                      <Play size={36} className="fill-[#10243A] translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Bottom Video Meta Preview */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <div className="text-[11px] uppercase tracking-wider text-[#C6A15B] font-bold">
                      {activeVideo.badge} • Urganch 1-IMI
                    </div>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                      {language === "ru"
                        ? activeVideo.titleRu
                        : language === "en"
                        ? activeVideo.titleEn
                        : activeVideo.titleUz}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal">
                      {activeVideo.descUz}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-bold text-white transition-colors">
                      <Play size={14} className="fill-white" />
                      <span>{t.watchVideo}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action bar below video player */}
          <div className="p-4 sm:p-5 bg-[#0B1726] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Youtube size={16} className="text-red-500" />
              <span className="font-semibold">Rasmiy YouTube kanal: @urganch_imi1</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeVideo.type === "local" ? (
                <a
                  href="/maktab intro.MOV"
                  download="Urganch_1_IMI_Intro.mov"
                  className="px-4 py-2 rounded-lg bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Film size={14} />
                  <span>Videoni yuklab olish (HD)</span>
                </a>
              ) : (
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Youtube size={14} />
                  <span>{t.youtubeBtn}</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <a
                href="https://t.me/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <Send size={13} />
                <span>{t.telegramBtn}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Institutional Highlights Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            t.highlight1,
            t.highlight2,
            t.highlight3,
            t.highlight4,
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3"
            >
              <CheckCircle2 size={18} className="text-[#C6A15B] flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-200 leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
