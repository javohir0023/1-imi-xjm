"use client"

import { Calendar, ArrowRight } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef } from "react"

export default function News() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll("article")
      cards.forEach((card, index) => {
        card.classList.add(`animate-delay-${Math.min((index + 1) * 100, 600)}`)
        observer.observe(card)
      })
    }

    return () => observer.disconnect()
  }, [])

  const translations = {
    uz: {
      title: "So'nggi Yangiliklar",
      subtitle: "Urganch 1-IMI da sodir bo'layotgan voqealar haqida o'zingizni xabardor qiling",
      read_more: "Batafsil",
      category_partnership: "Hamkorlik",
      category_school: "Maktab",
      category_career: "Kasbiy",
    },
    ru: {
      title: "Последние новости",
      subtitle: "Будьте в курсе событий, происходящих в Ургенч 1-ИМИ",
      read_more: "Подробнее",
      category_partnership: "Партнерство",
      category_school: "Школа",
      category_career: "Карьера",
    },
    en: {
      title: "Latest News",
      subtitle: "Stay informed about events at Urgench 1-IMI",
      read_more: "Read More",
      category_partnership: "Partnership",
      category_school: "School",
      category_career: "Career",
    },
  }

  const t = translations[language]

  const newsItems = [
    {
      date: language === "ru" ? "22 октября 2025 г." : language === "en" ? "October 22, 2025" : "2025-yil 22-oktabr",
      title:
        language === "ru"
          ? "Партнерство с Агентством по оценке знаний и навыков"
          : language === "en"
          ? "Partnership with Knowledge and Skills Assessment Agency"
          : "Bilim va Malakalarni Baholash Agentligi bilan Hamkorlik",
      excerpt:
        language === "ru"
          ? "Подписан меморандум о сотрудничестве между Хорезмским филиалом и специализированными школами"
          : language === "en"
          ? "Memorandum of cooperation signed between Khorezm branch and specialized schools"
          : "Xorazm viloyati filiali bilan ixtisoslashtirilgan maktablar oʻrtasida o'zaro hamkorlik memorandumi imzolandi",
      category: t.category_partnership,
      link: "https://t.me/Urganch_IMI/16964",
    },
    {
      date: language === "ru" ? "17 марта 2025 г." : language === "en" ? "March 17, 2025" : "2025-yil 17-mart",
      title:
        language === "ru"
          ? "Меморандум с Ташкентским фармацевтическим техническим университетом"
          : language === "en"
          ? "Memorandum with Tashkent Pharmaceutical Technical University"
          : "Toshkent Farmatseftika Texnik Universiteti bilan Memorandum",
      excerpt:
        language === "ru"
          ? "Подписано сотрудничество между Ургенчской специализированной школой-интернатом №1 и университетом"
          : language === "en"
          ? "Cooperation signed between Urgench Specialized Boarding School No. 1 and the university"
          : "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati va universiteit oʻrtasida hamkorlik imzolandi",
      category: t.category_partnership,
      link: "https://t.me/Urganch_IMI/12780",
    },
    {
      date: language === "ru" ? "17 октября 2025 г." : language === "en" ? "October 17, 2025" : "2025-yil 17-oktabr",
      title:
        language === "ru"
          ? "Экскурсия на UZTEX GROUP"
          : language === "en"
          ? "Excursion to UZTEX GROUP"
          : "UZTEX GROUP Korxonasiga Ekskursiya",
      excerpt:
        language === "ru"
          ? "Ученики 10-02 класса под руководством школьного консультанта посетили филиал UZTEX GROUP с ознакомительной экскурсией"
          : language === "en"
          ? "10-02 grade students under the guidance of school counselor visited UZTEX GROUP branch with an introductory excursion"
          : "10-02-sinf o'quvchilari maktab maslahatchisi boshchiligida UZTEX GROUP filialiga tanishtiruv ekskursiyasiga tashrif buyurdilar",
      category: t.category_school,
      link: "https://t.me/Urganch_IMI/16878",
    },
    {
      date: language === "ru" ? "31 января 2025 г." : language === "en" ? "January 31, 2025" : "2025-yil 31-yanvar",
      title:
        language === "ru"
          ? "Посещение производства UzXCMG"
          : language === "en"
          ? "Visit to UzXCMG Production"
          : "UzXCMG Ishlab Chiqarish Korxonasiga Tashrif",
      excerpt:
        language === "ru"
          ? "Ученики Ургенчской специализированной школы-интерната №1 посетили совместное предприятие по производству экскаваторов и бульдозеров"
          : language === "en"
          ? "Students of Urgench Specialized Boarding School No. 1 visited a joint venture for the production of excavators and bulldozers"
          : "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati o'quvchilari ekskavatorlar va buldozerlar ishlab chiqarish qóshma korxonasiga tashrif buyurdilar",
      category: t.category_school,
      link: "https://t.me/Urganch_IMI/11720",
    },
    {
      date: language === "ru" ? "24 января 2025 г." : language === "en" ? "January 24, 2025" : "2025-yil 24-yanvar",
      title:
        language === "ru"
          ? "Партнерство с DARITAL SHOES LLC"
          : language === "en"
          ? "Partnership with DARITAL SHOES LLC"
          : "DARITAL SHOES MCHJ bilan Hamkorlik",
      excerpt:
        language === "ru"
          ? "Выпускники школы посетили производственное предприятие с целью профориентации, ознакомились с условиями и рабочими процессами"
          : language === "en"
          ? "School graduates visited the production enterprise for career guidance purposes, familiarized themselves with the conditions and work processes"
          : "Maktabning bitiruvchi sinf o'quvchilari kasbga yo'naltirish maqsadida ishlab chiqarish korxonasiga tashrif buyurib, u yerdagi shart-sharoitlar va ish jarayonlari bilan tanishdilar",
      category: t.category_career,
      link: "https://t.me/Urganch_IMI/11599",
    },
    {
      date: language === "ru" ? "24 октября 2025 г." : language === "en" ? "October 24, 2025" : "2025-yil 24-oktabr",
      title:
        language === "ru"
          ? "Объявлено новое международное партнерство"
          : language === "en"
          ? "New International Partnership Announced"
          : "Yangi Xalqaro Hamkorlik Elon Qilindi",
      excerpt:
        language === "ru"
          ? "Ургенч 1-ИМИ установил партнерство с ведущими учреждениями Европы и Азии"
          : language === "en"
          ? "Urgench 1-IMI has established partnerships with leading institutions in Europe and Asia"
          : "Urganch 1-IMI Yevropa va Osiyodagi yetakchi muassasalar bilan hamkorlikni o'rnatdi",
      category: t.category_partnership,
      link: "https://t.me/Urganch_IMI",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="group cursor-pointer opacity-0">
              <div className="p-6 bg-card rounded-xl border border-border hover:border-accent transition-all hover:shadow-lg smooth-hover">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-yellow-500" />
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-black mb-4">{item.excerpt}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold flex items-center gap-2 group-hover:gap-3 transition-all hover:text-gray-700"
                >
                  {t.read_more} <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
