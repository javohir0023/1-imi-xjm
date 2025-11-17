"use client"

import { ArrowRight } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef } from "react"

export default function Hero() {
  const { language } = useLanguage()
  const contentRef = useRef<HTMLDivElement>(null)

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

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const content = {
    uz: {
      title: "Urganch 1-son Ixtisoslashtirilgan Maktab-Internati",
      description:
        "Iste'dodli o'quvchilarni qo'llab-quvvatlash va ularning ilmiy salohiyatini rivojlantirishning markazi.",
      applyBtn: "Ariza topshirish",
      learnBtn: "Ko'proq bilish",
    },
    ru: {
      title: "Урганчская специализированная школа-интернат №1",
      description:
        "Центр качественного образования и профессионального развития в системе Агентства специализированных образовательных учреждений Республики Узбекистан.",
      applyBtn: "Подать заявку",
      learnBtn: "Узнать больше",
    },
    en: {
      title: "Urganch 1st Specialized School-Boarding School",
      description:
        "A center for quality education and professional development within the Specialized Education Institutions Agency system of the Republic of Uzbekistan.",
      applyBtn: "Apply Now",
      learnBtn: "Learn More",
    },
  }

  const currentContent = content[language as keyof typeof content] || content.uz

  return (
    <section className="relative w-full h-screen md:h-[600px] overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maktab-qisqacha_9Ieo6lJr-DNGCSe7qio3U2M5tiUenr1VUyEpV5j.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div ref={contentRef} className="w-full md:w-1/2 space-y-6 text-white opacity-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            {currentContent.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">{currentContent.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="https://ariza.piima.uz/" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto">
                {currentContent.applyBtn} <ArrowRight size={20} />
              </button>
            </a>
            <a href="http://t.me/Urganch_IMI" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all hover:scale-105 w-full sm:w-auto">
                {currentContent.learnBtn}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
