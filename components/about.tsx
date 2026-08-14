"use client"

import { BookOpen, Users, Award, Building2, Play } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect, useRef } from "react"

export default function About() {
  const { language } = useLanguage()
  const [showVideo, setShowVideo] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const translations = {
    uz: {
      title: "Maktab Haqida",
      subtitle: "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati - ta'lim va innovatsiyaning markazi",
      goal_title: "Maktabning Maqsadi",
      goal_text:
        "Iste'dodli o'quvchilarni qo'llab-quvvatlash, ularning ilmiy salohiyati va ijodiy fikrlash qobiliyatini rivojlantirishdir.",
      directions_title: "Faoliyat Yo'nalishlari",
      feature1_title: "Yuqori Sifatli Ta'lim",
      feature1_desc: "Zamonaviy o'quv dasturlari va xalqaro standartlarga mos ta'lim",
      feature2_title: "Tajribali O'qituvchilar",
      feature2_desc: "Malaka oshirilgan va sertifikatlangan pedagoglar jamoasi",
      feature3_title: "Yutuqlar va Tan Olish",
      feature3_desc: "Respublika va xalqaro darajadagi ko'plab yutuqlar",
      feature4_title: "Zamonaviy Infratuzilma",
      feature4_desc: "Laboratoriyalar, kutubxona va sport zallari bilan jihozlangan",
      direction1: "Zamonaviy ta'lim usullari asosida darslar o'tkazish",
      direction2: "Tanqidiy fikrlash va innovatsion yondashuvga e'tibor",
      direction3: "Ilmiy izlanishlar va fan olimpiadalarida yuqori natijalar",
      direction4: "Liderlik va ijtimoiy mas'uliyat fazilatlarini shakllantirizish",
    },
    ru: {
      title: "О школе",
      subtitle:
        "Ургенчская специализированная школа-интернат №1 - центр образования и инноваций",
      goal_title: "Цель школы",
      goal_text:
        "Поддержка талантливых учащихся, развитие их научного потенциала и творческого мышления.",
      directions_title: "Направления деятельности",
      feature1_title: "Качественное образование",
      feature1_desc: "Современные учебные программы и образование в соответствии с международными стандартами",
      feature2_title: "Опытные преподаватели",
      feature2_desc: "Команда педагогов с повышенной квалификацией и сертификацией",
      feature3_title: "Достижения и признание",
      feature3_desc: "Многочисленные достижения на республиканском и международном уровнях",
      feature4_title: "Современная инфраструктура",
      feature4_desc: "Оснащена лабораториями, библиотекой и спортивными залами",
      direction1: "Проведение занятий на основе современных методов обучения",
      direction2: "Акцент на критическое мышление и инновационный подход",
      direction3: "Высокие результаты в научных исследованиях и олимпиадах",
      direction4: "Формирование лидерских качеств и социальной ответственности",
    },
    en: {
      title: "About School",
      subtitle: "Urgench Specialized Boarding School No. 1 - Center of Education and Innovation",
      goal_title: "School Goal",
      goal_text: "Supporting talented students, developing their scientific potential and creative thinking abilities.",
      directions_title: "Activity Directions",
      feature1_title: "High Quality Education",
      feature1_desc: "Modern curricula and education in accordance with international standards",
      feature2_title: "Experienced Teachers",
      feature2_desc: "Team of qualified and certified educators",
      feature3_title: "Achievements and Recognition",
      feature3_desc: "Numerous achievements at republican and international levels",
      feature4_title: "Modern Infrastructure",
      feature4_desc: "Equipped with laboratories, library and sports halls",
      direction1: "Conducting classes based on modern teaching methods",
      direction2: "Focus on critical thinking and innovative approach",
      direction3: "High results in scientific research and olympiads",
      direction4: "Formation of leadership and social responsibility",
    },
  }

  const t = translations[language]

  const features = [
    {
      icon: BookOpen,
      title: t.feature1_title,
      description: t.feature1_desc,
    },
    {
      icon: Users,
      title: t.feature2_title,
      description: t.feature2_desc,
    },
    {
      icon: Award,
      title: t.feature3_title,
      description: t.feature3_desc,
    },
    {
      icon: Building2,
      title: t.feature4_title,
      description: t.feature4_desc,
    },
  ]

  const directions = [t.direction1, t.direction2, t.direction3, t.direction4]

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className={`grid md:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative group cursor-pointer" onClick={() => setShowVideo(true)}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-29-h2U1pgR6zMJjmTdXIvsdMmFcXXSFT7.jpg"
              alt="School building"
              className="rounded-2xl shadow-lg w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl scale-150 group-hover:scale-175 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <div className="bg-blue-500 rounded-full p-4">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{t.goal_title}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.goal_text}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{t.directions_title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {directions.map((direction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-yellow-500 font-bold">•</span>
                    <span>{direction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {showVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/EIamxkwZcuU?autoplay=1"
              title="School Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
