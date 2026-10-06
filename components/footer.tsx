"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Facebook, ExternalLink, ShieldCheck, Lock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  const t = {
    uz: {
      schoolName: "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati",
      agencyAffiliation: "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimida",
      description:
        "Kelajakni bugundan quradigan avlod tarbiyasi. Aniq va tabiiy fanlar chuqurlashtirilgan davlat ta'lim maskani.",
      navTitle: "Asosiy Bo'limlar",
      home: "Bosh sahifa",
      about: "Maktab haqida",
      education: "Ta'lim yo'nalishlari",
      teachers: "O'qituvchilar",
      achievements: "Yutuqlar",
      news: "Yangiliklar",
      gallery: "Galereya",
      resourcesTitle: "Rasmiy Havolalar",
      schoolProfile: "Maktab profili (Dossier)",
      schoolMode: "🏫 Maktab rejimi",
      admissions: "Qabulga topshirish",
      agencyPortal: "Agentlik portali (piima.uz)",
      adminPanel: "Admin panel",
      contactTitle: "Bog'lanish",
      address: "220100, Xorazm viloyati, Urganch shahar, Sheroziy ko'chasi, 2-uy",
      phone: "+998 (62) 223-20-31",
      email: "gmail@urganchimi.uz",
      copyright: `© ${currentYear} Urganch shahar 1-son ixtisoslashtirilgan maktab-internati. Barcha huquqlar himoyalangan.`,
    },
    ru: {
      schoolName: "Урганчская специализированная школа-интернат №1",
      agencyAffiliation: "В системе Агентства специализированных образовательных учреждений Узбекистана",
      description:
        "Поколение, созидающее будущее уже сегодня. Государственное учреждение точных и естественных наук.",
      navTitle: "Основные разделы",
      home: "Главная",
      about: "О школе",
      education: "Образование",
      teachers: "Преподаватели",
      achievements: "Достижения",
      news: "Новости",
      gallery: "Галерея",
      resourcesTitle: "Ресурсы и порталы",
      schoolProfile: "Профиль школы (Dossier)",
      schoolMode: "🏫 Режим школы",
      admissions: "Приёмная комиссия",
      agencyPortal: "Портал Агентства (piima.uz)",
      adminPanel: "Панель администратора",
      contactTitle: "Контакты",
      address: "220100, Хорезмская область, г. Урганч, ул. Шерозий, д. 2",
      phone: "+998 (62) 223-20-31",
      email: "gmail@urganchimi.uz",
      copyright: `© ${currentYear} Урганчская специализированная школа-интернат №1. Все права защищены.`,
    },
    en: {
      schoolName: "Urganch Specialized Boarding School No. 1",
      agencyAffiliation: "Agency for Specialized Educational Institutions of Uzbekistan",
      description:
        "The generation building the future today. Advanced state institution for exact and natural sciences.",
      navTitle: "Navigation",
      home: "Home",
      about: "About School",
      education: "Academics",
      teachers: "Faculty Directory",
      achievements: "Achievements",
      news: "News & Press",
      gallery: "Gallery",
      resourcesTitle: "Resources & Portals",
      schoolProfile: "School Profile (Dossier)",
      schoolMode: "🏫 School Mode",
      admissions: "Admissions",
      agencyPortal: "Agency Portal (piima.uz)",
      adminPanel: "Admin Panel",
      contactTitle: "Contact Enquiries",
      address: "2 Sheroziy Street, Urgench 220100, Khorezm Region, Uzbekistan",
      phone: "+998 (62) 223-20-31",
      email: "gmail@urganchimi.uz",
      copyright: `© ${currentYear} Specialized Boarding School No. 1 in Urgench. All rights reserved.`,
    },
  }[language]

  return (
    <footer className="bg-[#0B1F3A] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A227] bg-white flex-shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="Urganch 1-IMI Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight leading-tight">
                  URGANCH 1-IMI
                </h3>
                <p className="text-[11px] text-[#C9A227] font-medium leading-tight mt-0.5">
                  {t.schoolName}
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t.description}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck size={14} className="text-[#C9A227]" />
              <span className="text-[11px]">{t.agencyAffiliation}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://t.me/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#C9A227] hover:text-[#0B1F3A] flex items-center justify-center transition-colors text-white"
              >
                <Send size={15} />
              </a>
              <a
                href="https://www.instagram.com/urganch_1imi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#C9A227] hover:text-[#0B1F3A] flex items-center justify-center transition-colors text-white"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.youtube.com/@Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#C9A227] hover:text-[#0B1F3A] flex items-center justify-center transition-colors text-white"
              >
                <Youtube size={15} />
              </a>
              <a
                href="https://www.facebook.com/groups/3274842216109794"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#C9A227] hover:text-[#0B1F3A] flex items-center justify-center transition-colors text-white"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">
              {t.navTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/#education" className="hover:text-white transition-colors">
                  {t.education}
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-white transition-colors">
                  {t.teachers}
                </Link>
              </li>
              <li>
                <Link href="/#achievements" className="hover:text-white transition-colors">
                  {t.achievements}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  {t.news}
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-white transition-colors">
                  {t.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Resources & School Mode */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">
              {t.resourcesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/school-profile" className="text-[#C9A227] hover:underline font-semibold">
                  {t.schoolProfile}
                </Link>
              </li>
              <li>
                <a
                  href="https://dish-load-05854082.figma.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-white hover:text-[#C9A227] transition-colors"
                >
                  <span>{t.schoolMode}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white transition-colors">
                  {t.admissions}
                </Link>
              </li>
              <li>
                <a
                  href="https://ariza.piima.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t.agencyPortal}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 text-[11px]"
                >
                  <Lock size={10} />
                  <span>{t.adminPanel}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">
              {t.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{t.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#C9A227] flex-shrink-0" />
                <a href="tel:+998622232031" className="hover:text-white transition-colors font-medium">
                  {t.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#C9A227] flex-shrink-0" />
                <a href="mailto:gmail@urganchimi.uz" className="hover:text-white transition-colors">
                  {t.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Urganch shahar 1-son IMI rasmiy veb-sayti</span>
            <span>·</span>
            <a
              href="https://dish-load-05854082.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A227] hover:underline"
            >
              Maktab rejimi
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
