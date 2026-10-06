"use client"

import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import WhySchool from "@/components/why-school"
import Achievements from "@/components/achievements"
import ForStudents from "@/components/for-students"
import Staff from "@/components/staff"
import SchoolLife from "@/components/school-life"
import News from "@/components/news"
import Admissions from "@/components/admissions"
import SchoolProfileBanner from "@/components/school-profile-banner"
import SchoolModeBanner from "@/components/school-mode-banner"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomeClient() {
  return (
    <LanguageProvider>
      <main className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100 antialiased">
        <Header />
        <Hero />
        <About />
        <WhySchool />
        <Achievements />
        <ForStudents />
        <Staff />
        <SchoolLife />
        <News />
        <Admissions />
        <SchoolProfileBanner />
        <SchoolModeBanner />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
