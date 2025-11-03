import { Calendar, ArrowRight } from "lucide-react"

const newsItems = [
  {
    date: "2025-yil 22-oktabr",
    title: "Bilim va Malakalarni Baholash Agentligi bilan Hamkorlik",
    excerpt:
      "Xorazm viloyati filiali bilan ixtisoslashtirilgan maktablar oʻrtasida o'zaro hamkorlik memorandumi imzolandi",
    category: "Hamkorlik",
    link: "https://t.me/Urganch_IMI/16964",
  },
  {
    date: "2025-yil 17-mart",
    title: "Toshkent Farmatseftika Texnik Universiteti bilan Memorandum",
    excerpt: "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati va universiteit oʻrtasida hamkorlik imzolandi",
    category: "Hamkorlik",
    link: "https://t.me/Urganch_IMI/12780",
  },
  {
    date: "2025-yil 17-oktabr",
    title: "UZTEX GROUP Korxonasiga Ekskursiya",
    excerpt:
      "10-02-sinf o'quvchilari maktab maslahatchisi boshchiligida UZTEX GROUP filialiga tanishtiruv ekskursiyasiga tashrif buyurdilar",
    category: "Maktab",
    link: "https://t.me/Urganch_IMI/16878",
  },
  {
    date: "2025-yil 31-yanvar",
    title: "UzXCMG Ishlab Chiqarish Korxonasiga Tashrif",
    excerpt:
      "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati o'quvchilari ekskavatorlar va buldozerlar ishlab chiqarish qóshma korxonasiga tashrif buyurdilar",
    category: "Maktab",
    link: "https://t.me/Urganch_IMI/11720",
  },
  {
    date: "2025-yil 24-yanvar",
    title: "DARITAL SHOES MCHJ bilan Hamkorlik",
    excerpt:
      "Maktabning bitiruvchi sinf o'quvchilari kasbga yo'naltirish maqsadida ishlab chiqarish korxonasiga tashrif buyurib, u yerdagi shart-sharoitlar va ish jarayonlari bilan tanishdilar",
    category: "Kasbiy",
    link: "https://t.me/Urganch_IMI/11599",
  },
  {
    date: "2025-yil 24-oktabr",
    title: "Yangi Xalqaro Hamkorlik Elon Qilindi",
    excerpt: "Urganch 1-IMI Yevropa va Osiyodagi yetakchi muassasalar bilan hamkorlikni o'rnatdi",
    category: "Hamkorlik",
    link: "https://t.me/Urganch_IMI",
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
                  <Calendar size={16} className="text-yellow-500" />
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-black mb-4">{item.excerpt}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold flex items-center gap-2 group-hover:gap-3 transition-all hover:text-gray-700"
                >
                  Batafsil <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
