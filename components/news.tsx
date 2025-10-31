import { Calendar, ArrowRight } from "lucide-react"

const newsItems = [
  {
    date: "2025-yil 24-oktabr",
    title: "Yangi Xalqaro Hamkorlik Elon Qilindi",
    excerpt: "Urganch 1-IMI Yevropa va Osiyodagi yetakchi muassasalar bilan hamkorlikni o'rnatdi",
    category: "Hamkorlik",
  },
  {
    date: "2025-yil 20-oktabr",
    title: "O'quvchilar Xalqaro Tanlovda G'alaba Qozondi",
    excerpt: "Maktab o'quvchilari Respublika STEM tanlovida birinchi o'rinni egalladi",
    category: "Yutuq",
  },
  {
    date: "2025-yil 15-oktabr",
    title: "Maktab Infratuzilmasi Yangilandi",
    excerpt: "Zamonaviy laboratoriyalar va sport zallari o'quvchilar uchun ochildi",
    category: "Maktab",
  },
]

export default function News() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">So'nggi Yangiliklar</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Urganch 1-IMI da sodir bo'layotgan voqealar haqida o'zingizni xabardor qiling
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="p-6 bg-card rounded-xl border border-border hover:border-accent transition-all hover:shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Batafsil <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
