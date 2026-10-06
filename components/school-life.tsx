"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Sparkles } from "lucide-react"

export default function SchoolLife() {
  const { language } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      src: "/images/photo-2025-10-24-21-21-29.jpg",
      alt: "Maktab binosi va hududi",
      caption: "Urganch 1-IMI 3 qavatli zamonaviy o'quv korpusi",
    },
    {
      src: "/images/photo-2025-11-02-18-20-25.jpg",
      alt: "Fizika va Kimyo laboratoriyalari",
      caption: "Zamonaviy jihozlangan fizika va kimyo laboratoriyalari",
    },
    {
      src: "/images/photo-2025-10-24-21-21-45.jpg",
      alt: "Ilmiy anjumanlar va konferensiyalar",
      caption: "Maktabda o'tkaziladigan xalqaro va viloyat ilmiy-amaliy konferensiyalari",
    },
    {
      src: "/images/photo-2025-11-02-18-20-37.jpg",
      alt: "Robototexnika va IT to'garaklari",
      caption: "Robototexnika, sun'iy intellekt va dasturlash amaliyoti",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  const t = {
    uz: {
      badge: "Muhit va Infratuzilma",
      title: "Maktab Hayoti va Muhiti",
      subtitle: "Ilm-fan, ijod va texnologiyalarga yo'g'rilgan akademik muhit.",
    },
    ru: {
      badge: "Среда и инфраструктура",
      title: "Жизнь и атмосфера школы",
      subtitle: "Академическая среда, ориентированная на науку, творчество и технологии.",
    },
    en: {
      badge: "Campus Environment",
      title: "Campus Atmosphere & Facilities",
      subtitle: "An inspiring academic community driven by science, creativity, and discovery.",
    },
  }[language]

  return (
    <section className="py-20 md:py-28 bg-[#F7F9FC] dark:bg-[#071324] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <Sparkles size={14} className="text-[#C9A227]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-[#0B1F3A]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10">
                <div className="max-w-xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A227]">
                    0{index + 1} / 0{images.length}
                  </span>
                  <p className="text-white text-base sm:text-lg font-bold mt-1">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 right-6 sm:right-10 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-[#C9A227] w-8" : "bg-white/40 w-2 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
