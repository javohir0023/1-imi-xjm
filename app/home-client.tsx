"use client"

import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import ForStudents from "@/components/for-students"
import ForTeachers from "@/components/for-teachers"
import Staff from "@/components/staff"
import Admissions from "@/components/admissions"
import Achievements from "@/components/achievements"
import Schedule from "@/components/schedule"
import Gallery from "@/components/gallery"
import News from "@/components/news"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomeClient() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <ForStudents />
        <ForTeachers />
        <Staff />
        <Admissions />
        <Achievements />
        <Schedule />
        <Gallery />
        <News />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
