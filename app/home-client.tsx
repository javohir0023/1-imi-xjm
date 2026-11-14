"use client"

import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import Hero from "@/components/hero"
import SchoolStats from "@/components/school-stats"
import About from "@/components/about"
import IntroVideo from "@/components/intro-video"
import WhySchool from "@/components/why-school"
import Achievements from "@/components/achievements"
import Staff from "@/components/staff"
import ForStudents from "@/components/for-students"
import News from "@/components/news"
import Admissions from "@/components/admissions"
import SchoolProfileBanner from "@/components/school-profile-banner"
import SchoolModeBanner from "@/components/school-mode-banner"
import TelegramCTA from "@/components/telegram-cta"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomeClient() {
  return (
    <LanguageProvider>
      <main className="min-h-screen flex flex-col bg-[#F5F7FA] dark:bg-[#0B1726] text-[#172638] dark:text-slate-100 antialiased">
        {/* 1. Header (Sticky two-level with Maktab rejimi & Telegram) */}
        <Header />

        {/* 2. Hero Section (Authentic photography, CTAs) */}
        <Hero />

        {/* 3. School Statistics (Verified indicators: DTM 170.9, 100% OTM, 674+ certs) */}
        <SchoolStats />

        {/* 4. About the School (Mission, Agency status, Infrastructure) */}
        <About />

        {/* 4.1. Official Intro Video Tour (Authentic YouTube video & campus highlights) */}
        <IntroVideo />

        {/* 5. Educational Programs (Exact & Natural sciences, Cambridge & Olympiad) */}
        <WhySchool />

        {/* 6. Student Achievements (Major section: Olympiads & 674 certificates archive) */}
        <Achievements />

        {/* 7. Teachers (Verified docx educators with actual portraits) */}
        <Staff />

        {/* 8. Student Life (Clubs, robotics, events, activities) */}
        <ForStudents />

        {/* 9. Latest News (Directly integrated with official Telegram https://t.me/s/Urganch_IMI) */}
        <News />

        {/* 10. Admissions (Verified info, official ariza.piima.uz portal) */}
        <Admissions />

        {/* 11. School Profile (Verified dossier, PDF download) */}
        <SchoolProfileBanner />

        {/* School Mode interactive banner linking to Figma */}
        <SchoolModeBanner />

        {/* 12. Telegram CTA (Join official channel @Urganch_IMI) */}
        <TelegramCTA />

        {/* Contact details & Map */}
        <Contact />

        {/* 14. Footer (Verified identity, contacts, links, Telegram) */}
        <Footer />
      </main>
    </LanguageProvider>
  )
}
