"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ExternalLink, Moon, Sun } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const navItems = [
    { href: "/", uz: "Bosh sahifa", ru: "Главная", en: "Home" },
    { href: "/#about", uz: "Maktab", ru: "О школе", en: "School" },
    { href: "/#education", uz: "Ta'lim", ru: "Образование", en: "Academics" },
    { href: "/#students", uz: "O'quvchilar", ru: "Ученики", en: "Students" },
    { href: "/teachers", uz: "O'qituvchilar", ru: "Учителя", en: "Faculty" },
    { href: "/#achievements", uz: "Yutuqlar", ru: "Достижения", en: "Achievements" },
    { href: "/news", uz: "Yangiliklar", ru: "Новости", en: "News" },
    { href: "/#gallery", uz: "Galereya", ru: "Галерея", en: "Gallery" },
    { href: "/school-profile", uz: "Maktab profili", ru: "Профиль школы", en: "School Profile" },
    { href: "/admissions", uz: "Qabul", ru: "Приём", en: "Admissions" },
    { href: "/#contact", uz: "Aloqa", ru: "Контакты", en: "Contact" },
  ]

  const getLabel = (item: (typeof navItems)[0]) => {
    if (language === "ru") return item.ru
    if (language === "en") return item.en
    return item.uz
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E3A5F] transition-colors shadow-xs">
      {/* Top micro-bar with official affiliation & School Mode direct link */}
      <div className="bg-[#0B1F3A] text-white text-xs py-1 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C9A227]"></span>
            <span>Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimidagi 1-son ixtisoslashtirilgan maktab-internati</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C9A227] hover:text-white font-medium transition-colors"
            >
              <span>🏫 Maktab rejimi</span>
              <ExternalLink size={12} />
            </a>
            <span className="text-slate-500">|</span>
            <a href="tel:+998622232031" className="hover:text-white transition-colors text-slate-300">
              +998 (62) 223-20-31
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & School Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A227] shadow-xs flex-shrink-0 bg-white">
              <Image
                src="/images/logo.jpg"
                alt="Urganch 1-IMI Logo"
                width={48}
                height={48}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#0B1F3A] dark:text-white tracking-tight leading-none group-hover:text-[#123B66] dark:group-hover:text-[#C9A227] transition-colors">
                  URGANCH 1-IMI
                </h1>
              </div>
              <p className="text-[11px] font-medium text-[#64748B] dark:text-slate-400 mt-1 leading-tight">
                {language === "ru"
                  ? "Специализированная школа-интернат №1"
                  : language === "en"
                  ? "Specialized Boarding School No. 1"
                  : "1-son ixtisoslashtirilgan maktab-internati"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-[#111827] dark:text-slate-200 hover:text-[#C9A227] dark:hover:text-[#C9A227] transition-colors py-1 px-1.5"
              >
                {getLabel(item)}
              </Link>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* School Mode Prominent CTA */}
            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#C9A227] bg-[#C9A227]/10 text-[#0B1F3A] dark:text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0B1F3A] transition-all shadow-xs"
              title="O‘quvchi va maktab tizimi"
            >
              <span>🏫 Maktab rejimi</span>
              <ExternalLink size={12} />
            </a>

            {/* Dark mode button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Language Selector */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md border border-slate-200 dark:border-slate-700">
              {(["uz", "ru", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs font-bold rounded transition-all ${
                    language === lang
                      ? "bg-[#0B1F3A] text-white shadow-xs dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Admissions CTA */}
            <Link href="/admissions">
              <button className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#123B66] text-white text-xs font-bold rounded-lg transition-all shadow-xs dark:bg-white dark:text-[#0B1F3A] dark:hover:bg-slate-200">
                {language === "ru" ? "Подать заявку" : language === "en" ? "Admissions" : "Qabulga topshirish"}
              </button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-xs font-bold rounded border border-[#C9A227] text-[#0B1F3A] dark:text-[#C9A227] bg-[#C9A227]/10"
            >
              🏫 Maktab rejimi
            </a>
            <button
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="xl:hidden py-4 border-t border-slate-200 dark:border-slate-800 animate-fade-in space-y-2">
            <div className="grid grid-cols-2 gap-1 pb-3 border-b border-slate-200 dark:border-slate-800">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {getLabel(item)}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center px-2">
              <div className="flex gap-1">
                {(["uz", "ru", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setIsOpen(false)
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded ${
                      language === lang
                        ? "bg-[#0B1F3A] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            <div className="pt-3 space-y-2 px-2">
              <Link href="/admissions" onClick={() => setIsOpen(false)} className="block">
                <button className="w-full py-2.5 bg-[#0B1F3A] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#123B66]">
                  {language === "ru" ? "Подать заявку на поступление" : language === "en" ? "Apply for Admission" : "Qabulga topshirish"}
                </button>
              </Link>
              <a
                href="https://dish-load-05854082.figma.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 bg-[#C9A227]/15 text-[#0B1F3A] dark:text-[#C9A227] border border-[#C9A227] rounded-lg text-xs font-bold"
              >
                🏫 Maktab rejimi — O‘quvchi va maktab tizimi
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
