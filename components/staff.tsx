"use client"

import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface StaffMember {
  id: number
  nameUz: string
  nameRu: string
  nameEn: string
  positionUz: string
  positionRu: string
  positionEn: string
  phone?: string
  image?: string
  category: "administration" | "language" | "science" | "other"
  isQualified?: boolean
  qualification?: string
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Axmedov%20G%27ulomjon%20Jumanazarovich-Hx6bYtldcDuJq3oH673wUGIwtckyh3.jpg",
    category: "administration",
    isQualified: true,
    qualification: "Tarix fanlari bo'yicha falsafa doktori (PhD) ilmiy darajasi sohibi",
  },
  {
    id: 2,
    nameUz: "Bekzod Bobojonov",
    nameRu: "Бекзод Бобожонов",
    nameEn: "Bekzod Bobojonov",
    positionUz: "O'IBDO'",
    positionRu: "Заместитель директора по образовательным вопросам",
    positionEn: "Deputy Director for Educational Affairs",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bekzod%20Bobojonov-skc6CVHuVs8ZDqFmyhsunvvGTsR0rb.jpg",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seytirzayeva%20Iroda-VtX1nSNqVTOk0x8a7bNFeaZKmq9g8Y.jpg",
    category: "administration",
    isQualified: true,
  },
  {
    id: 55,
    nameUz: "Raximov Asror Anvar o'g'li",
    nameRu: "Рахимов Асрор Анвар угли",
    nameEn: "Raximov Asror Anvar o'g'li",
    positionUz: "Informatika o'qituvchisi",
    positionRu: "Учитель информатики",
    positionEn: "Computer Science Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raximov%20Asror%20Anvar%20o%E2%80%99g%E2%80%99li-MCGKiEXk1XZffUuoE3Sa3w0OEJ7yh2.jpg",
    category: "science",
    isQualified: true,
    qualification: "A",
  },
  {
    id: 57,
    nameUz: "Atajanov Xamidulla Fayzullayevich",
    nameRu: "Атажанов Хамидулла Файзуллаевич",
    nameEn: "Atajanov Xamidulla Fayzullayevich",
    positionUz: "Fizika o'qituvchisi",
    positionRu: "Учитель физики",
    positionEn: "Physics Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Atajanov%20Xamidulla%20Fayzullayevich-NbRDaIZQqJzYmP60f12KiZHjoubCgo.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (A)",
  },
  {
    id: 31,
    nameUz: "Karimov Sarvar Otabayevich",
    nameRu: "Каримов Сарвар Отабаевич",
    nameEn: "Karimov Sarvar Otabayevich",
    positionUz: "Tarix o'qituvchisi",
    positionRu: "Учитель истории",
    positionEn: "History Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Karimov%20Sarvar%20Otabayevich-GeGVL8CI78dXW7RdNTDOdtCHgshKYv.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (A+)",
  },
  {
    id: 50,
    nameUz: "Jumaniyozova Mahliyo Qahramonovna",
    nameRu: "Юманиёзова Махлиё Кахрамановна",
    nameEn: "Jumaniyozova Mahliyo Qahramonovna",
    positionUz: "Kimyo o'qituvchisi",
    positionRu: "Учитель химии",
    positionEn: "Chemistry Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jumaniyozova%20Mahliyo%20Qahramonovna-UuKIClUCX6hoK2W5MqmWhEzyUpD8Ir.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (B+)",
  },
  {
    id: 34,
    nameUz: "Jumaniyozov Baxtiyor Marimbayevich",
    nameRu: "Юманиёзов Бахтиёр Маримбаевич",
    nameEn: "Jumaniyozov Baxtiyor Marimbayevich",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jumaniyozov%20Baxtiyor%20Marimbayevich-jKnXoM1F32qUT6POlzRJV6kTxNJwN4.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (B+)",
  },
  {
    id: 19,
    nameUz: "Jumaniyazova Yulduzxon Oktamovna",
    nameRu: "Юманиёзова Юлдузхон Октамовна",
    nameEn: "Jumaniyazova Yulduzxon Oktamovna",
    positionUz: "Rus tili o'qituvchisi",
    positionRu: "Учитель русского языка",
    positionEn: "Russian Language Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jumaniyazova%20Yulduzxon%20Oktamovna-GLXNItccUhf7p7gJQdOWbMaAyI67CH.jpg",
    category: "language",
    isQualified: true,
    qualification: "TRKI (A), Milliy (A)",
  },
  {
    id: 11,
    nameUz: "Ibragimova Indira Temurovna",
    nameRu: "Ибрагимова Индира Темуровна",
    nameEn: "Ibragimova Indira Temurovna",
    positionUz: "Kutubxona mudiri",
    positionRu: "Директор библиотеки",
    positionEn: "Librarian",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bekberganov%20Alisher%20Xikmatullayevich-edgkCQLkG9eBGXfCbgehqx9VBLNYrs.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (A+)",
  },
  {
    id: 51,
    nameUz: "Nurmetova Dilrabo Kamiljanovna",
    nameRu: "Нурметова Дилрабо Камиджановна",
    nameEn: "Nurmetova Dilrabo Kamiljanovna",
    positionUz: "Kimyo o'qituvchisi",
    positionRu: "Учитель химии",
    positionEn: "Chemistry Teacher",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rahimova%20Dilnoza%20Shuxratovna-ss3Spk9Ggz4kTF9bzvWgQHXpaqeg0E.jpg",
    category: "language",
    isQualified: true,
    qualification: "IELTS (C1), CEFR (C1)",
  },
  {
    id: 3,
    nameUz: "Quryazova Ruxsora Madamin qizi",
    nameRu: "Куряёзова Рухсора Мадамин кизи",
    nameEn: "Quryazova Ruxsora Madamin qizi",
    positionUz: "Maktab maslahatchisi",
    positionRu: "Школьный консультант",
    positionEn: "School Counselor",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madrimova%20Indira%20Alisherovna-izvNsjCrBqakK4Yrs9OEAv0nCJltHa.jpg",
    category: "language",
    isQualified: true,
    qualification: "TRKI (B+)",
  },
  {
    id: 40,
    nameUz: "Nurmetov Murod Farxodovich",
    nameRu: "Нурметов Муродж Фарходович",
    nameEn: "Nurmetov Murod Farxodovich",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nurmetov%20Murod%20Farxodovich-qbvJq2QYiB9A8TeWy9wdnW6vetugBc.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (B+)",
  },
  {
    id: 30,
    nameUz: "Masharifov Mardonbek Otabek o'g'li",
    nameRu: "Машарифов Мардонбек Отабек угли",
    nameEn: "Masharifov Mardonbek Otabek o'g'li",
    positionUz: "Tarix o'qituvchisi",
    positionRu: "Учитель истории",
    positionEn: "History Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Masharifov%20Mardonbek%20Otabek%20o%60g%60li-xRCa42GPGOyJJNIbz5y0J5HZ6wYo3T.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (B+)",
  },
  {
    id: 22,
    nameUz: "Madraximov Dilshod Sa'dullayevich",
    nameRu: "Мадрахимов Дилшод Саъдуллаевич",
    nameEn: "Madraximov Dilshod Sa'dullayevich",
    positionUz: "Ingliz tili o'qituvchisi",
    positionRu: "Учитель английского языка",
    positionEn: "English Language Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madraximov%20Dilshod%20Sa%60dullayevich-8IcNnszs36jhfsTRsF1psGrkShO8Wi.jpg",
    category: "language",
    isQualified: true,
    qualification: "TEFL (C1)",
  },
  {
    id: 43,
    nameUz: "Matrasulova Ra'no Ruzmamatovna",
    nameRu: "Матрасулова Рано Рузмаматовна",
    nameEn: "Matrasulova Ra'no Ruzmamatovna",
    positionUz: "Informatika o'qituvchisi",
    positionRu: "Учитель информатики",
    positionEn: "Computer Science Teacher",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yakubova%20Dilnoza%20%20Ruzmatovna-5Y804zobEOYJfN7fUPDgemzb1vsvRA.jpg",
    category: "language",
    isQualified: true,
    qualification: "TKT (C1), IELTS (C1)",
  },
  {
    id: 38,
    nameUz: "Худайберганова Дилсўз",
    nameRu: "Худайберганова Дилсўз",
    nameEn: "Khudayberganova Dilsuz",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%A5%D1%83%D0%B4%D0%B0%D0%B9%D0%B1%D0%B5%D1%80%D0%B3%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%20%D0%94%D0%B8%D0%BB%D1%81%D1%9E%D0%B7-vtHZYwxjE0evNvMqAlG6a12t9ZyNic.jpg",
    category: "science",
    isQualified: true,
    qualification: "GRE (160), SAT (1060)",
  },
  {
    id: 25,
    nameUz: "Raximov Ulug'bek Amirbekovich",
    nameRu: "Рахимов Улугбек Амирбекович",
    nameEn: "Raximov Ulug'bek Amirbekovich",
    positionUz: "Ingliz tili o'qituvchisi",
    positionRu: "Учитель английского языка",
    positionEn: "English Language Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raximov%20Ulug%60bek%20%20Amirbekovich-LWtRfgZIcA1zSPZ75EBHGFZNYAE4oI.jpg",
    category: "language",
    isQualified: true,
    qualification: "CEFR (C1)",
  },
  {
    id: 44,
    nameUz: "Urinova Feruza Jumabayevna",
    nameRu: "Уринова Феруза Джумабаевна",
    nameEn: "Urinova Feruza Jumabayevna",
    positionUz: "Informatika o'qituvchisi",
    positionRu: "Учитель информатики",
    positionEn: "Computer Science Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Urinova%20Feruza%20%20Jumabayevna-3oGbPFV4cUSTZ8qeRrXDOorvOMFELR.jpg",
    category: "science",
    isQualified: true,
  },
  {
    id: 56,
    nameUz: "Xo'jayozova Dilnura G'apparganovna",
    nameRu: "Ходжаёзова Дилнура Гаппаргановна",
    nameEn: "Khojayozova Dilnura G'apparganovna",
    positionUz: "Biologiya o'qituvchisi",
    positionRu: "Учитель биологии",
    positionEn: "Biology Teacher",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Razzakov%20Javoxir-fsV7Ci8yL59SsK9FBsnzRLT6jigMc7.jpg",
    category: "science",
    isQualified: true,
    qualification: "SAT (1060), GMAT (Quantitative 49)",
  },
  {
    id: 6,
    nameUz: "Rajabov Alisher",
    nameRu: "Раджабов Алишер",
    nameEn: "Rajabov Alisher",
    positionUz: "ChQBT",
    positionRu: "Начальник отдела",
    positionEn: "Department Head",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rahimova%20Gulshan%20Kadambayevna-ThqEDI6y0Wv66gg8QSVcKdXeZ1hUOb.jpg",
    category: "language",
    isQualified: true,
    qualification: "Milliy (81.60%)",
  },
  {
    id: 33,
    nameUz: "Rajabov Madyor Egamberganovich",
    nameRu: "Раджабов Мадьор Егамбергенович",
    nameEn: "Rajabov Madyor Egamberganovich",
    positionUz: "Matematika o'qituvchisi",
    positionRu: "Учитель математики",
    positionEn: "Mathematics Teacher",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rajabov%20Madyor%20Egamberganovich-4auvnqpIxok51OQ7n4HD9NqOsgi8f2.jpg",
    category: "science",
    isQualified: true,
    qualification: "Milliy (B+)",
  },
]

