"use client"

import { useState } from "react"
import { FileText, Calendar, CheckCircle, Users, Send, ShieldAlert, Check, Phone, User, MapPin, ExternalLink, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Admissions() {
  const { language } = useLanguage()

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "+998",
    grade: "5-sinf",
    region: "Urganch shahar",
    message: "",
    honeypot: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const t = {
    uz: {
      badge: "Qabul — 2026/2027",
      title: "Maktabga Qabul Jarayoni",
      subtitle:
        "5-sinf (matematika va ingliz tili) hamda 7-sinf (biologiya va kimyo) yo'nalishlarida 100% davlat granti asosida o'quvchilar qabul qilinadi.",
      officialBannerTitle: "Rasmiy Davlat Qabul Portali",
      officialBannerDesc:
        "Urganch 1-IMI ga barcha rasmiy arizalar O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligining ariza.piima.uz portali orqali qabul qilinadi. Imtihonlar Bilim va malakalarni baholash agentligi tomonidan o'tkaziladi.",
      officialBannerBtn: "ariza.piima.uz portaliga o'tish",
      step1Title: "Rasmiy ro'yxatdan o'tish",
      step1Desc: "ariza.piima.uz portalida o'quvchi ma'lumotlari va hujjatlarini onlayn taqdim etish.",
      step2Title: "Davlat Imtihonlari",
      step2Desc: "Bilim va malakalarni baholash agentligi (DTM) nazoratida o'tkaziladigan test sinovlari.",
      step3Title: "Natijalar e'lon qilinishi",
      step3Desc: "Reyting natijalari asosida eng yuqori ball to'plagan iqtidorli o'quvchilar saralanadi.",
      step4Title: "100% Davlat Granti",
      step4Desc: "Davlat granti hisobidan to'liq bepul o'qish, bepul yotoqxona va 2 mahal issiq ovqat.",
      formTitle: "Maktab Qabul Komissiyasi Bilan Bog'lanish",
      formSubtitle: "Qabul talablari va jarayoni bo'yicha savollaringiz bo'lsa, konsultatsiya uchun ma'lumot qoldiring.",
      studentNameLabel: "O'quvchining F.I.Sh.",
      studentNamePlaceholder: "Masalan: Karimov Jasurbek Alisher o'g'li",
      parentNameLabel: "Ota-onaning F.I.Sh.",
      parentNamePlaceholder: "Masalan: Karimov Alisher Valijonovich",
      phoneLabel: "Aloqa telefoni",
      gradeLabel: "Topshirayotgan sinf",
      regionLabel: "Yashash hududi",
      messageLabel: "Qo'shimcha izoh yoki savollar (ixtiyoriy)",
      messagePlaceholder: "Qiziqishlari, avvalgi yutuqlari yoki savollaringiz...",
      submitBtn: "Arizani Yuborish",
      submittingBtn: "Yuborilmoqda...",
      successTitle: "Arizangiz muvaffaqiyatli qabul qilindi!",
      successDesc: "Ma'lumotlar maktab qabul tizimiga yozildi va mas'ul adminga yetkazildi. Tez orada siz bilan bog'lanamiz.",
      newAppBtn: "Yangi ariza topshirish",
      officialPortalNotice: "Rasmiy Agentlik portali orqali ariza topshirish:",
    },
    ru: {
      badge: "Прием — 2026/2027",
      title: "Процесс приема в школу",
      subtitle:
        "Прием на основе государственных грантов в 5-й класс (математика и английский) и 7-й класс (биология и химия).",
      officialBannerTitle: "Официальный Государственный Портал Приёма",
      officialBannerDesc:
        "Все официальные заявления на поступление в Урганч 1-ИМИ принимаются через государственный портал Агентства специализированных образовательных учреждений ariza.piima.uz.",
      officialBannerBtn: "Перейти на портал ariza.piima.uz",
      step1Title: "Подача документов",
      step1Desc: "Регистрация через портал ariza.piima.uz с загрузкой необходимых документов.",
      step2Title: "Вступительные экзамены",
      step2Desc: "Экзамены под контролем Агентства по оценке знаний и навыков (DTM).",
      step3Title: "Объявление результатов",
      step3Desc: "Зачисление лучших кандидатов на основе рейтинговых баллов.",
      step4Title: "100% Государственный Грант",
      step4Desc: "Бесплатное обучение за счет государственного гранта, питание и проживание.",
      formTitle: "Консультация с Приёмной Комиссией",
      formSubtitle: "Заполните форму для получения консультации по поступлению, наши специалисты свяжутся с вами.",
      studentNameLabel: "Ф.И.О. ученика",
      studentNamePlaceholder: "Например: Каримов Жасурбек Алишерович",
      parentNameLabel: "Ф.И.О. родителя",
      parentNamePlaceholder: "Например: Каримов Алишер Валижонович",
      phoneLabel: "Контактный телефон",
      gradeLabel: "Класс поступления",
      regionLabel: "Регион проживания",
      messageLabel: "Дополнительные сведения / вопросы",
      messagePlaceholder: "Интересы, предыдущие олимпиады или вопросы...",
      submitBtn: "Отправить запрос",
      submittingBtn: "Отправка...",
      successTitle: "Запрос успешно принят!",
      successDesc: "Данные переданы приемной комиссии школы. Мы свяжемся с вами в ближайшее время.",
      newAppBtn: "Отправить новый запрос",
      officialPortalNotice: "Официальный портал Агентства:",
    },
    en: {
      badge: "Admissions — 2026/2027",
      title: "Admissions Process",
      subtitle:
        "State-funded merit admissions for Grade 5 (Math & English) and Grade 7 (Biology & Chemistry).",
      officialBannerTitle: "Official National Admissions Portal",
      officialBannerDesc:
        "All official applications for Urganch 1-IMI are processed centrally through the Agency for Specialized Educational Institutions portal at ariza.piima.uz.",
      officialBannerBtn: "Open ariza.piima.uz Portal",
      step1Title: "Online Submission",
      step1Desc: "Registration and document submission via ariza.piima.uz.",
      step2Title: "Competitive Exams",
      step2Desc: "Standardized examinations administered by the National Assessment Agency.",
      step3Title: "Merit Rankings",
      step3Desc: "Offers extended to top performers based on official exam scores.",
      step4Title: "100% State Scholarship",
      step4Desc: "Fully state-funded tuition, accommodation, and dining.",
      formTitle: "Admissions Office Consultation",
      formSubtitle: "Leave your contact details to receive preliminary counseling from our admissions staff.",
      studentNameLabel: "Student Full Name",
      studentNamePlaceholder: "e.g. Jasurbek Karimov",
      parentNameLabel: "Parent/Guardian Full Name",
      parentNamePlaceholder: "e.g. Alisher Karimov",
      phoneLabel: "Phone Number",
      gradeLabel: "Applying for Grade",
      regionLabel: "Region/District",
      messageLabel: "Additional Notes or Inquiries",
      messagePlaceholder: "Academic interests, awards or questions...",
      submitBtn: "Submit Inquiry",
      submittingBtn: "Submitting...",
      successTitle: "Inquiry Successfully Received!",
      successDesc: "Your details have been logged and routed to our admissions coordinators.",
      newAppBtn: "Submit Another Inquiry",
      officialPortalNotice: "Official Agency Portal:",
    },
  }[language]

  const steps = [
    { icon: FileText, title: t.step1Title, desc: t.step1Desc },
    { icon: Calendar, title: t.step2Title, desc: t.step2Desc },
    { icon: CheckCircle, title: t.step3Title, desc: t.step3Desc },
    { icon: Users, title: t.step4Title, desc: t.step4Desc },
  ]

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
    setErrorMessage("")

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
        return
      }

      setSuccess(true)
      setFormData({
        studentName: "",
        parentName: "",
        phone: "+998",
        grade: "5-sinf",
        region: "Urganch shahar",
        message: "",
        honeypot: "",
      })
    } catch {
      setErrorMessage("Aloqa xatosi. Internet aloqasini tekshirib, qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="admissions" className="py-20 md:py-28 bg-[#F7F9FC] dark:bg-[#071324] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227] text-xs font-bold mb-3">
            <CheckCircle size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Steps Showcase */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={idx}
                className="academic-card p-6 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/5 dark:bg-white/10 flex items-center justify-center text-[#C9A227]">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-extrabold text-slate-400">0{idx + 1}</span>
                </div>
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
 
        {/* Official Agency Admissions Portal Primary Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#10243A] to-[#183650] text-white border border-[#C6A15B]/30 shadow-lg text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C6A15B] text-xs font-bold">
            <ShieldCheck size={14} />
            <span>{t.officialBannerTitle}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Rasmiy Hujjat Topshirish
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t.officialBannerDesc}
          </p>
          <div className="pt-2">
            <a
              href="https://ariza.piima.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A15B] hover:bg-[#d8b030] text-[#10243A] text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <span>{t.officialBannerBtn}</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Online Application Form Card */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sm:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0B1F3A] dark:text-white mb-2">
              {t.formTitle}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400">
              {t.formSubtitle}
            </p>
          </div>

          {success ? (
            <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-fade-in space-y-4">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check size={28} />
              </div>
              <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                {t.successTitle}
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                {t.successDesc}
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                {t.newAppBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                    {t.studentNameLabel} *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={t.studentNamePlaceholder}
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                    {t.parentNameLabel} *
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={t.parentNamePlaceholder}
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                    {t.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                    {t.gradeLabel} *
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
                  >
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                    {t.regionLabel} *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
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
                <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 mb-1.5">
                  {t.messageLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder={t.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-lg">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0B1F3A] hover:bg-[#123B66] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={14} />
                <span>{loading ? t.submittingBtn : t.submitBtn}</span>
              </button>

              <div className="pt-2 text-center text-[11px] text-[#64748B] dark:text-slate-400">
                {t.officialPortalNotice}{" "}
                <a
                  href="https://ariza.piima.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1F3A] dark:text-[#C9A227] font-bold underline"
                >
                  ariza.piima.uz
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
