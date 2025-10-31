import { BookOpen, Users, Award, Building2 } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: BookOpen,
      title: "Yuqori Sifatli Ta'lim",
      description: "Zamonaviy o'quv dasturlari va xalqaro standartlarga mos ta'lim",
    },
    {
      icon: Users,
      title: "Tajribali O'qituvchilar",
      description: "Malaka oshirilgan va sertifikatlangan pedagoglar jamoasi",
    },
    {
      icon: Award,
      title: "Yutuqlar va Tan Olish",
      description: "Respublika va xalqaro darajadagi ko'plab yutuqlar",
    },
    {
      icon: Building2,
      title: "Zamonaviy Infratuzilma",
      description: "Laboratoriyalar, kutubxona va sport zallari bilan jihozlangan",
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Maktab Haqida</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Urganch shahar 1-son ixtisoslashtirilgan maktab-internati - ta'lim va innovatsiyaning markazi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-29-h2U1pgR6zMJjmTdXIvsdMmFcXXSFT7.jpg"
              alt="School building"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Maktabning Maqsadi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Iste'todli o'quvchilarni qo'llab-quvvatlash, ularning ilmiy salohiyati va ijodiy fikrlash qobiliyatini
                rivojlantirishdir.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Faoliyat Yo'nalishlari</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Zamonaviy ta'lim usullari asosida darslar o'tkazish</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Tanqidiy fikrlash va innovatsion yondashuvga e'tibor</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Ilmiy izlanishlar va fan olimpiadalarida yuqori natijalar</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Liderlik va ijtimoiy mas'uliyat fazilatlarini shakllantirizish</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
