"use client"

import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

interface StaffMember {
  id: number
  nameUz: string
  nameRu: string
  nameEn: string
  positionUz: string
  positionRu: string
  positionEn: string
  phone: string
  image?: string
  category: "administration" | "language" | "science" | "other"
  isQualified?: boolean
}

const staffData: StaffMember[] = [
  {
    id: 1,
    nameUz: "Axmedov G'ulomjon Jumanazarovich",
    nameRu: "Ахмедов Гуломжон Юманазарович",
    nameEn: "Akhmadov Gulomjon Jumanazarovich",
    positionUz: "Direktor",
    positionRu: "Директор",
    positionEn: "Director",
    phone: "91-432-76-64",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Axmedov%20G%27ulomjon%20Jumanazarovich-Hx6bYtldcDuJq3oH673wUGIwtckyh3.jpg",
    category: "administration",
    isQualified: true,
  },
  {
    id: 4,
    nameUz: "Seytirzayeva Iroda",
    nameRu: "Сейтирзаева Ирода",
    nameEn: "Seytirzayeva Iroda",
    positionUz: "MMIBDO'",
    positionRu: "Заместитель директора",
    positionEn: "Deputy Director",
    phone: "94-315-40-34",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seytirzayeva%20Iroda-VtX1nSNqVTOk0x8a7bNFeaZKmq9g8Y.jpg",
    category: "administration",
    isQualified: true,
  },
  {
    id: 31,
    nameUz: "Karimov Sarvar Otabayevich",
    nameRu: "Каримов Сарвар Отабаевич",
    nameEn: "Karimov Sarvar Otabayevich",
    positionUz: "Tarix o'qituvchisi",
    positionRu: "Учитель истории",
    positionEn: "History Teacher",
    phone: "+998 93-745-91-29",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Karimov%20Sarvar%20Otabayevich-GeGVL8CI78dXW7RdNTDOdtCHgshKYv.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 50,
    nameUz: "Jumaniyozova Mahliyo Qahramonovna",
    nameRu: "Юманиёзова Махлиё Кахраманovna",
    nameEn: "Jumaniyozova Mahliyo Qahramonovna",
    positionUz: "Kimyo o'qituvchisi",
    positionRu: "Учитель химии",
    positionEn: "Chemistry Teacher",
    phone: "93-764-53-35",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jumaniyozova%20Mahliyo%20Qahramonovna-UuKIClUCX6hoK2W5MqmWhEzyUpD8Ir.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 34,
    nameUz: "Jumaniyozov Baxtiyor Marimbayevich",
    nameRu: "Юманиёзов Бахтиёр Маримбаевич",
    nameEn: "Jumaniyozov Baxtiyor Marimbayevich",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    phone: "+998 93 740-17-71",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jumaniyozov%20Baxtiyor%20Marimbayevich-jKnXoM1F32qUT6POlzRJV6kTxNJwN4.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 19,
    nameUz: "Jumaniyazova Yulduzxon Oktamovna",
    nameRu: "Юманиёзова Юлдузхон Октамовна",
    nameEn: "Jumaniyazova Yulduzxon Oktamovna",
    positionUz: "Rus tili o'qituvchisi",
    positionRu: "Учитель русского языка",
    positionEn: "Russian Language Teacher",
    phone: "99-684-60-09",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jumaniyazova%20Yulduzxon%20Oktamovna-GLXNItccUhf7p7gJQdOWbMaAyI67CH.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 11,
    nameUz: "Ibragimova Indira Temurovna",
    nameRu: "Ибрагимова Индира Темуровна",
    nameEn: "Ibragimova Indira Temurovna",
    positionUz: "Kutubxona mudiri",
    positionRu: "Директор библиотеки",
    positionEn: "Librarian",
    phone: "97-456-19-30",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ibragimova%20Indira%20Temurovna-RBy4lPIdR5pp1Viy0PDZvgNHihVUWD.jpg",
    category: "other",
    isQualified: true,
  },
  {
    id: 37,
    nameUz: "Ismailov Sadulla Tajiyevich",
    nameRu: "Исмаилов Садулла Тажиевич",
    nameEn: "Ismailov Sadulla Tajiyevich",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    phone: "+998 93 744-54-66",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ismailov%20Sadulla%20Tajiyevich-OJlZVqw2jfrrTpMFDDo5oYOMjqpEzg.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 47,
    nameUz: "Bekberganov Alisher Xikmatullayevich",
    nameRu: "Бекбергенов Алишер Хикматуллаевич",
    nameEn: "Bekberganov Alisher Xikmatullayevich",
    positionUz: "Fizika o'qituvchisi",
    positionRu: "Учитель физики",
    positionEn: "Physics Teacher",
    phone: "+998 93 743-44-43",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bekberganov%20Alisher%20Xikmatullayevich-edgkCQLkG9eBGXfCbgehqx9VBLNYrs.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 51,
    nameUz: "Nurmetova Dilrabo Kamiljanovna",
    nameRu: "Нурметова Дилрабо Камиджановна",
    nameEn: "Nurmetova Dilrabo Kamiljanovna",
    positionUz: "Kimyo o'qituvchisi",
    positionRu: "Учитель химии",
    positionEn: "Chemistry Teacher",
    phone: "97-600-46-90",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nurmetova%20Dilrabo%20Kamiljanovna-Wo4lnSjlUX5MGSEbStak5ktpeVnOpJ.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 18,
    nameUz: "Mavlanova Mahliyo",
    nameRu: "Мавланова Махлиё",
    nameEn: "Mavlanova Mahliyo",
    positionUz: "Ona tili va adabiyot o'qituvchisi",
    positionRu: "Учитель родного языка и литературы",
    positionEn: "Native Language and Literature Teacher",
    phone: "94-314-37-34",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mavlanova%20Mahliyo-RBDheaQNirOgwKuM2LfFyq2fXjfFOx.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 26,
    nameUz: "Rahimova Dilnoza Shuxratovna",
    nameRu: "Рахимова Дилноза Шухратовна",
    nameEn: "Rahimova Dilnoza Shuxratovna",
    positionUz: "Ingliz tili o'qituvchisi",
    positionRu: "Учитель английского языка",
    positionEn: "English Language Teacher",
    phone: "+998 97 518-09-25",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rahimova%20Dilnoza%20Shuxratovna-ss3Spk9Ggz4kTF9bzvWgQHXpaqeg0E.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 3,
    nameUz: "Quryazova Ruxsora Madamin qizi",
    nameRu: "Куряёзова Рухсора Мадамин кизи",
    nameEn: "Quryazova Ruxsora Madamin qizi",
    positionUz: "Maktab maslahatchisi",
    positionRu: "Школьный консультант",
    positionEn: "School Counselor",
    phone: "93-754-43-32",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quryazova%20Ruxsora%20Madamin%20qizi-LdrpHfaMNdE41bBTabsUPToe1B1Spn.jpg",
    category: "administration",
    isQualified: true,
  },
  {
    id: 21,
    nameUz: "Madrimova Indira Alisherovna",
    nameRu: "Мадримова Индира Алишеровна",
    nameEn: "Madrimova Indira Alisherovna",
    positionUz: "Rus tili o'qituvchisi",
    positionRu: "Учитель русского языка",
    positionEn: "Russian Language Teacher",
    phone: "90-433-04-94",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madrimova%20Indira%20Alisherovna-izvNsjCrBqakK4Yrs9OEAv0nCJltHa.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 40,
    nameUz: "Nurmetov Murod Farxodovich",
    nameRu: "Нурметов Муродж Фарходович",
    nameEn: "Nurmetov Murod Farxodovich",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    phone: "+998 91 275-85-35",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nurmetov%20Murod%20Farxodovich-qbvJq2QYiB9A8TeWy9wdnW6vetugBc.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 30,
    nameUz: "Masharifov Mardonbek Otabek o'g'li",
    nameRu: "Машарифов Мардонбек Отабек угли",
    nameEn: "Masharifov Mardonbek Otabek o'g'li",
    positionUz: "Tarix o'qituvchisi",
    positionRu: "Учитель истории",
    positionEn: "History Teacher",
    phone: "+998 93 289-06-50",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Masharifov%20Mardonbek%20Otabek%20o%60g%60li-xRCa42GPGOyJJNIbz5y0J5HZ6wYo3T.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 22,
    nameUz: "Madraximov Dilshod Sa'dullayevich",
    nameRu: "Мадрахимов Дилшод Саъдуллаевич",
    nameEn: "Madraximov Dilshod Sa'dullayevich",
    positionUz: "Ingliz tili o'qituvchisi",
    positionRu: "Учитель английского языка",
    positionEn: "English Language Teacher",
    phone: "+998 91 424-21-71",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madraximov%20Dilshod%20Sa%60dullayevich-8IcNnszs36jhfsTRsF1psGrkShO8Wi.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 43,
    nameUz: "Matrasulova Ra'no Ruzmamatovna",
    nameRu: "Матрасулова Рано Рузмаматовна",
    nameEn: "Matrasulova Ra'no Ruzmamatovna",
    positionUz: "Informatika o'qituvchisi",
    positionRu: "Учитель информатики",
    positionEn: "Computer Science Teacher",
    phone: "+998 93 467-65-58",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Matrasulova%20Ra%60no%20Ruzmamatovna-yPiQ3z8Inysehh1kl0p2KA9HkdATkj.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 49,
    nameUz: "Madaminov Sharifboy Xakimjonovich",
    nameRu: "Мадаминов Шарифбой Хакимджонович",
    nameEn: "Madaminov Sharifboy Xakimjonovich",
    positionUz: "Fizika o'qituvchisi",
    positionRu: "Учитель физики",
    positionEn: "Physics Teacher",
    phone: "+998 33-061-99-97",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madaminov%20Sharifboy%20Xakimjonovich-zgp4uCDhAkdsEaFLZhT4LBbDoCsaZr.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 24,
    nameUz: "Yakubova Dilnoza Ruzmatovna",
    nameRu: "Якубова Дилноза Рузматовна",
    nameEn: "Yakubova Dilnoza Ruzmatovna",
    positionUz: "Ingliz tili o'qituvchisi",
    positionRu: "Учитель английского языка",
    positionEn: "English Language Teacher",
    phone: "+998 94 318-77-04",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yakubova%20Dilnoza%20%20Ruzmatovna-5Y804zobEOYJfN7fUPDgemzb1vsvRA.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 38,
    nameUz: "Худайберганова Дилсўз",
    nameRu: "Худайберганова Дилсўз",
    nameEn: "Khudayberganova Dilsuz",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    phone: "+998 97 363-71-71",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A5%D1%83%D0%B4%D0%B0%D0%B9%D0%B1%D0%B5%D1%80%D0%B3%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%20%D0%94%D0%B8%D0%BB%D1%81%D1%9E%D0%B7-vtHZYwxjE0evNvMqAlG6a12t9ZyNic.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 25,
    nameUz: "Raximov Ulug'bek Amirbekovich",
    nameRu: "Рахимов Улугбек Амирбекович",
    nameEn: "Raximov Ulug'bek Amirbekovich",
    positionUz: "Ingliz tili o'qituvchisi",
    positionRu: "Учитель английского языка",
    positionEn: "English Language Teacher",
    phone: "+998 99 344-87-50",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raximov%20Ulug%60bek%20%20Amirbekovich-LWtRfgZIcA1zSPZ75EBHGFZNYAE4oI.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 44,
    nameUz: "Urinova Feruza Jumabayevna",
    nameRu: "Уринова Феруза Джумабаевна",
    nameEn: "Urinova Feruza Jumabayevna",
    positionUz: "Informatika o'qituvchisi",
    positionRu: "Учитель информатики",
    positionEn: "Computer Science Teacher",
    phone: "+998 93 467-33-77",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Urinova%20Feruza%20%20Jumabayevna-3oGbPFV4cUSTZ8qeRrXDOorvOMFELR.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 56,
    nameUz: "Xo'jayozova Dilnura G'apparganovna",
    nameRu: "Ходжаёзова Дилнура Гаппарганovna",
    nameEn: "Khojayozova Dilnura G'apparganovna",
    positionUz: "Biologiya o'qituvchisi",
    positionRu: "Учитель биологии",
    positionEn: "Biology Teacher",
    phone: "+998 97 221-55-86",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Xo%60jayozova%20Dilnura%20G%60apparganovna-XqTSrv4QR2x0IvAFFdPGyexrG3agNZ.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 59,
    nameUz: "Saidova Gavxar",
    nameRu: "Саидова Гавхар",
    nameEn: "Saidova Gavxar",
    positionUz: "Tarbiya o'qituvchisi",
    positionRu: "Учитель воспитания",
    positionEn: "Education Teacher",
    phone: "91-431-98-90",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saidova%20Gavxar-UsufWBsD1t5cX7Tnh0eWxw5Ywe2jdo.jpg",
    category: "other",
    isQualified: true,
  },
  {
    id: 41,
    nameUz: "Razzakov Javoxir",
    nameRu: "Раззаков Джавохир",
    nameEn: "Razzakov Javoxir",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    phone: "91-571-27-28",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Razzakov%20Javoxir-fsV7Ci8yL59SsK9FBsnzRLT6jigMc7.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 6,
    nameUz: "Rajabov Alisher",
    nameRu: "Раджабов Алишер",
    nameEn: "Rajabov Alisher",
    positionUz: "ChQBT",
    positionRu: "Начальник отдела",
    positionEn: "Department Head",
    phone: "77-038-47-40",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rajabov%20Alisher-lVofCE1400y60QdbN4gynhZoU5LIWY.jpg",
    category: "administration",
    isQualified: true,
  },
  {
    id: 17,
    nameUz: "Rahimova Gulshan Kadambayevna",
    nameRu: "Рахимова Гульшан Кадамбаевна",
    nameEn: "Rahimova Gulshan Kadambayevna",
    positionUz: "Ona tili va adabiyot o'qituvchisi",
    positionRu: "Учитель родного языка и литературы",
    positionEn: "Native Language and Literature Teacher",
    phone: "+998 91 421-62-64",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rahimova%20Gulshan%20Kadambayevna-ThqEDI6y0Wv66gg8QSVcKdXeZ1hUOb.jpg",
    category: "language",
    isQualified: true,
  },
  {
    id: 33,
    nameUz: "Rajabov Madyor Egamberganovich",
    nameRu: "Раджабов Мадьор Егамбергенович",
    nameEn: "Rajabov Madyor Egamberganovich",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    phone: "+998 95 599-22-72",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rajabov%20Madyor%20Egamberganovich-4auvnqpIxok51OQ7n4HD9NqOsgi8f2.jpg",
    category: "science",
    isQualified: true,
  },
]

