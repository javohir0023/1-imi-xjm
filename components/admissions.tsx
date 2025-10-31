import { FileText, CheckCircle, Users, Calendar } from "lucide-react"

export default function Admissions() {
  const steps = [
    {
      icon: FileText,
      title: "Hujjatlarni Tayyorlash",
      description: "Zarur hujjatlarni to'plash va tayyorlash",
    },
    {
      icon: Calendar,
      title: "Kirish Imtihonlari",
      description: "Matematika, o'zbek tili va ingliz tilida imtihonlar",
    },
    {
      icon: CheckCircle,
      title: "Natijalar",
      description: "Imtihon natijalarini ko'rish va qabul qarorini olish",
    },
    {
      icon: Users,
      title: "Ro'yxatga Olish",
      description: "Maktabga rasmiy ro'yxatga olish jarayoni",
    },
  ]

  return (
    <section id="admissions" className="py-20 md:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Qabul Jarayoni</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maktabga kirish uchun zarur barcha ma'lumot va hujjatlar
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="bg-card p-6 rounded-xl border border-border text-center">
                  <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-accent"></div>
                )}
              </div>
            )
          })}
        </div>

        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6">Onlayn Ariza Topshirish</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ism-Familiya"
                className="px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
              />
            </div>
            <input
              type="tel"
              placeholder="Telefon raqami"
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
            />
            <textarea
              placeholder="Qo'shimcha ma'lumot"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
            ></textarea>
            <button className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Arizani Topshirish
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
