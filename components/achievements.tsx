"use client"

import { Trophy, Medal, Star, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function Achievements() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const allStudents = [
    { name: "Gandjayev Amirxon", class: "8-01", cert: "CEFR C1 (65)" },
    { name: "Otanazarova Mohinur", class: "8-01", cert: "CEFR C1 (66)" },
    { name: "Bazarboyev Mo'minjon", class: "8-01", cert: "CEFR B2 (51)" },
    { name: "Sattarberganova Dilnura", class: "8-01", cert: "CEFR B2 (54)" },
    { name: "Bekturdiyeva Sevinch", class: "8-01", cert: "CEFR B2 (57)" },
    { name: "O'rinboyev Tolib", class: "8-01", cert: "CEFR B2 (53)" },
    { name: "Atajanov Iskandar", class: "8-01", cert: "CEFR B2 (55)" },
    { name: "Utamuratova Mohinur", class: "8-01", cert: "CEFR B2 (60)" },
    { name: "Muhammadyusupboyev Xursandbek", class: "8-01", cert: "CEFR B1 (48)" },
    { name: "Gʻanijonova Sarvinoz", class: "8-01", cert: "CEFR B2 (57)" },
    { name: "Gulmirzayev Fazliddin", class: "8-01", cert: "CEFR B2 (61)" },
    { name: "Arabbayev Boburbek", class: "8-01", cert: "CEFR B2 (51)" },
    { name: "Abdullayeva Ruxsora", class: "8-02", cert: "CEFR B2 (55)" },
    { name: "Erkinova Moxinur", class: "8-02", cert: "CEFR B2 (51)" },
    { name: "Iskandarov Qadamboy", class: "8-02", cert: "CEFR B2 (56)" },
    { name: "Kilichov Amirxon", class: "8-02", cert: "CEFR B2 (60)" },
    { name: "Nuradinov Kamronbek", class: "8-02", cert: "CEFR B2 (52)" },
    { name: "Pulatova Farangiz", class: "8-02", cert: "CEFR C1 (65)" },
    { name: "Saidova Go'Zalxon", class: "8-02", cert: "CEFR C1 (67)" },
    { name: "Ismoilov Alibek", class: "8-03", cert: "CEFR B2 (58)" },
    { name: "Abdusharipova Xadicha", class: "8-03", cert: "CEFR B2 (62)" },
    { name: "Ibodullayeva Shohruza", class: "8-03", cert: "CEFR B1 (45)" },
    { name: "Ro'ziboyeva Shahzoda", class: "8-03", cert: "CEFR B2 (51)" },
    { name: "Ataxanov Fozilbek", class: "8-03", cert: "CEFR B2 (52)" },
    { name: "Qo'chqorov Abdumalik", class: "8-03", cert: "CEFR B2 (60)" },
    { name: "Marimov Bobur", class: "10-02", cert: "IELTS 5.5" },
    { name: "Shakirova Mahliyobanu", class: "9-01", cert: "CEFR B2 (53)" },
    { name: "Komolov Samir", class: "9-01", cert: "CEFR B2 (60)" },
    { name: "Siddiqov Saidmuhammad", class: "9-01", cert: "CEFR B2 (55)" },
    { name: "Babadjanov Firdavs", class: "7-01", cert: "CEFR B1 (49)" },
    { name: "Gʻoyibnazarov Azizbek", class: "9-02", cert: "CEFR B2 (55)" },
    { name: "Ismailova Nodira", class: "9-02", cert: "CEFR C1 (65)" },
    { name: "Karimberganova Muslima", class: "9-03", cert: "CEFR B2 (52)" },
    { name: "Nuraddinova Mashhura", class: "9-03", cert: "CEFR B2 (59)" },
    { name: "Yangiboyeva Zulayho", class: "7-01", cert: "CEFR B2 (63)" },
    { name: "Yakubbayev Jahongir", class: "10-01", cert: "CEFR B2 (54)" },
    { name: "Jumaniyazov Jahongir", class: "10-01", cert: "CEFR B2 (60)" },
    { name: "Ismoilova Farangiz", class: "7-02", cert: "CEFR B2 (57)" },
    { name: "Marimov Bobur", class: "10-02", cert: "CEFR B2 (53)" },
    { name: "Fayzullayev Behruz", class: "10-02", cert: "IELTS B2 (57)" },
    { name: "Abdusharipov Aslbek", class: "10-02", cert: "CEFR B1 (42)" },
    { name: "Yuldasheva Dinara", class: "7-02", cert: "CEFR B2 (60)" },
    { name: "Erkinboyeva Marjona", class: "7-02", cert: "CEFR B2 (58)" },
    { name: "To'xtaboyev Firdavs", class: "10-02", cert: "CEFR B2 (62)" },
    { name: "Jumaboyeva Zubayda", class: "10-02", cert: "CEFR B2 (55)" },
    { name: "Erkinov Behruzbek", class: "7-02", cert: "CEFR C1 (65)" },
    { name: "O'ktamov Amirbek", class: "11-01", cert: "CEFR B2 (6,5)" },
    { name: "Bobodjanova Umida", class: "11-01", cert: "IELTS 7.0 (C1)" },
    { name: "Xusainov Rishod", class: "7-02", cert: "IELTS B2 (62)" },
    { name: "Abdullayeva Nafisa", class: "11-01", cert: "IELTS B2 (6,5)" },
    { name: "Alimboyev Alimbek", class: "11-01", cert: "IELTS B2 (6)" },
    { name: "Allanazarova Madina", class: "11-01", cert: "IELTS B2 (6,5)" },
    { name: "Urinboyev Jasurbek", class: "11-01", cert: "IELTS B2 (54)" },
    { name: "Ahmadov Adhambek", class: "11-01", cert: "IELTS B2 (51)" },
    { name: "Karimbrganov Mustafo", class: "11-02", cert: "CEFR B2 (58)" },
    { name: "Po'latov Zayniddin", class: "11-02", cert: "CEFR C1 (7,5)" },
    { name: "Odamboyev Jahongir", class: "11-02", cert: "CEFR B2 (6,5)" },
    { name: "Belinay Burun", class: "11-02", cert: "IELTS B2 (62)" },
    { name: "Xamrayeva Sevinch", class: "11-02", cert: "IELTS B2 (62)" },
    { name: "Yusupova Gulshoda", class: "11-02", cert: "CEFR B2 (54)" },
    { name: "Rajabova Gulruh", class: "11-02", cert: "CEFR B2 (51)" },
    { name: "Qo'shnazarova Oybibi", class: "11-02", cert: "CEFR B2 (54)" },
    { name: "Bazarbayeva Zebuzar", class: "11-02", cert: "CEFR B2 (63)" },
    { name: "Ramanberdiyeva Zilola", class: "11-02", cert: "CEFR B2 (60)" },
    { name: "Allayorov Azamat", class: "11-02", cert: "CEFR 6.5" },
    { name: "Xo'janazarov Fazliddin", class: "6-02", cert: "IELTS B2 (60)" },
    { name: "Feruzov Sharif", class: "7-02", cert: "IELTS B2 (58)" },
    { name: "To'xtaboyev Firdavs", class: "10-02", cert: "IELTS 7.0" },
    { name: "Hayitboyeva Sohiba", class: "10-01", cert: "IELTS 7.0" },
    { name: "Abdullayev Nurmuhammad", class: "11-02", cert: "IELTS B2 (6.0)" },
    { name: "Xasanov Xayrulla", class: "10-02", cert: "CEFR B2 (64)" },
    { name: "Ataboyev Shahzod", class: "11-01", cert: "IELTS 5.5" },
    { name: "Jumaniyazova Sevara", class: "11-01", cert: "CEFR B2" },
    { name: "Komiljonova Dilnura", class: "11-01", cert: "CEFR B2" },
    { name: "Matyoqubov Doniyor", class: "11-01", cert: "IELTS 7.5 (C1)" },
    { name: "Qutlimuratov Ma'rufjon", class: "7-01", cert: "CEFR B1" },
    { name: "Karimberganov Mustafo", class: "11-02", cert: "IELTS 6.0" },
    { name: "Olloberganov Akmalbek", class: "11-02", cert: "IELTS B2 (6,5)" },
    { name: "Yusupov Boboxon", class: "11-02", cert: "IELTS 7.5" },
    { name: "Abdrimov Bunyodbek", class: "11-01", cert: "CEFR B2" },
    { name: "Jongirov Shohjahon", class: "11-01", cert: "CEFR B2" },
    { name: "Baxtiyorova Indira", class: "10-02", cert: "CEFR B2" },
    { name: "Narimonova Asaloy", class: "10-02", cert: "CEFR B2" },
    { name: "Xudoyberganova Munira", class: "10-02", cert: "CEFR B2" },
    { name: "Nazarova Diana", class: "10-03", cert: "CEFR B2" },
    { name: "Xudayberganova Ma'mura", class: "9-01", cert: "CEFR" },
    { name: "Sa'dullayeva Mexriniso", class: "", cert: "Xalqaro sertifikat" },
  ]

  const [visibleCount, setVisibleCount] = useState(18)
  const displayedStudents = allStudents.slice(0, visibleCount)
  const hasMore = visibleCount < allStudents.length

  const translations = {
    uz: {
      title: "Erishilgan Yutuqlar",
      subtitle: "O'quvchi va o'qituvchilarning sertifikatlar, medal va faxriy yorliqlar",
      cert_title: "Sertifikatni Egallar",
      cert_subtitle: "Xalqaro sertifikatlar",
      contests_title: "Tanlov va Olimpiadalar",
      contests_subtitle: "Qo'lga kiritilgan natijalar",
      cultural_title: "Madaniy va Sport Yutuqlari",
      cultural_subtitle: "Shakhs va jamoa yutuqlari",
      table_title: "Xalqaro Sertifikat Egallar (2024-2025)",
      export: "Export",
      name_column: "O'quvchining Ismi",
      class_column: "Sinf",
      cert_column: "Sertifikat",
      show_more: "Ko'proq ko'rish",
      total_text: (count: number) =>
        `Jami ${count} o'quvchi xalqaro sertifikatga ega. CEFR (C1, B2, B1), IELTS, SAT va boshqa xalqaro standartlar bo'yicha.`,
    },
    ru: {
      title: "Достижения",
      subtitle: "Сертификаты, медали и награды учеников и учителей",
      cert_title: "Обладатели сертификатов",
      cert_subtitle: "Международные сертификаты",
      contests_title: "Конкурсы и Олимпиады",
      contests_subtitle: "Достигнутые результаты",
      cultural_title: "Культурные и спортивные достижения",
      cultural_subtitle: "Личные и командные достижения",
      table_title: "Обладатели международных сертификатов (2024-2025)",
      export: "Экспорт",
      name_column: "Имя ученика",
      class_column: "Класс",
      cert_column: "Сертификат",
      show_more: "Показать больше",
      total_text: (count: number) =>
        `Всего ${count} учеников имеют международные сертификаты. По стандартам CEFR (C1, B2, B1), IELTS, SAT и другим международным стандартам.`,
    },
    en: {
      title: "Achievements",
      subtitle: "Certificates, medals and awards of students and teachers",
      cert_title: "Certificate Holders",
      cert_subtitle: "International certificates",
      contests_title: "Contests and Olympiads",
      contests_subtitle: "Achieved results",
      cultural_title: "Cultural and Sports Achievements",
      cultural_subtitle: "Individual and team achievements",
      table_title: "International Certificate Holders (2024-2025)",
      export: "Export",
      name_column: "Student Name",
      class_column: "Class",
      cert_column: "Certificate",
      show_more: "Show More",
      total_text: (count: number) =>
        `Total ${count} students have international certificates. According to CEFR (C1, B2, B1), IELTS, SAT and other international standards.`,
    },
  }

  const t = translations[language]

  const categories = [
    {
      icon: Trophy,
      title: t.cert_title,
      subtitle: t.cert_subtitle,
      items:
        language === "ru"
          ? [
              "CEFR (European Framework) - 50+ учеников",
              "IELTS International English Language Testing System",
              "SAT - Американский образовательный тест",
              "Немецкий и французский языковые сертификаты",
            ]
          : language === "en"
            ? [
                "CEFR (European Framework) - 50+ students",
                "IELTS International English Language Testing System",
                "SAT - American Educational Test",
                "German and French Language Certificates",
              ]
            : [
                "CEFR (European Framework) - 50+ o'quvchi",
                "IELTS International English Language Testing System",
                "SAT - Amerika Ta'lim Testi",
                "German va French Language Certificates",
              ],
    },
    {
      icon: Medal,
      title: t.contests_title,
      subtitle: t.contests_subtitle,
      items:
        language === "ru"
          ? [
              "Высокие места на областных олимпиадах",
              "Участие в республиканских конкурсах",
              "Медали на международных STEM конкурсах",
              "Презентации на научных конференциях",
            ]
          : language === "en"
            ? [
                "High places at regional olympiads",
                "Participation in republican competitions",
                "Medals at international STEM competitions",
                "Presentations at student conferences",
              ]
            : [
                "Viloyat fan olimpiadalarida yuqori o'rinlar",
                "Respublika darajasidagi tanlovlarda ishtirok",
                "Xalqaro STEM tanlovlarida medallari",
                "O'quvchilar ilmiy konferentsiyasida taqdimotlar",
              ],
    },
    {
      icon: Star,
      title: t.cultural_title,
      subtitle: t.cultural_subtitle,
      items:
        language === "ru"
          ? [
              "Республиканские медали в спорте",
              "Сертификаты на конкурсах музыки и искусства",
              "Участники международных культурных обменов",
              "Участники программ лидерства",
            ]
          : language === "en"
            ? [
                "Republican medals in sports",
                "Certificates in music and art competitions",
                "Participants in international cultural exchanges",
                "Participants in leadership programs",
              ]
            : [
                "Sportda respublika medalillari",
                "Musiqa va san'at tanlovlarida sertifikatlar",
                "Xalqaro madaniy almashuvlarda ishtirokchilar",
                "Liderlik dasturlarida foydalanuvchilar",
              ],
    },
  ]

  const achievementImages = [
    "/images/photo-2025-11-02-18-20-01.jpg",
    "/images/photo-2025-11-02-18-20-45.jpg",
    "/images/photo-2025-11-02-18-20-25.jpg",
    "/images/photo-2025-11-02-18-20-10.jpg",
    "/images/photo-2025-11-02-18-20-18.jpg",
    "/images/photo-2025-11-02-18-20-37.jpg",
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % achievementImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [achievementImages.length])

  return (
    <section id="achievements" className="py-20 md:py-32 bg-background" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div
          className={`mb-16 rounded-xl overflow-hidden border border-border bg-muted transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
        >
          <div className="relative w-full h-96 md:h-[500px]">
            <Image
              src={achievementImages[currentImageIndex] || "/placeholder.svg"}
              alt={`Achievement ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-center gap-2 py-4 bg-card">
            {achievementImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentImageIndex ? "bg-yellow-500 w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className={`bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-yellow-500" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-yellow-500 font-bold">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div
          className={`bg-card border border-border rounded-xl p-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">{t.table_title}</h3>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              {t.export}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">#</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">{t.name_column}</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">{t.class_column}</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">{t.cert_column}</th>
                </tr>
              </thead>
              <tbody>
                {displayedStudents.map((student, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                    <td className="py-3 px-4 text-foreground">{student.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{student.class}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-accent/10 text-black px-3 py-1 rounded-full text-xs font-semibold">
                        {student.cert}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setVisibleCount(visibleCount + 18)}
                className="gap-2 bg-accent hover:bg-accent/90 text-black font-semibold"
              >
                {t.show_more}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-6">{t.total_text(allStudents.length)}</p>
        </div>
      </div>
    </section>
  )
}