export default function Staff() {
  const { language } = useLanguage()

  const translations = {
    uz: {
      title: "Maktab Xodimlari",
      subtitle: "Malakali va tajribali pedagoglar jamoasi",
      administration: "Boshqaruv",
      language: "Til o'qituvchilari",
      science: "Fan o'qituvchilari",
      other: "Boshqa xodimlar",
    },
    ru: {
      title: "Сотрудники школы",
      subtitle: "Команда квалифицированных и опытных педагогов",
      administration: "Администрация",
      language: "Учителя иностранных языков",
      science: "Учителя естественных наук",
      other: "Другие сотрудники",
    },
    en: {
      title: "School Staff",
      subtitle: "Team of qualified and experienced educators",
      administration: "Administration",
      language: "Language Teachers",
      science: "Science Teachers",
      other: "Other Staff",
    },
  }

  const t = translations[language]

  const getName = (member: StaffMember) => {
    switch (language) {
      case "ru":
        return member.nameRu
      case "en":
        return member.nameEn
      default:
        return member.nameUz
    }
  }

  const getPosition = (member: StaffMember) => {
    switch (language) {
      case "ru":
        return member.positionRu
      case "en":
        return member.positionEn
      default:
        return member.positionUz
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "administration":
        return t.administration
      case "language":
        return t.language
      case "science":
        return t.science
      default:
        return t.other
    }
  }

  const groupedStaff = staffData.reduce(
    (acc, member) => {
      if (!acc[member.category]) {
        acc[member.category] = []
      }
      acc[member.category].push(member)
      return acc
    },
    {} as Record<string, StaffMember[]>,
  )

  const categoryOrder = ["administration", "language", "science", "other"]

  return (
    <section id="staff" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {categoryOrder.map((category) => {
          const members = groupedStaff[category]
          if (!members || members.length === 0) return null

          return (
            <div key={category} className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 pb-4 border-b-2 border-accent">
                {getCategoryLabel(category)}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                  >
                    {member.image ? (
                      <div className="flex justify-center pt-8 pb-4">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden bg-muted border-4 border-accent flex-shrink-0">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={getName(member)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center pt-8 pb-4">
                        <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center border-4 border-accent">
                          <div className="text-center">
                            <div className="text-4xl text-muted-foreground mb-2">👤</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-6 text-center">
                      <h4 className={`text-lg font-bold mb-2 ${member.isQualified ? "text-black" : "text-foreground"}`}>
                        {getName(member)}
                      </h4>
                      <p className="text-black font-semibold mb-4">{getPosition(member)}</p>
                      <div className="flex items-center justify-center text-muted-foreground">
                        <span className="text-sm">📞 {member.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
