"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export default function AdmissionsForm() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "+998",
    grade: "5-sinf",
    region: "Urganch shahar",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const translations = {
    uz: {
      title: "Qabul Arizalari",
      subtitle: "Urganch 1-IMI ga o'quvchi qabul qilish uchun ariza qoldiring",
      studentName: "O'quvchining F.I.Sh.",
      studentNamePlaceholder: "Masalan: Karimov Jasurbek Alisher o'g'li",
      parentName: "Ota-onaning F.I.Sh.",
      parentNamePlaceholder: "Masalan: Karimov Alisher",
      phone: "Telefon Raqami",
      phonePlaceholder: "+998 90 123 45 67",
      grade: "Topshirilayotgan Sinf",
      region: "Yashash Hududi",
      info: "Qo'shimcha Ma'lumot / Izoh",
      infoPlaceholder: "Qiziqishlari, yutuqlari yoki savollaringiz...",
      submit: "Arizani Yuborish",
      success: "✅ Arizangiz muvaffaqiyatli qabul qilindi!",
      error: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    },
    ru: {
      title: "Заявления на приём",
      subtitle: "Подайте заявку на поступление в Урганч 1-ИМИ",
      studentName: "Ф.И.О. ученика",
      studentNamePlaceholder: "Например: Каримов Жасурбек",
      parentName: "Ф.И.О. родителя",
      parentNamePlaceholder: "Например: Каримов Алишер",
      phone: "Телефон",
      phonePlaceholder: "+998 90 123 45 67",
      grade: "Класс",
      region: "Регион проживания",
      info: "Дополнительная информация",
      infoPlaceholder: "Интересы, достижения или вопросы...",
      submit: "Отправить заявку",
      success: "✅ Ваша заявка успешно принята!",
      error: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
    },
    en: {
      title: "Admissions Applications",
      subtitle: "Submit an application for admission to Urgench 1-IMI",
      studentName: "Student Full Name",
      studentNamePlaceholder: "e.g. Jasurbek Karimov",
      parentName: "Parent/Guardian Full Name",
      parentNamePlaceholder: "e.g. Alisher Karimov",
      phone: "Phone Number",
      phonePlaceholder: "+998 90 123 45 67",
      grade: "Applying Grade",
      region: "Region/District",
      info: "Additional Information",
      infoPlaceholder: "Interests, awards or questions...",
      submit: "Submit Application",
      success: "✅ Your application was submitted successfully!",
      error: "An error occurred. Please try again.",
    },
  }

  const t = translations[language]

  const grades = ["5-sinf", "6-sinf", "7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"]
  const regions = [
    "Urganch shahar",
    "Xiva shahar",
    "Xonqa tumani",
    "Shovot tumani",
    "Gurlan tumani",
    "Yangibozor tumani",
    "Bog'ot tumani",
    "Hazorasp tumani",
    "Qo'shko'pir tumani",
    "Tuproqqal'a tumani",
    "Boshqa hudud",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        setMessage(`❌ ${result?.message || t.error}`)
        setTimeout(() => setMessage(""), 5000)
        return
      }

      setMessage(t.success)
      setFormData({
        studentName: "",
        parentName: "",
        phone: "+998",
        grade: "5-sinf",
        region: "Urganch shahar",
        message: "",
      })
      setTimeout(() => setMessage(""), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage(`❌ ${t.error}`)
      setTimeout(() => setMessage(""), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="admissions" className="py-20 md:py-32 bg-muted/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.studentName}</label>
              <input
                type="text"
                placeholder={t.studentNamePlaceholder}
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.parentName}</label>
              <input
                type="text"
                placeholder={t.parentNamePlaceholder}
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.phone}</label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.grade}</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.region}</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.info}</label>
              <textarea
                placeholder={t.infoPlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "..." : t.submit}
            </button>
            {message && (
              <div
                className={`text-center p-3 rounded-lg ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
