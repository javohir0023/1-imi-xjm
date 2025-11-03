"use client"

import type React from "react"

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export default function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const translations = {
    uz: {
      title: "Biz Bilan Aloqa",
      subtitle: "Savollaringiz bo'lsa, biz bilan bog'laning",
      address: "Manzil",
      addressText: "Urganch shahar, Xorazm viloyati\nO'zbekiston Respublikasi",
      phone: "Telefon",
      email: "Email",
      hours: "Ish Vaqti",
      hoursText: "Dushanba - Shanba: 08:00 - 17:00\nYakshanba: Yopiq",
      sendMessage: "Xabar Yuborish",
      name: "Ism-Familiya",
      namePlaceholder: "Sizning ismingiz",
      emailLabel: "Email",
      emailPlaceholder: "sizning@email.com",
      subject: "Mavzu",
      subjectPlaceholder: "Xabaringizning mavzusi",
      message: "Xabar",
      messagePlaceholder: "Sizning xabaringiz...",
      send: "Yuborish",
      success: "Xabar muvaffaqiyatli yuborildi!",
      error: "Xabar yuborishda xatolik. Iltimos, qayta urinib ko'ring.",
    },
    ru: {
      title: "Свяжитесь с нами",
      subtitle: "Если у вас есть вопросы, свяжитесь с нами",
      address: "Адрес",
      addressText: "г. Урганч, Хорезмская область\nРеспублика Узбекистан",
      phone: "Телефон",
      email: "Электронная почта",
      hours: "Часы работы",
      hoursText: "Пн - Сб: 08:00 - 17:00\nВс: Закрыто",
      sendMessage: "Отправить сообщение",
      name: "Полное имя",
      namePlaceholder: "Ваше имя",
      emailLabel: "Электронная почта",
      emailPlaceholder: "ваша@почта.com",
      subject: "Тема",
      subjectPlaceholder: "Тема вашего сообщения",
      message: "Сообщение",
      messagePlaceholder: "Ваше сообщение...",
      send: "Отправить",
      success: "Сообщение успешно отправлено!",
      error: "Ошибка при отправке. Попробуйте еще раз.",
    },
    en: {
      title: "Contact Us",
      subtitle: "If you have any questions, please contact us",
      address: "Address",
      addressText: "Urganch city, Khorezm region\nRepublic of Uzbekistan",
      phone: "Phone",
      email: "Email",
      hours: "Working Hours",
      hoursText: "Mon - Sat: 08:00 - 17:00\nSun: Closed",
      sendMessage: "Send Message",
      name: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "Subject of your message",
      message: "Message",
      messagePlaceholder: "Your message...",
      send: "Send",
      success: "Message sent successfully!",
      error: "Error sending message. Please try again.",
    },
  }

  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } else {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      }
    } catch (error) {
      console.log("[v0] Error submitting form:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MapPin className="w-6 h-6 text-yellow-500 mt-1" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{t.address}</h3>
                <p className="text-muted-foreground whitespace-pre-line">{t.addressText}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Phone className="w-6 h-6 text-yellow-500 mt-1" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{t.phone}</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+998622232031" className="hover:text-accent transition-colors">
                    +998 (62) 223-20-31
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-yellow-500 mt-1" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{t.email}</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:info@urganch-imi.uz" className="hover:text-accent transition-colors">
                    info@urganch-imi.uz
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-yellow-500 mt-1" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{t.hours}</h3>
                <p className="text-muted-foreground whitespace-pre-line">{t.hoursText}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">{t.sendMessage}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.emailLabel}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.subject}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.subjectPlaceholder}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.message}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                ></textarea>
              </div>
              {submitStatus === "success" && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg">{t.success}</div>
              )}
              {submitStatus === "error" && <div className="p-4 bg-red-100 text-red-800 rounded-lg">{t.error}</div>}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? "Yuborilmoqda..." : t.send}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 rounded-xl overflow-hidden border border-border h-96 bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11944.138448482061!2d60.614431372929936!3d41.54684781582078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfc9a44bf3f7ef%3A0x9e65195a8462452e!2sUrganch%20shahar%201-son%20ixtisoslashtirilgan%20maktab-internat!5e0!3m2!1sru!2sus!4v1762104173425!5m2!1sru!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
