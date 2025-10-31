"use client"

import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Staff from "@/components/staff"
import ForTeachers from "@/components/for-teachers"

export default function TeachersPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <div className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Teachers & Staff</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Meet our dedicated team of educators committed to excellence in education.
            </p>
          </div>
        </div>
        <ForTeachers />
        <Staff />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