export default function Staff() {
  const { language } = useLanguage()
  const [showAll, setShowAll] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const translations = {
    uz: {
      title: "Maktab Xodimlari",
      subtitle: "Malakali va tajribali pedagoglar jamoasi",
      administration: "Boshqaruv",
      language: "Til o'qituvchilari",
      science: "Fan o'qituvchilari",
      other: "Boshqa xodimlar",
      showMore: "Ko'proq ko'rish",
      showLess: "Yashirish",
    },
    ru: {
      title: "Сотрудники школы",
      subtitle: "Команда квалифицированных и опытных педагогов",
      administration: "Администрация",
      language: "Учителя иностранных языков",
      science: "Учителя естественных наук",
      other: "Другие сотрудники",
      showMore: "Показать больше",
      showLess: "Скрыть",
    },
    en: {
      title: "School Staff",
      subtitle: "Team of qualified and experienced educators",
      administration: "Administration",
      language: "Language Teachers",
      science: "Science Teachers",
      other: "Other Staff",
      showMore: "Show More",
      showLess: "Show Less",
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
    <section ref={sectionRef} id="staff" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {categoryOrder.map((category) => {
          const members = groupedStaff[category]
          if (!members || members.length === 0) return null

          const displayMembers = category === "administration" || showAll ? members : members.slice(0, 3)

          return (
            <div key={category} className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 pb-4 border-b-2 border-accent">
                {getCategoryLabel(category)}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className={`bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-500 delay-${index * 50} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
                            <div className="text-4xl text-yellow-500 mb-2">👤</div>
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
                        {member.qualification ? (
                          <span className="text-sm font-medium text-black">{member.qualification}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {category !== "administration" && members.length > 3 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {showAll ? t.showLess : t.showMore}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
