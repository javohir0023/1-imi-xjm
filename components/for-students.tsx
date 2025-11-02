import { Calendar, BookMarked, Trophy, Users } from "lucide-react"

export default function ForStudents() {
  const resources = [
    {
      icon: Calendar,
      title: "Dars Jadvali",
      description: "Haftalik dars jadvali va akademik taqvim",
    },
    {
      icon: BookMarked,
      title: "Fanlar",
      description: "Asosiy va ixtisoslashtirilgan fanlar",
    },
    {
      icon: Trophy,
      title: "Tanlov va Olimpiadalar",
      description: "Respublika va xalqaro tanlovlar",
    },
    {
      icon: Users,
      title: "To'garaklar",
      description: "Qo'shimcha ta'lim va ijodiy to'garaklar",
    },
  ]

  return (
    <section id="students" className="py-20 md:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div
                key={index}
                className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-muted-foreground">{resource.description}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">Maktab Hayoti</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-45-X8EfpRQif5Q7JBENoH470E5zsGCybW.jpg"
              alt="School event"
              className="rounded-lg h-64 object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-52-xxb8VYRSnsRZrr88h2enPgyP7lN83j.jpg"
              alt="Students"
              className="rounded-lg h-64 object-cover"
            />
            <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg h-64 flex items-center justify-center">
              <a
                href="http://t.me/Urganch_IMI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Ko'proq ko'rish
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
