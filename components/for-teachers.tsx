"use client"

import { BookOpen, Award, Users, Handshake } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"

export default function ForTeachers() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const translations = {
    uz: {
      title: "Maktab Xodimlari",
      subtitle: "Professional rivojlanish va ta'lim resurslarining to'liq to'plami",
      resource1Title: "O'quv-Metodik Materiallar",
      resource1Desc: "Dars rejalamalari, test va qo'shimcha materiallar",
      resource2Title: "Malaka Oshirish",
      resource2Desc: "Seminarlar, treninglar va sertifikatsiya dasturlari",
      resource3Title: "Pedagoglar Ro'yxati",
      resource3Desc: "Maktab xodimlari va ularning malakasi haqida ma'lumot",
      resource4Title: "Hamkorlik",
      resource4Desc: "Xalqaro hamkorlik va almashuv dasturlari",
      details: "Batafsil",
    },
    ru: {
      title: "Школьный персонал",
      subtitle: "Полный набор ресурсов для профессионального развития и образования",
      resource1Title: "Учебно-методические материалы",
      resource1Desc: "Планы уроков, тесты и дополнительные материалы",
      resource2Title: "Повышение квалификации",
      resource2Desc: "Семинары, тренинги и программы сертификации",
      resource3Title: "Список педагогов",
      resource3Desc: "Информация о сотрудниках школы и их квалификации",
      resource4Title: "Сотрудничество",
      resource4Desc: "Международное сотрудничество и программы обмена",
      details: "Подробнее",
    },
    en: {
      title: "School Staff",
      subtitle: "Complete collection of professional development and educational resources",
      resource1Title: "Educational Materials",
      resource1Desc: "Lesson plans, tests and supplementary materials",
      resource2Title: "Professional Development",
      resource2Desc: "Seminars, trainings and certification programs",
      resource3Title: "Teacher List",
      resource3Desc: "Information about school staff and their qualifications",
      resource4Title: "Collaboration",
      resource4Desc: "International cooperation and exchange programs",
      details: "Details",
    },
  }

  const t = translations[language]

  const resources = [
    {
      icon: BookOpen,
      title: t.resource1Title,
      description: t.resource1Desc,
    },
    {
      icon: Award,
      title: t.resource2Title,
      description: t.resource2Desc,
    },
    {
      icon: Users,
      title: t.resource3Title,
      description: t.resource3Desc,
    },
    {
      icon: Handshake,
      title: t.resource4Title,
      description: t.resource4Desc,
    },
  ]

  return (
    <section ref={sectionRef} id="teachers" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div
                key={index}
                className={`bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <button className="text-accent font-semibold hover:text-accent/80 transition-colors">{t.details} →</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
