"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Youtube, Send, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { language } = useLanguage()

  const translations = {
    uz: {
      title: "Urganch 1-IMI",
      description:
        "Iste'todli o'quvchilarni qo'llab-quvvatlash va ularning ilmiy salohiyatini rivojlantirishning markazi.",
      quickLinks: "Tez Havolalar",
      resources: "Resurslar",
      contact: "Biz Bilan Aloqa",
      about: "Maktab Haqida",
      students: "O'quvchilar Uchun",
      teachers: "O'qituvchilar Uchun",
      admissions: "Qabul",
      calendar: "Akademik Taqvim",
      library: "Kutubxona",
      career: "Karyera Xizmatlari",
      support: "Qo'llab-Quvvatlash",
      address: "Urganch shahar, Xorazm viloyati",
      phone: "+998 (62) 223-20-31",
      copyright: "© 2025 Urganch 1-son Ixtisoslashtirilgan Maktab-Internati. Barcha huquqlar himoyalangan.",
      agency: "Sayt asoschisi Xajiboyev Javoxir va sayt ma'lumotlariga javobgar Siddiqov Saidmuhammad",
    },
    ru: {
      title: "Урганч 1-ИМИ",
      description: "Центр поддержки талантливых учеников и развития их научного потенциала.",
      quickLinks: "Быстрые ссылки",
      resources: "Ресурсы",
      contact: "Свяжитесь с нами",
      about: "О школе",
      students: "Для студентов",
      teachers: "Для учителей",
      admissions: "Приём",
      calendar: "Академический календарь",
      library: "Библиотека",
      career: "Карьерные услуги",
      support: "Поддержка",
      address: "г. Урганч, Хорезмская область",
      phone: "+998 (62) 223-20-31",
      copyright: "© 2025 Урганч 1-я специализированная школа-интернат. Все права защищены.",
      agency: "Основателем сайта является Хаджибоев Джавахир, а ответственным за информацию на сайте является Сиддиков Саидмухаммад.",
    },
    en: {
      title: "Urganch 1st IMI",
      description: "Center for supporting talented students and developing their scientific potential.",
      quickLinks: "Quick Links",
      resources: "Resources",
      contact: "Contact Us",
      about: "About School",
      students: "For Students",
      teachers: "For Teachers",
      admissions: "Admissions",
      calendar: "Academic Calendar",
      library: "Library",
      career: "Career Services",
      support: "Support",
      address: "Urganch city, Khorezm region",
      phone: "+998 (62) 223-20-31",
      copyright: "© 2025 Urganch 1st Specialized School-Boarding School. All rights reserved.",
      agency:
        "The founder of the site is Khajiboyev Javakhir and the responsible for the site information is Siddikov Saidmuhammad.",
    },
  }

  const t = translations[language]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">{t.title}</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">{t.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t.about}
                </Link>
              </li>
              <li>
                <Link
                  href="#students"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t.students}
                </Link>
              </li>
              <li>
                <Link
                  href="#teachers"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t.teachers}
                </Link>
              </li>
              <li>
                <Link
                  href="#admissions"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t.admissions}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.resources}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t.calendar}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t.library}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t.career}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t.support}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.contact}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">{t.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a
                  href="tel:+998622232031"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a
                  href="mailto:info@urganch-imi.uz"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  info@urganch-imi.uz
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/groups/3274842216109794/?hoisted_section_header_type=recently_seen&multi_permalinks=3370179459909402"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.youtube.com/@Urganch_IMI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="http://t.me/Urganch_IMI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="Telegram"
            >
              <Send size={20} />
            </a>
            <a
              href="https://www.instagram.com/urganch_1imi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          <p className="text-sm text-primary-foreground/60">{t.copyright}</p>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p>{t.agency}</p>
        </div>
      </div>
    </footer>
  )
}
