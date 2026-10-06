"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react"
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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [feedback, setFeedback] = useState("")

  const t = {
    uz: {
      badge: "Bog'lanish",
      title: "Biz Bilan Aloqa",
      subtitle:
        "Savollaringiz yoki takliflaringiz bo'lsa, quyidagi rasmiy aloqa kanallari orqali bizga murojaat qiling.",
      addressTitle: "Rasmiy Manzil",
      addressText: "220100, O'zbekiston Respublikasi, Xorazm viloyati, Urganch shahar, Sheroziy ko'chasi, 2-uy",
      phoneTitle: "Telefon Raqami",
      emailTitle: "Elektron Pochta",
      hoursTitle: "Ish Tartibi",
      hoursText: "Dushanba – Shanba: 08:00 – 17:00\nYakshanba: Dam olish kuni",
      formTitle: "Xabar Yuborish",
      nameLabel: "F.I.Sh.",
      namePlaceholder: "Ism-familiyangiz",
      emailLabel: "Elektron pochta",
      emailPlaceholder: "example@domain.com",
      subjectLabel: "Mavzu",
      subjectPlaceholder: "Murojaat mavzusi",
      messageLabel: "Xabar matni",
      messagePlaceholder: "Xabaringizni batafsil yozing...",
      sendBtn: "Xabarni Yuborish",
      sendingBtn: "Yuborilmoqda...",
      successMsg: "Xabaringiz qabul qilindi. Tez orada javob beramiz!",
      errorMsg: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
    },
    ru: {
      badge: "Контакты",
      title: "Свяжитесь с нами",
      subtitle:
        "Если у вас есть вопросы или предложения, свяжитесь с нами по официальным каналам.",
      addressTitle: "Официальный адрес",
      addressText: "220100, Республика Узбекистан, Хорезмская область, г. Урганч, ул. Шерозий, д. 2",
      phoneTitle: "Телефон",
      emailTitle: "Электронная почта",
      hoursTitle: "Часы работы",
      hoursText: "Понедельник – Суббота: 08:00 – 17:00\nВоскресенье: Выходной",
      formTitle: "Отправить сообщение",
      nameLabel: "Ф.И.О.",
      namePlaceholder: "Ваше полное имя",
      emailLabel: "Электронная почта",
      emailPlaceholder: "example@domain.com",
      subjectLabel: "Тема",
      subjectPlaceholder: "Тема обращения",
      messageLabel: "Текст сообщения",
      messagePlaceholder: "Напишите ваше сообщение...",
      sendBtn: "Отправить сообщение",
      sendingBtn: "Отправка...",
      successMsg: "Ваше сообщение принято. Мы ответим в ближайшее время!",
      errorMsg: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
    },
    en: {
      badge: "Official Contacts",
      title: "Contact Information",
      subtitle:
        "For general inquiries, admissions or partnerships, please reach out through our official institutional channels.",
      addressTitle: "Campus Address",
      addressText: "2 Sheroziy Street, Urgench 220100, Khorezm Region, Republic of Uzbekistan",
      phoneTitle: "Telephone",
      emailTitle: "Email Enquiries",
      hoursTitle: "Working Hours",
      hoursText: "Monday – Saturday: 08:00 – 17:00\nSunday: Closed",
      formTitle: "Direct Inquiries",
      nameLabel: "Full Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "example@domain.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Subject of enquiry",
      messageLabel: "Message",
      messagePlaceholder: "Write your inquiry details...",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successMsg: "Your message was sent successfully. We will respond promptly!",
      errorMsg: "An error occurred. Please try again.",
    },
  }[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")
    setFeedback("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await res.json()

      if (!res.ok || !result.success) {
        setStatus("error")
        setFeedback(result.message || t.errorMsg)
        return
      }

      setStatus("success")
      setFeedback(t.successMsg)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      setStatus("error")
      setFeedback(t.errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white dark:bg-[#0B1F3A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <MessageSquare size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Institutional Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800 shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B1F3A] text-[#C9A227] flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-sm mb-1">{t.addressTitle}</h3>
                <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
                  {t.addressText}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800 shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B1F3A] text-[#C9A227] flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-sm mb-1">{t.phoneTitle}</h3>
                <p className="text-xs text-[#64748B] dark:text-slate-300">
                  <a href="tel:+998622232031" className="hover:text-[#C9A227] transition-colors font-semibold">
                    +998 (62) 223-20-31
                  </a>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800 shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B1F3A] text-[#C9A227] flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-sm mb-1">{t.emailTitle}</h3>
                <p className="text-xs text-[#64748B] dark:text-slate-300">
                  <a href="mailto:gmail@urganchimi.uz" className="hover:text-[#C9A227] transition-colors">
                    gmail@urganchimi.uz
                  </a>
                  {" · "}
                  <a href="mailto:counselor@urganchimi.uz" className="hover:text-[#C9A227] transition-colors">
                    counselor@urganchimi.uz
                  </a>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800 shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B1F3A] text-[#C9A227] flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-sm mb-1">{t.hoursTitle}</h3>
                <p className="text-xs text-[#64748B] dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {t.hoursText}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-[#F7F9FC] dark:bg-[#071324] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6">
              {t.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                    {t.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                    {t.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                  {t.subjectLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.subjectPlaceholder}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                  {t.messageLabel} *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={t.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              {status === "success" && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{feedback}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-xs rounded-lg">
                  {feedback}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0B1F3A] hover:bg-[#123B66] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={14} />
                <span>{isLoading ? t.sendingBtn : t.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Location Map */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-96 shadow-xs">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11944.138448482061!2d60.614431372929936!3d41.54684781582078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfc9a44bf3f7ef%3A0x9e65195a8462452e!2sUrganch%20shahar%201-son%20ixtisoslashtirilgan%20maktab-internat!5e0!3m2!1sru!2sus!4v1762104173425!5m2!1sru!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
