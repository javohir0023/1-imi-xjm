import { BookOpen, Award, Users, Handshake } from "lucide-react"

export default function ForTeachers() {
  const resources = [
    {
      icon: BookOpen,
      title: "O'quv-Metodik Materiallar",
      description: "Dars rejalamalari, test va qo'shimcha materiallar",
    },
    {
      icon: Award,
      title: "Malaka Oshirish",
      description: "Seminarlar, treninglar va sertifikatsiya dasturlari",
    },
    {
      icon: Users,
      title: "Pedagoglar Ro'yxati",
      description: "Maktab xodimlari va ularning malakasi haqida ma'lumot",
    },
    {
      icon: Handshake,
      title: "Hamkorlik",
      description: "Xalqaro hamkorlik va almashuv dasturlari",
    },
  ]

  return (
    <section id="teachers" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">O'qituvchilar Uchun</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional rivojlanish va ta'lim resurslarining to'liq to'plami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div
                key={index}
                className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <button className="text-accent font-semibold hover:text-accent/80 transition-colors">Batafsil →</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
