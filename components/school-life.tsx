"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

export default function SchoolLife() {
  const { language } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-09-15_09-52-26-qV6HM4UJGrVnlM9QXIEOKXi16R6nJ1.jpg",
      alt: "O'qituvchi va o'quvchilar",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-11-02_20-44-50-xWByt78bgv0ntJBaGfReh6W8uKqUHP.jpg",
      alt: "Fizika sinfi",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-09-15_10-38-38-uYyopi3IDjV4j6zKBBQAgXDkC0Tp53.jpg",
      alt: "Laboratoriya",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-09-15_09-52-35-WyETtLC6TknfBC7haZMVKyyldorD09.jpg",
      alt: "Matematika sinfi",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  const translations = {
    uz: {
      title: "Maktab Hayoti",
      subtitle: "O'quvchilar va o'qituvchilarning faol hayoti",
    },
    ru: {
      title: "Школьная жизнь",
      subtitle: "Активная жизнь учеников и учителей",
    },
    en: {
      title: "School Life",
      subtitle: "Active life of students and teachers",
    },
  }

  const t = translations[language]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden bg-muted">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 transition-all ${index === currentImageIndex ? "bg-white w-8" : "bg-white/50 w-2"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
