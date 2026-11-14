"use client"

import { useState } from "react"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramCTA from "@/components/telegram-cta"
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react"

function ContactPageContent() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+998",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const t = {
    uz: {
      badge: "Bog'lanish va Murojaatlar",
      title: "Maktab Ma'muriyati bilan Aloqa",
      subtitle:
        "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati ma'muriyati savollaringiz va takliflaringizni qabul qilishga doim tayyor.",
      addressTitle: "Manzilimiz",
      addressText: "220100, O'zbekiston Respublikasi, Xorazm viloyati, Urganch shahar, Sheroziy ko'chasi, 2-uy",
      phoneTitle: "Telefon raqamimiz",
      phoneText: "+998 (62) 223-20-31",
      emailTitle: "Elektron pochta",
      emailText: "gmail@urganchimi.uz",
      hoursTitle: "Qabul va ish vaqti",
      hoursText: "Dushanba — Shanba: 08:00 - 18:00",
      formTitle: "Onlayn Murojaat Yuborish",
      nameLabel: "Ism va Familiyangiz",
      phoneLabel: "Telefon raqamingiz",
      emailLabel: "Elektron pochta (ixtiyoriy)",
      subjectLabel: "Murojaat mavzusi",
      messageLabel: "Xabaringiz matni",
      submitBtn: "Murojaatni Yuborish",
      submittingBtn: "Yuborilmoqda...",
      successTitle: "Murojaatingiz qabul qilindi!",
      successDesc: "Tez orada maktab mas'ullari siz bilan bog'lanishadi.",
      telegramChat: "Telegram orqali to'g'ridan-to'g'ri bog'lanish: @Urganch_IMI",
    },
    ru: {
      badge: "Контакты и обращения",
      title: "Связь с администрацией школы",
      subtitle:
        "Администрация специализированной школы-интерната №1 г. Ургенча готова ответить на все вопросы.",
      addressTitle: "Наш адрес",
      addressText: "220100, Республика Узбекистан, Хорезмская область, г. Урганч, ул. Шерозий, д. 2",
      phoneTitle: "Контактный телефон",
      phoneText: "+998 (62) 223-20-31",
      emailTitle: "Электронная почта",
      emailText: "gmail@urganchimi.uz",
      hoursTitle: "График работы",
      hoursText: "Понедельник — Суббота: 08:00 - 18:00",
      formTitle: "Отправить обращение онлайн",
      nameLabel: "Ваше имя и фамилия",
      phoneLabel: "Номер телефона",
      emailLabel: "Электронная почта (необязательно)",
      subjectLabel: "Тема обращения",
      messageLabel: "Текст сообщения",
      submitBtn: "Отправить сообщение",
      submittingBtn: "Отправка...",
      successTitle: "Ваше обращение принято!",
      successDesc: "Специалисты свяжутся с вами в ближайшее время.",
      telegramChat: "Связь через Telegram: @Urganch_IMI",
    },
    en: {
      badge: "Official Inquiries",
      title: "Contact Institutional Leadership",
      subtitle:
        "The administrative office of Urganch Specialized Boarding School No. 1 is at your service for questions and consultations.",
      addressTitle: "Campus Address",
      addressText: "2 Sheroziy Street, Urgench 220100, Khorezm Region, Republic of Uzbekistan",
      phoneTitle: "Admissions & General Phone",
      phoneText: "+998 (62) 223-20-31",
      emailTitle: "Official Email",
      emailText: "gmail@urganchimi.uz",
      hoursTitle: "Office Hours",
      hoursText: "Monday — Saturday: 08:00 - 18:00 (UTC+5)",
      formTitle: "Direct Contact Form",
      nameLabel: "Full Name",
      phoneLabel: "Phone Number",
      emailLabel: "Email Address (optional)",
      subjectLabel: "Subject",
      messageLabel: "Your Message",
      submitBtn: "Send Inquiry",
      submittingBtn: "Sending...",
      successTitle: "Inquiry Successfully Logged!",
      successDesc: "Our administrative staff will respond to you shortly.",
      telegramChat: "Direct Telegram channel: @Urganch_IMI",
    },
  }[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")
    try {
      const res = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json()
        setErrorMessage(data.error || "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.")
      }
    } catch (err: any) {
      setErrorMessage("Aloqa uzildi. Iltimos qaytadan urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 min-h-screen">
      <Header />

      <section className="bg-[#10243A] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold border border-white/10">
              <Mail size={14} className="text-[#C6A15B]" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] flex items-center justify-center text-[#C6A15B] flex-shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#10243A] dark:text-white mb-1">
                      {t.addressTitle}
                    </h3>
                    <p className="text-xs text-[#68778A] dark:text-slate-300 leading-relaxed">
                      {t.addressText}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] flex items-center justify-center text-[#C6A15B] flex-shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#10243A] dark:text-white mb-1">
                      {t.phoneTitle}
                    </h3>
                    <a
                      href="tel:+998622232031"
                      className="text-xs text-[#183650] dark:text-sky-400 font-semibold hover:underline"
                    >
                      {t.phoneText}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] flex items-center justify-center text-[#C6A15B] flex-shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#10243A] dark:text-white mb-1">
                      {t.emailTitle}
                    </h3>
                    <a
                      href="mailto:gmail@urganchimi.uz"
                      className="text-xs text-[#183650] dark:text-sky-400 font-semibold hover:underline"
                    >
                      {t.emailText}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] flex items-center justify-center text-[#C6A15B] flex-shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#10243A] dark:text-white mb-1">
                      {t.hoursTitle}
                    </h3>
                    <p className="text-xs text-[#68778A] dark:text-slate-300">
                      {t.hoursText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Telegram Info Box */}
              <div className="p-6 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0088cc] text-white flex items-center justify-center flex-shrink-0">
                  <Send size={18} />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#10243A] dark:text-white">
                    {t.telegramChat}
                  </div>
                  <a
                    href="https://t.me/Urganch_IMI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0088cc] hover:underline font-semibold"
                  >
                    Kanalga o'tish →
                  </a>
                </div>
              </div>
            </div>

            {/* Online Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#10243A] border border-[#E2E8F0] dark:border-[#1E3650] shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#10243A] dark:text-white">
                    {t.formTitle}
                  </h2>
                </div>

                {success ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                    <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                    <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-200">
                      {t.successTitle}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      {t.successDesc}
                    </p>
                    <button
                      onClick={() => {
                        setSuccess(false)
                        setFormData({ name: "", email: "", phone: "+998", subject: "", message: "" })
                      }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                    >
                      Yana xabar yuborish
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#10243A] dark:text-slate-200 mb-1.5">
                          {t.nameLabel} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-[#172638] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#10243A] dark:text-slate-200 mb-1.5">
                          {t.phoneLabel} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-[#172638] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#10243A] dark:text-slate-200 mb-1.5">
                          {t.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-[#172638] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#10243A] dark:text-slate-200 mb-1.5">
                          {t.subjectLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full p-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-[#172638] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#10243A] dark:text-slate-200 mb-1.5">
                        {t.messageLabel} *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 bg-[#F5F7FA] dark:bg-[#0B1726] border border-[#E2E8F0] dark:border-[#1E3650] rounded-xl text-xs text-[#172638] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-[#10243A] hover:bg-[#183650] text-white dark:bg-[#C6A15B] dark:text-[#10243A] font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      <span>{loading ? t.submittingBtn : t.submitBtn}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TelegramCTA />
      <Footer />
    </div>
  )
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactPageContent />
    </LanguageProvider>
  )
}
