export default function Gallery() {
  const images = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-56-9NQphJLDSKFqsTSHIKhKoGA1SL3g3m.jpg",
      alt: "Maktab binosi",
      title: "Maktab Binosi",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-29-h2U1pgR6zMJjmTdXIvsdMmFcXXSFT7.jpg",
      alt: "Klassik arxitektura",
      title: "Klassik Arxitektura",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-45-X8EfpRQif5Q7JBENoH470E5zsGCybW.jpg",
      alt: "Rasmiy tadbirlar",
      title: "Rasmiy Tadbirlar",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-24_21-21-52-xxb8VYRSnsRZrr88h2enPgyP7lN83j.jpg",
      alt: "O'quvchilar",
      title: "O'quvchilar Jamiyati",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Galereya</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maktab hayoti, tadbirlar va binolardan fotosuratlar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
