"use client"

import { Calendar, BookMarked, Trophy, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useRef, useState, useEffect } from "react"

export default function ForStudents() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const translations = {
    uz: {
      title: "O'quvchilar Uchun",
      resource1_title: "Dars Jadvali",
      resource1_desc: "Haftalik dars jadvali va akademik taqvim",
      resource2_title: "Fanlar",
      resource2_desc: "Asosiy va ixtisoslashtirilgan fanlar",
      resource3_title: "Tanlov va Olimpiadalar",
      resource3_desc: "Respublika va xalqaro tanlovlar",
      resource4_title: "To'garaklar",
      resource4_desc: "Qo'shimcha ta'lim va ijodiy to'garaklar",
      school_life: "Maktab Hayoti",
      show_more: "Ko'proq ko'rish",
    },
    ru: {
      title: "Для учеников",
      resource1_title: "Расписание занятий",
      resource1_desc: "Еженедельное расписание и академический календарь",
      resource2_title: "Предметы",
      resource2_desc: "Основные и специализированные предметы",
      resource3_title: "Конкурсы и олимпиады",
      resource3_desc: "Республиканские и международные конкурсы",
      resource4_title: "Кружки",
      resource4_desc: "Дополнительное образование и творческие кружки",
      school_life: "Школьная жизнь",
      show_more: "Узнать больше",
    },
    en: {
      title: "For Students",
      resource1_title: "Class Schedule",
      resource1_desc: "Weekly schedule and academic calendar",
      resource2_title: "Subjects",
      resource2_desc: "Basic and specialized subjects",
      resource3_title: "Contests and Olympiads",
      resource3_desc: "Republican and international competitions",
      resource4_title: "Clubs",
      resource4_desc: "Additional education and creative clubs",
      school_life: "School Life",
      show_more: "Learn More",
    },
  }

  const t = translations[language]

  const resources = [
    {
      icon: Calendar,
      title: t.resource1_title,
      description: t.resource1_desc,
    },
    {
      icon: BookMarked,
      title: t.resource2_title,
      description: t.resource2_desc,
    },
    {
      icon: Trophy,
      title: t.resource3_title,
      description: t.resource3_desc,
    },
    {
      icon: Users,
      title: t.resource4_title,
      description: t.resource4_desc,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="students" className="py-20 md:py-32 bg-muted/50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            const slideFrom = index % 2 === 0 ? "-translate-x-12" : "translate-x-12"
            return (
              <div
                key={index}
                className={`bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${slideFrom}`}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-muted-foreground">{resource.description}</p>
              </div>
            )
          })}
        </div>

        <div
          className={`bg-card border border-border rounded-xl p-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">{t.school_life}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <img
              src="/images/photo-2025-10-24-21-21-45.jpg"
              alt="School event"
              className="rounded-lg h-64 object-cover"
            />
            <img src="/images/photo-2025-10-24-21-21-52.jpg" alt="Students" className="rounded-lg h-64 object-cover" />
            <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg h-64 flex items-center justify-center">
              <a
                href="http://t.me/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                {t.show_more}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
