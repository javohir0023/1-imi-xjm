"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trophy, Award, Search, Globe, ChevronRight, FileCheck, ExternalLink, Sparkles, Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { CertificateItem } from "@/lib/types"

export default function Achievements() {
  const { language } = useLanguage()
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"featured" | "certificates">("featured")
  const [certificates, setCertificates] = useState<CertificateItem[]>([])
  const [loadingCerts, setLoadingCerts] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("all")

  const t = {
    uz: {
      badge: "Xalqaro va Respublika Natijalari",
      title: "O'quvchilarimiz Yutuqlari va Sertifikatlari",
      subtitle:
        "Xalqaro olimpiadalar g'oliblari hamda rasmiy ERP tizimidagi 674 ta tasdiqlangan milliy va xalqaro sertifikatlar bazasi.",
      tabFeatured: "Asosiy Xalqaro Yutuqlar",
      tabArchive: "Sertifikatlar Arxiv Bazasi (ERP 23.10)",
      searchPlaceholder: "O'quvchi ismi yoki o'qituvchi bo'yicha qidiruv...",
      viewFullArchive: "Barcha 674 ta sertifikat arxivini ko'rish",
      studentName: "O'quvchi",
      certType: "Sertifikat turi",
      subject: "Fan",
      level: "Daraja",
      score: "Ball",
      teacher: "Ustoz / Mentor",
      erpBadge: "ERP 23.10 rasmiy bazasi",
      allSubjects: "Barcha fanlar",
    },
    ru: {
      badge: "Международные и республиканские результаты",
      title: "Достижения и сертификаты учащихся",
      subtitle:
        "Победители международных олимпиад и единая база 674 подтвержденных национальных и международных сертификатов из ERP-системы.",
      tabFeatured: "Главные международные победы",
      tabArchive: "Архив сертификатов (ERP 23.10)",
      searchPlaceholder: "Поиск по имени ученика или учителю...",
      viewFullArchive: "Смотреть весь архив из 674 сертификатов",
      studentName: "Ученик",
      certType: "Тип сертификата",
      subject: "Предмет",
      level: "Уровень",
      score: "Балл",
      teacher: "Наставник",
      erpBadge: "Официальная база ERP 23.10",
      allSubjects: "Все предметы",
    },
    en: {
      badge: "International & National Records",
      title: "Student Achievements & Certificate Roster",
      subtitle:
        "Laureates of international science olympiads and the official registry of 674 verified national and international credentials.",
      tabFeatured: "Featured Olympiad Honors",
      tabArchive: "Certificate Registry (ERP 23.10)",
      searchPlaceholder: "Search by student name or teacher...",
      viewFullArchive: "View Complete 674 Certificates Archive",
      studentName: "Student",
      certType: "Certificate",
      subject: "Subject",
      level: "Level",
      score: "Score",
      teacher: "Mentor",
      erpBadge: "Official ERP 23.10 Roster",
      allSubjects: "All subjects",
    },
  }[language]

  // Top featured highlights with official Telegram posts 24179 and 23653
  const featuredAchievements = [
    {
      id: "tg-24179",
      year: "2026",
      title: "Abu Rayhon Beruniy Nomidagi III Xalqaro Kimyo Olimpiadasida Kumush Medal",
      student: "Sheripboyeva Bonu Ermat qizi (11.03-sinf)",
      teacher: "Jumaniyazova Mahliyo",
      desc: "Nukus shahrida o‘tkazilgan nufuzli Abu Rayhon Beruniy nomidagi III Xalqaro Kimyo Olimpiadasida Sheripboyeva Bonu munosib ishtirok etib, Kumush medalni qo‘lga kiritdi.",
      level: "Xalqaro Olimpiada",
      badge: "Kumush Medal 🥈",
      imageUrl: "/images/achievements/beruniy-kimyo-kumush-24179.jpg",
      telegramUrl: "https://t.me/Urganch_IMI/24179",
    },
    {
      id: "tg-23653",
      year: "2026",
      title: "II Ahmad Al-Farg'oniy Nomidagi Xalqaro Fizika Olimpiadasida Bronza Medal",
      student: "Yusupov Davlatbek",
      teacher: "Fizika kafedrasi",
      desc: "Samarqand shahrida bo‘lib o‘tgan II Ahmad al-Farg‘oniy nomidagi Xalqaro Fizika Olimpiadasida Yusupov Davlatbek munosib ishtirok etib, bronza medalini qo‘lga kiritdi.",
      level: "Xalqaro Olimpiada",
      badge: "Bronza Medal 🥉",
      imageUrl: "/images/achievements/fargoniy-fizika-bronza-23653.jpg",
      telegramUrl: "https://t.me/Urganch_IMI/23653",
    },
    {
      id: "feat-tunis",
      year: "2026",
      title: "Tunis Xalqaro Kiberxavfsizlik Olimpiadasi Tarixiy Kumush Medali",
      student: "O'zbekiston terma jamoasi tarkibida",
      teacher: "Informatika kafedrasi",
      desc: "Urganch 1-IMI o'quvchisi Tunisda bo'lib o'tgan nufuzli Xalqaro Kiberxavfsizlik Olimpiadasida O'zbekiston terma jamoasi tarkibida kumush medal sohibi bo'ldi.",
      level: "Xalqaro (Dunyo miqyosida)",
      badge: "Kumush Medal 🥈",
      imageUrl: null,
      telegramUrl: "https://t.me/Urganch_IMI",
    },
    {
      id: "feat-dtm",
      year: "2025-26",
      title: "DTM Testlarida 170.9 Ballik Mutloq Rekord",
      student: "Katta sinf bitiruvchilari",
      teacher: "Pedagogik jamoa",
      desc: "Xorazm viloyatidagi barcha umumta'lim va ixtisoslashtirilgan maktablar o'rtasida eng yuqori o'rtacha ball (maksimal 189 balldan).",
      level: "Respublika (1-o'rin)",
      badge: "170.9 DTM 🏆",
      imageUrl: null,
      telegramUrl: null,
    },
    {
      id: "feat-grants",
      year: "2025",
      title: "Oliy Ta'limga 100% Qabul & $1.69M Grantlar",
      student: "Kollektiv bitiruvchilar",
      teacher: "Xalqaro ta'lim koordinatori",
      desc: "Barcha bitiruvchilar Manchester, Harbin, Michigan va yetakchi davlat universitetlariga to'liq davlat granti va stipendiyalarga qabul qilindi.",
      level: "Xalqaro & Milliy",
      badge: "100% Grant 🎓",
      imageUrl: null,
      telegramUrl: null,
    },
    {
      id: "feat-awards",
      year: "2025-26",
      title: "Al-Xorazmiy va IJSO Fan Olimpiadalari Mukofotlari",
      student: "Olimpiadachilar jamoasi",
      teacher: "Aniq fanlar kafedrasi",
      desc: "Matematika, Fizika va Kimyo fanlaridan 103 nafar o'quvchimiz viloyat va respublika bosqichlarida sovrinli o'rinlarni egallashdi.",
      level: "Respublika & Xalqaro",
      badge: "103 Mukofot ⭐",
      imageUrl: null,
      telegramUrl: null,
    },
  ]

  // Fetch initial slice of certificates from API
  useEffect(() => {
    async function fetchCerts() {
      setLoadingCerts(true)
      try {
        const res = await fetch("/api/certificates?limit=12")
        if (res.ok) {
          const data = await res.json()
          setCertificates(data.data || [])
        }
      } catch (err) {
        console.error("Failed to load certificates:", err)
      } finally {
        setLoadingCerts(false)
      }
    }
    fetchCerts()
  }, [])

  const filteredCerts = certificates.filter((c) => {
    if (selectedSubject !== "all" && c.subject !== selectedSubject) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        c.studentName.toLowerCase().includes(q) ||
        c.teacher.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#F5F7FA] dark:bg-[#0B1726] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/10 text-[#10243A] dark:text-[#C6A15B] text-xs font-bold mb-3 border border-[#C6A15B]/20">
            <Trophy size={14} className="text-[#C6A15B]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172638] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#68778A] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "featured"
                ? "bg-[#10243A] text-white shadow-md dark:bg-[#C6A15B] dark:text-[#10243A]"
                : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#10243A] dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E3650]"
            }`}
          >
            <Sparkles size={14} />
            <span>{t.tabFeatured}</span>
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "certificates"
                ? "bg-[#10243A] text-white shadow-md dark:bg-[#C6A15B] dark:text-[#10243A]"
                : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#10243A] dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E3650]"
            }`}
          >
            <FileCheck size={14} />
            <span>{t.tabArchive}</span>
          </button>
        </div>

        {/* TAB 1: Featured Olympiads & Historic Milestones */}
        {activeTab === "featured" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fade-in">
            {featuredAchievements.map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] rounded-2xl shadow-xs hover:border-[#C6A15B] transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {item.imageUrl ? (
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="text-[11px] font-extrabold text-[#10243A] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-sm border border-[#C6A15B]/30">
                          {item.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xs font-extrabold text-white bg-[#10243A]/85 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="p-6 pb-2">
                    {!item.imageUrl && (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-extrabold text-[#183650] dark:text-sky-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                          {item.year}
                        </span>
                        <span className="text-[11px] font-bold text-[#C6A15B] bg-[#C6A15B]/10 px-2.5 py-0.5 rounded-full border border-[#C6A15B]/20">
                          {item.badge}
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold text-[#172638] dark:text-white text-base mb-2 leading-snug">
                      {item.title}
                    </h3>

                    {item.student && (
                      <div className="mb-2">
                        <div className="text-[11px] font-bold text-[#C6A15B]">
                          🏅 {item.student}
                        </div>
                        {item.teacher && (
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            Ustoz: {item.teacher}
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-[#68778A] dark:text-slate-300 leading-relaxed mb-3">
                      {item.desc}
                    </p>

                    {item.telegramUrl && (
                      <div className="pt-1">
                        <a
                          href={item.telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          <span>Telegramda ko‘rish</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-[#68778A] dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Globe size={12} className="text-[#C6A15B]" />
                    <span>{item.level}</span>
                  </span>
                  <span className="text-[#10243A] dark:text-[#C6A15B] font-bold">1-IMI</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Certificates Archive Preview (from Excel 677 records) */}
        {activeTab === "certificates" && (
          <div className="space-y-6 animate-fade-in mb-12">
            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-white dark:bg-[#10243A] p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#1E3650]">
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B1726] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {["all", "Ingliz tili", "Matematika", "Ona tili va adabiyot (O‘zb)", "Biologiya", "Fizika"].map(
                  (subj) => (
                    <button
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                        selectedSubject === subj
                          ? "bg-[#10243A] text-white dark:bg-[#C6A15B] dark:text-[#10243A] font-bold"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {subj === "all" ? t.allSubjects : subj}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Certificates Table Card */}
            <div className="bg-white dark:bg-[#10243A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3650] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#0B1726] border-b border-[#E2E8F0] dark:border-[#1E3650] text-[#172638] dark:text-slate-200 font-bold">
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4">{t.studentName}</th>
                      <th className="py-3.5 px-4">{t.certType}</th>
                      <th className="py-3.5 px-4">{t.subject}</th>
                      <th className="py-3.5 px-4">{t.level} / {t.score}</th>
                      <th className="py-3.5 px-4">{t.teacher}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {loadingCerts ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          Yuklanmoqda...
                        </td>
                      </tr>
                    ) : filteredCerts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          Sertifikat topilmadi.
                        </td>
                      </tr>
                    ) : (
                      filteredCerts.slice(0, 10).map((cert, i) => (
                        <tr key={cert.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{i + 1}</td>
                          <td className="py-3 px-4 font-bold text-[#10243A] dark:text-white">
                            {cert.studentName}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                            <span className="line-clamp-1">{cert.certType}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#183650] dark:text-blue-300 font-semibold text-[11px]">
                              {cert.subject}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#C6A15B] mr-1.5">{cert.level}</span>
                            {cert.score && <span className="text-slate-500 font-mono">({cert.score})</span>}
                          </td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                            {cert.teacher}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Banner */}
              <div className="p-4 bg-slate-50 dark:bg-[#0B1726] border-t border-[#E2E8F0] dark:border-[#1E3650] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                <span className="text-[#68778A] dark:text-slate-400">
                  {t.erpBadge} — Barcha 674 ta tasdiqlangan o'quvchi ma'lumotlari hisobga olingan.
                </span>
                <Link
                  href="/achievements"
                  className="inline-flex items-center gap-1.5 font-bold text-[#10243A] dark:text-[#C6A15B] hover:underline"
                >
                  <span>{t.viewFullArchive}</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Big CTA Banner linking to full archive */}
        <div className="p-8 rounded-3xl bg-[#10243A] text-white flex flex-col sm:flex-row justify-between items-center gap-6 border border-[#C6A15B]/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#C6A15B] flex-shrink-0 border border-white/10">
              <Sparkles size={28} />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white">
                674 ta Milliy va Xalqaro Sertifikatlar To'liq Arxiv Portali
              </div>
              <div className="text-xs text-slate-300 mt-1">
                23.10 sanali ERP sertifikatlari, IELTS, SAT va barcha fanlar bo'yicha to'liq qidiruv va filtrlash tizimi.
              </div>
            </div>
          </div>
          <Link
            href="/achievements"
            className="px-6 py-3.5 bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] text-xs font-bold rounded-xl transition-all flex items-center gap-2 flex-shrink-0 shadow-md"
          >
            <span>{t.viewFullArchive}</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
