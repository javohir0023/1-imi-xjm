"use client"

import { FileText, CheckCircle, Users, Calendar } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"

export default function Admissions() {
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
      title: "Qabul Jarayoni",
      subtitle: "Maktabga kirish uchun zarur barcha ma'lumot va hujjatlar",
      step1Title: "Hujjatlarni Tayyorlash",
      step1Desc: "Zarur hujjatlarni to'plash va tayyorlash",
      step2Title: "Kirish Imtihonlari",
      step2Desc: "Matematika va ingliz tilidan imtihonlar",
      step3Title: "Natijalar",
      step3Desc: "Imtihon natijalarini ko'rish va qabul qarorini olish",
      step4Title: "Ro'yxatga Olish",
      step4Desc: "Maktabga rasmiy ro'yxatga olish jarayoni",
      onlineTitle: "Onlayn Ariza Topshirish",
      submitButton: "Arizani Topshirish",
    },
    ru: {
      title: "Процесс приёма",
      subtitle: "Вся необходимая информация и документы для поступления в школу",
      step1Title: "Подготовка документов",
      step1Desc: "Сбор и подготовка необходимых документов",
      step2Title: "Вступительные экзамены",
      step2Desc: "Экзамены по математике и английскому языку",
      step3Title: "Результаты",
      step3Desc: "Просмотр результатов экзаменов и получение решения о приёме",
      step4Title: "Регистрация",
      step4Desc: "Процесс официальной регистрации в школе",
      onlineTitle: "Подача онлайн-заявки",
      submitButton: "Подать заявку",
    },
    en: {
      title: "Admissions Process",
      subtitle: "All necessary information and documents for school admission",
      step1Title: "Document Preparation",
      step1Desc: "Collecting and preparing required documents",
      step2Title: "Entrance Exams",
      step2Desc: "Exams in mathematics and English language",
      step3Title: "Results",
      step3Desc: "Viewing exam results and receiving admission decision",
      step4Title: "Registration",
      step4Desc: "Official school registration process",
      onlineTitle: "Online Application Submission",
      submitButton: "Submit Application",
    },
  }

  const t = translations[language]

  const steps = [
    {
      icon: FileText,
      title: t.step1Title,
      description: t.step1Desc,
    },
    {
      icon: Calendar,
      title: t.step2Title,
      description: t.step2Desc,
    },
    {
      icon: CheckCircle,
      title: t.step3Title,
      description: t.step3Desc,
    },
    {
      icon: Users,
      title: t.step4Title,
      description: t.step4Desc,
    },
  ]

  return (
    <section ref={sectionRef} id="admissions" className="py-20 md:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className={`relative transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-accent"></div>
                )}
              </div>
            )
          })}
        </div>

        <div className={`bg-primary text-primary-foreground rounded-xl p-8 md:p-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold mb-6">{t.onlineTitle}</h3>
          <a href="https://ariza.piima.uz" target="_blank" rel="noopener noreferrer" className="inline-block">
            <button className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              {t.submitButton}
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
