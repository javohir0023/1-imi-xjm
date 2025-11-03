"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const navItems = [
    { label: "Maktab haqida", href: "#about", uz: "Maktab haqida", ru: "О школе", en: "About" },
    { label: "O'quvchilar", href: "#students", uz: "O'quvchilar uchun", ru: "Для студентов", en: "For Students" },
    { label: "Maktab Xodimlari", href: "#teachers", uz: "Maktab Xodimlari", ru: "Персонал школы", en: "School Staff" },
    { label: "Qabul", href: "#admissions", uz: "Qabul", ru: "Приём", en: "Admissions" },
    { label: "Yutuqlar", href: "#achievements", uz: "Yutuqlar", ru: "Достижения", en: "Achievements" },
    { label: "Aloqa", href: "#contact", uz: "Aloqa", ru: "Контакты", en: "Contact" },
  ]

  const getLabel = (item: any) => {
    if (language === "ru") return item.ru
    if (language === "en") return item.en
    return item.uz
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u8aZwspJpxbFGaxB9aMUmvnEUwPIjH.jpg"
                alt="School Logo"
                width={56}
                height={56}
                className="rounded-full object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">Urganch 1-IMI</h1>
              <p className="text-xs text-muted-foreground">
                {language === "ru"
                  ? "Специализированная школа"
                  : language === "en"
                    ? "Specialized School"
                    : "Ixtisoslashtirilgan maktab"}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {getLabel(item)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2">
              {["uz", "ru", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as "uz" | "ru" | "en")}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === lang ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <a href="https://ariza.piima.uz" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                {language === "ru" ? "Подать заявку" : language === "en" ? "Apply" : "Ariza topshirish"}
              </button>
            </a>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {getLabel(item)}
              </Link>
            ))}
            <div className="px-4 py-2 flex gap-2">
              {["uz", "ru", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as "uz" | "ru" | "en")
                    setIsOpen(false)
                  }}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === lang ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <a href="https://ariza.piima.uz" target="_blank" rel="noopener noreferrer" className="block">
              <button className="w-full mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                {language === "ru" ? "Подать заявку" : language === "en" ? "Apply" : "Ariza topshirish"}
              </button>
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
