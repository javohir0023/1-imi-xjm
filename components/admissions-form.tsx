"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export default function AdmissionsForm() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    info: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const translations = {
    uz: {
      title: "Arizalar",
      subtitle: "Maktabga qabul bo'lish uchun arizani topshiring",
      name: "Ism-Familiya",
      namePlaceholder: "Sizning ismingiz",
      email: "Email",
      emailPlaceholder: "sizning@email.com",
      phone: "Telefon",
      phonePlaceholder: "+998 XX XXX XX XX",
      info: "Qo'shimcha Ma'lumot",
      infoPlaceholder: "Sizning ma'lumotingiz...",
      submit: "Arizani Yuborish",
      success: "✅ Ma'lumot muvaffaqiyatli yuborildi!",
      error: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    },
    ru: {
      title: "Приложения",
      subtitle: "Подайте заявку на поступление в школу",
      name: "Полное имя",
      namePlaceholder: "Ваше имя",
      email: "Электронная почта",
      emailPlaceholder: "ваша@почта.com",
      phone: "Телефон",
      phonePlaceholder: "+998 XX XXX XX XX",
      info: "Дополнительная информация",
      infoPlaceholder: "Ваша информация...",
      submit: "Отправить приложение",
      success: "✅ Информация успешно отправлена!",
      error: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
    },
    en: {
      title: "Admissions",
      subtitle: "Submit your application to join our school",
      name: "Full Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      phone: "Phone",
      phonePlaceholder: "+998 XX XXX XX XX",
      info: "Additional Information",
      infoPlaceholder: "Your information...",
      submit: "Submit Application",
      success: "✅ Information submitted successfully!",
      error: "An error occurred. Please try again.",
    },
  }

  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const googleScriptURL =
        "https://script.google.com/macros/s/AKfycbzQILXPUjbykTWV8x_9eL6Kh_qO8J4a1q1234567/usercopy"

      const params = new URLSearchParams()
      params.append("name", formData.name)
      params.append("email", formData.email)
      params.append("phone", formData.phone)
      params.append("info", formData.info)

      const response = await fetch(googleScriptURL + "?" + params.toString(), {
        method: "GET",
        mode: "no-cors",
      })

      // Success - data was sent to Google Sheets
      setMessage(t.success)
      setFormData({ name: "", email: "", phone: "", info: "" })
      setTimeout(() => setMessage(""), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage(t.error)
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
              <label className="block text-sm font-medium text-foreground mb-2">{t.name}</label>
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.email}</label>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
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
              <label className="block text-sm font-medium text-foreground mb-2">{t.info}</label>
              <textarea
                placeholder={t.infoPlaceholder}
                value={formData.info}
                onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                rows={4}
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
