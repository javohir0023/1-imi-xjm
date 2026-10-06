"use client"

import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Admissions from "@/components/admissions"
import { CheckCircle2, FileText, Calendar, HelpCircle, ExternalLink, ShieldCheck } from "lucide-react"

function AdmissionsPageContent() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Rasmiy Qabul Jarayoni",
      title: "Urganch 1-IMI Qabul Komissiyasi",
      subtitle:
        "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimidagi 1-son ixtisoslashtirilgan maktab-internatiga qabul tartibi va hujjat topshirish.",
      faqTitle: "Ko'p Beriladigan Savollar",
      q1: "Qaysi sinflarga qabul amalga oshiriladi?",
      a1: "Asosiy qabul 5-sinf (matematika va ingliz tili) hamda 7-sinf (biologiya va kimyo) bosqichlarida o'tkaziladi. Qolgan sinflarga faqat bo'sh o'rinlar (vakansiya) mavjud bo'lganda qo'shimcha imtihon e'lon qilinadi.",
      q2: "O'qish pullikmi yoki grant asosidami?",
      a2: "Urganch 1-IMI davlat ixtisoslashtirilgan maktab-internati bo'lib, o'quvchilar 100% davlat granti hisobidan bepul o'qiydi, bepul yotoqxona va 2 mahal issiq ovqat bilan ta'minlanadi.",
      q3: "Imtihonlar qayerda va qanday tartibda o'tkaziladi?",
      a3: "Kirish imtihonlari O'zbekiston Respublikasi Bilim va malakalarni baholash agentligi (sobiq DTM) tomonidan shaffof tarzda o'tkaziladi.",
      q4: "Hujjatlar qanday topshiriladi?",
      a4: "Arizalar har yili rasmiy ariza.piima.uz portali orqali onlayn qabul qilinadi. Shuningdek, quyidagi maktab formasidan dastlabki ro'yxatdan o'tishingiz mumkin.",
      portalNotice: "Agentlikning rasmiy qabul portali:",
    },
    ru: {
      badge: "Официальный приём",
      title: "Приёмная комиссия Урганч 1-ИМИ",
      subtitle:
        "Порядок поступления и подача заявлений в специализированную школу-интернат №1 г. Ургенча.",
      faqTitle: "Часто задаваемые вопросы",
      q1: "В какие классы проводится прием?",
      a1: "Основной прием проводится в 5-й класс (математика и английский) и в 7-й класс (биология и химия). В другие классы прием объявляется только при наличии вакантных мест.",
      q2: "Обучение платное или на гранте?",
      a2: "Школа является государственной, обучение 100% бесплатное за счет государственного гранта, включая проживание и питание.",
      q3: "Как проводятся вступительные экзамены?",
      a3: "Вступительные экзамены организуются Агентством по оценке знаний и навыков в прозрачном формате.",
      q4: "Как подать документы?",
      a4: "Заявления принимаются через официальный портал ariza.piima.uz. Также вы можете пройти предварительную регистрацию на нашем сайте.",
      portalNotice: "Официальный портал приёма Агентства:",
    },
    en: {
      badge: "Admissions Office",
      title: "Urganch 1-IMI Admissions",
      subtitle:
        "Admission regulations, entrance examination criteria, and online application processing.",
      faqTitle: "Frequently Asked Questions",
      q1: "Which grades are eligible for admission?",
      a1: "Primary intake occurs at Grade 5 (Math & English) and Grade 7 (Biology & Chemistry). Other grades admit only upon vacant seat availability.",
      q2: "Is tuition free or state-funded?",
      a2: "Urganch 1-IMI is a fully state-funded specialized boarding school. Tuition, dormitory housing, and meal plans are 100% covered by merit scholarships.",
      q3: "How are examinations administered?",
      a3: "Entrance tests are conducted centrally by the National Knowledge and Skills Assessment Agency under standardized protocols.",
      q4: "How do candidates apply?",
      a4: "Applications open annually via the official national portal ariza.piima.uz. Candidates may also submit preliminary intake details below.",
      portalNotice: "Official Agency Admissions Portal:",
    },
  }[language]

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
  ]

  return (
    <div className="bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9A227] text-xs font-bold">
              <ShieldCheck size={14} />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.title}
            </h1>
            <p className="text-base text-slate-300 font-normal leading-relaxed">
              {t.subtitle}
            </p>
            <div className="pt-2">
              <a
                href="https://ariza.piima.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A227] hover:bg-[#d8b030] text-[#0B1F3A] font-bold text-xs rounded-lg transition-all shadow-sm"
              >
                <span>{t.portalNotice} ariza.piima.uz</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Admissions Form & Process Component */}
      <Admissions />

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#0B1F3A] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] dark:text-white">
              {t.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#071324] border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-bold text-[#0B1F3A] dark:text-white text-sm sm:text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function AdmissionsPage() {
  return (
    <LanguageProvider>
      <AdmissionsPageContent />
    </LanguageProvider>
  )
}
