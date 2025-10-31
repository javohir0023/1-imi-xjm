"use client"

import { Trophy, Medal, Star, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Achievements() {
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

  const categories = [
    {
      icon: Trophy,
      title: "Sertifikatni Egallar",
      subtitle: "Xalqaro sertifikatlar",
      items: [
        "CEFR (European Framework) - 50+ o'quvchi",
        "IELTS International English Language Testing System",
        "SAT - Amerika Ta'lim Testi",
        "German va French Language Certificates",
      ],
    },
    {
      icon: Medal,
      title: "Tanlov va Olimpiadalar",
      subtitle: "Qo'lga kiritilgan natijalar",
      items: [
        "Viloyat fan olimpiadalarida yuqori o'rinlar",
        "Respublika darajasidagi tanlovlarda ishtirok",
        "Xalqaro STEM tanlovlarida medallari",
        "O'quvchilar ilmiy konferentsiyasida taqdimotlar",
      ],
    },
    {
      icon: Star,
      title: "Madaniy va Sport Yutuqlari",
      subtitle: "Shakhs va jamoa yutuqlari",
      items: [
        "Sportda respublika medalillari",
        "Musiqa va san'at tanlovlarida sertifikatlar",
        "Xalqaro madaniy almashuvlarda ishtirokchilar",
        "Liderlik dasturlarida foydalanuvchilar",
      ],
    },
  ]

  return (
    <section id="achievements" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Erishilgan Yutuqlar</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O'quvchi va o'qituvchilarning sertifikatlar, medal va faxriy yorliqlar
          </p>
        </div>

        {/* Main achievement categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-accent font-bold">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Student achievements table */}
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Xalqaro Sertifikat Egallar (2024-2025)</h3>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">#</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">O'quvchining Ismi</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Sinf</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Sertifikat</th>
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
                className="gap-2 bg-accent hover:bg-accent/90 text-white"
              >
                Ko'proq ko'rish
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-6">
            Jami {allStudents.length} o'quvchi xalqaro sertifikatga ega. CEFR (C1, B2, B1), IELTS, SAT va boshqa xalqaro
            standartlar bo'yicha.
          </p>
        </div>
      </div>
    </section>
  )
}
