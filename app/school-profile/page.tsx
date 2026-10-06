"use client"

import { LanguageProvider, useLanguage } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Download,
  Building2,
  Users,
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  FileText,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react"

function SchoolProfileContent() {
  const { language } = useLanguage()

  const t = {
    uz: {
      badge: "Rasmiy Institutiv Ma'lumotnoma (Dossier)",
      title: "Urganch 1-IMI Rasmiy Maktab Profili",
      year: "2025–2026 O'quv Yili",
      downloadBtn: "Maktab profilini yuklab olish (PDF)",
      overviewTitle: "Maktab Haqida Umumiy Ma'lumot",
      overviewText:
        "O'zbekiston Respublikasi Prezidentining 2022-yildagi PF-269-sonli Farmoniga asosan tashkil etilgan. Maktabgacha va maktab ta'limi vazirligi huzuridagi Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimida faoliyat yuritadi. Aniq va tabiiy fanlar chuqurlashtirilgan davlat ta'lim maskani bo'lib, o'qish strictly merit-asosidagi imtihonlar orqali tanlanadi va 100% davlat granti asosida moliyalashtiriladi.",
      leadershipTitle: "Rahbariyat Tarkibi",
      missionTitle: "Ta'limiy Missiya va Qadriyatlar",
      missionText:
        "Ilm-fanni hayot bilan bog'laydigan, mustaqil va tanqidiy fikrlaydigan hamda O'zbekiston taraqqiyotiga hissa qo'shadigan intellektual yetakchilar avlodini tarbiyalash. Asosiy qadriyatlar: akademik yuksaklik, tashabbuskorlik, hamkorlik, o'zaro hurmat, minnatdorlik va shaffoflik.",
      campusTitle: "Kampus va Moddiy-Texnik Baza",
      campusText:
        "576 o'rinli zamonaviy kampus: 3 qavatli asosiy bino, matematika bloki, fizika, kimyo va biologiya laboratoriyalari, axborot-resurs markazi, sport zali va sun'iy qoplamali futbol maydoni, 2 navbatda ishlaydigan oshxona. 2027-yil kuzida zamonaviy yotoqxona binosi foydalanishga topshiriladi.",
      curriculumTitle: "O'quv Dasturi va Yo'nalishlar",
      curriculum5to7: "5–7-sinflar: Matematika, ingliz tili, rus tili, ona tili, adabiyot, integratsiyalashgan tabiiy fan (science), informatika, robototexnika, tarix.",
      curriculum8to11: "8–11-sinflar: Aniq fanlar (matematika, fizika) yoki tabiiy fanlar (biologiya, kimyo) yo'nalishlari bo'yicha oliygoh darajasiga tenglashtirilgan chuqurlashtirilgan dasturlar. Ingliz tili Cambridge rasmiy darsliklari asosida o'qitiladi.",
      academicMetricsTitle: "Akademik Ko'rsatkichlar & DTM Dinamikasi",
      dtmExplain: "Davlat test sinovlari (DTM) da maksimal 189 balldan:",
      dtm2023: "2023-yil: 123.0 ball",
      dtm2024: "2024-yil: 128.0 ball",
      dtm2025: "2025-yil: 158.7 ball",
      dtm2026: "2026-yil: 170.9 ball (Xorazm viloyati ixtisoslashtirilgan maktablari orasida 1-o'rin)",
      admissionsOutcomesTitle: "Universitetlarga Qabul Ko'rsatkichlari",
      destText: "Oliy ta'limga qabul darajasi 100%. 2026-yil bitiruvchilari xorijiy nufuzli universitetlardan jami $1,690,000 miqdorida grantlar yutib olgan.",
      universitiesList: "Manchester universiteti (QS 34), Harbin texnologiya instituti (QS 290), Michigan davlat universiteti, Penn State, Purdue, Middle East Technical University, Yangi O'zbekiston Universiteti.",
      olympiadTitle: "Xalqaro va Respublika Olimpiadalari",
      facultyTitle: "Pedagoglar Salohiyati",
      facultyText: "44 nafar o'qituvchi: 2 nafar fan doktori (PhD), 22 nafar magistr. O'qituvchilarning 95.4 foizi eng yuqori davlat toifasiga, 93.2 foizi o'z fanidan milliy/xalqaro sertifikatga ega.",
      contactTitle: "Rasmiy Aloqa Ma'lumotlari",
    },
    ru: {
      badge: "Официальный институциональный профиль (Dossier)",
      title: "Официальный профиль школы Урганч 1-ИМИ",
      year: "2025–2026 учебный год",
      downloadBtn: "Скачать профиль школы (PDF)",
      overviewTitle: "Общие сведения об учреждении",
      overviewText:
        "Создано Указом Президента Республики Узбекистан № УП-269 от 2022 года. Входит в систему Агентства специализированных образовательных учреждений при Министерстве дошкольного и школьного образования. Обучение осуществляется на конкурсной основе и полностью финансируется государством.",
      leadershipTitle: "Руководство школы",
      missionTitle: "Миссия и ценности",
      missionText:
        "Воспитание интеллектуальных лидеров, связывающих знания с практикой, мыслящих независимо и вносящих вклад в процветание Узбекистана.",
      campusTitle: "Кампус и инфраструктура",
      campusText:
        "Кампус на 576 мест: 3-этажный учебный корпус, блок математики, лаборатории физики, химии и биологии, информационно-ресурсный центр, спортзал и футбольное поле, столовая. Ввод нового общежития запланирован на осень 2027 года.",
      curriculumTitle: "Учебная программа и профили",
      curriculum5to7: "5–7 классы: математика, английский, русский, узбекский языки, литература, естественные науки, информатика, робототехника.",
      curriculum8to11: "8–11 классы: профилирование по точным (математика, физика) или естественным наукам (биология, химия) с программами университетского уровня.",
      academicMetricsTitle: "Академическая динамика и баллы DTM",
      dtmExplain: "Средний балл вступительных экзаменов DTM (из 189):",
      dtm2023: "2023 г.: 123.0",
      dtm2024: "2024 г.: 128.0",
      dtm2025: "2025 г.: 158.7",
      dtm2026: "2026 г.: 170.9 (1-е место в Хорезмской области)",
      admissionsOutcomesTitle: "Поступление выпускников в вузы",
      destText: "Поступление 100%. Выпускники 2026 года получили $1,690,000 зарубежных стипендий.",
      universitiesList: "University of Manchester (QS 34), Harbin Institute of Technology (QS 290), Michigan State, Penn State, Purdue, Университет Новый Узбекистан.",
      olympiadTitle: "Олимпиады и награды",
      facultyTitle: "Преподавательский потенциал",
      facultyText: "44 преподавателя: 2 PhD, 22 магистра. 95.4% имеют высшую квалификационную категорию.",
      contactTitle: "Контактная информация",
    },
    en: {
      badge: "Official Institutional Dossier",
      title: "Urganch 1-IMI Official School Profile",
      year: "Academic Year 2025–2026",
      downloadBtn: "Download School Profile (PDF)",
      overviewTitle: "Institutional Overview",
      overviewText:
        "Established in 2022 under Presidential Decree PF-269 within the national network of the Agency for Specialized Educational Institutions. The school delivers advanced education in the exact and natural sciences. Enrolment is strictly by competitive entrance examination, and instruction is fully state-funded.",
      leadershipTitle: "School Leadership",
      missionTitle: "Mission & Institutional Values",
      missionText:
        "To raise a generation of intellectual leaders who connect knowledge to life, think independently and critically, and contribute to Uzbekistan’s development. Core values: academic excellence, initiative, collaboration, mutual respect, gratitude, and transparency.",
      campusTitle: "Campus & Learning Facilities",
      campusText:
        "A 576-capacity campus encompassing a three-storey academic block, a dedicated mathematics wing, physics, science, and informatics rooms, a library resource centre, gym, pitch, and dining hall. A purpose-built dormitory completes in autumn 2027.",
      curriculumTitle: "Curriculum Pathways",
      curriculum5to7: "Grades 5–7: Mathematics, English, Russian, Uzbek language, literature, integrated science, informatics, history, robotics, art, and ethics.",
      curriculum8to11: "Grades 8–11: Exact Sciences (mathematics & physics) or Natural Sciences (biology & chemistry) at an introductory university depth. English instruction follows official Cambridge coursebooks.",
      academicMetricsTitle: "Academic Performance & DTM Progression",
      dtmExplain: "Mean State DTM score out of 189 maximum points:",
      dtm2023: "2023: 123.0",
      dtm2024: "2024: 128.0",
      dtm2025: "2025: 158.7",
      dtm2026: "2026: 170.9 (Highest among specialized schools in Khorezm)",
      admissionsOutcomesTitle: "University Placement Outcomes",
      destText: "100% university admission rate. Class of 2026 secured $1,690,000 in international scholarship offers, including 1 global top-20 and 2 top-100 offers.",
      universitiesList: "University of Manchester (QS 34), Harbin Institute of Technology (QS 290), Michigan State, Penn State, Purdue, Middle East Technical University, New Uzbekistan University.",
      olympiadTitle: "Olympiad & Competitive Honours",
      facultyTitle: "Faculty Credentials",
      facultyText: "44 faculty members: 2 PhDs, 22 master's degrees. 95.4% hold the highest state category, and 93.2% are certified in their subject.",
      contactTitle: "Official Institutional Contact",
    },
  }[language]

  return (
    <div className="bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C9A227] text-xs font-bold">
              <ShieldCheck size={14} />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.title}
            </h1>

            <p className="text-base text-slate-300 font-medium">
              {t.year} — Urganch shahar 1-son ixtisoslashtirilgan maktab-internati
            </p>

            {/* Prominent Working PDF Download Button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/urganch-1-imi-school-profile.pdf"
                download="urganch-1-imi-school-profile.pdf"
                className="px-6 py-3.5 bg-[#C9A227] hover:bg-[#d8b030] text-[#0B1F3A] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Download size={16} />
                <span>{t.downloadBtn}</span>
              </a>

              <a
                href="/urganch-1-imi-school-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <ExternalLink size={14} />
                <span>PDF Hujjatni ko'rish</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dossier Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Key Indicators Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-3xl font-extrabold text-[#C9A227]">170.9</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              O'rtacha DTM balli (2026, viloyat rekordi)
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-3xl font-extrabold text-[#0B1F3A] dark:text-white">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Universitetlarga qabul ko'rsatkichi
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-3xl font-extrabold text-[#C9A227]">$1.69M</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Xorijiy universitetlar grantlari (2026)
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-3xl font-extrabold text-[#0B1F3A] dark:text-white">103</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Fan olimpiadalari mukofotlari (4 yilda)
            </div>
          </div>
        </div>

        {/* Section: Overview & Decree */}
        <div className="p-8 sm:p-10 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A227]">
            <Building2 size={16} />
            <span>INSTITUTIV MAQOM</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] dark:text-white">
            {t.overviewTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.overviewText}
          </p>
        </div>

        {/* Section: Leadership */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
            <Users size={20} className="text-[#C9A227]" />
            <span>{t.leadershipTitle}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white">Axmedov G'ulomjon</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Jumanazarovich</div>
              <div className="mt-2 text-xs font-bold text-[#123B66] dark:text-blue-300">Maktab direktori</div>
              <div className="text-[11px] text-[#C9A227] font-semibold mt-1">Tarix fanlari doktori (PhD)</div>
            </div>

            <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white">Bekzod Bobojonov</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Farhodovich</div>
              <div className="mt-2 text-xs font-bold text-[#123B66] dark:text-blue-300">O'quv ishlari bo'yicha o'rinbosar</div>
              <div className="text-[11px] text-[#C9A227] font-semibold mt-1">Fizika fanlari magistri (MSc)</div>
            </div>

            <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white">Seytirzayeva Iroda</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Seytinazarovna</div>
              <div className="mt-2 text-xs font-bold text-[#123B66] dark:text-blue-300">Ma'naviy ishlar bo'yicha o'rinbosar</div>
              <div className="text-[11px] text-[#C9A227] font-semibold mt-1">Psixologiya magistri (MSc)</div>
            </div>

            <div className="p-6 bg-white dark:bg-[#0B1F3A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white">Quryazova Ruxsora</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Madamin qizi</div>
              <div className="mt-2 text-xs font-bold text-[#123B66] dark:text-blue-300">Maktab maslahatchisi</div>
              <div className="text-[11px] text-[#C9A227] font-semibold mt-1">Ingliz tili magistri (MA)</div>
            </div>
          </div>
        </div>

        {/* Section: Academic Progression & DTM Scores */}
        <div className="p-8 sm:p-10 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A227]">
            <Award size={16} />
            <span>AKADEMIK REZULTATLAR</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] dark:text-white">
            {t.academicMetricsTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.dtmExplain}</p>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-500">2023-yil</span>
              <div className="text-xl font-bold text-slate-700 dark:text-slate-300 mt-1">123.0</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-500">2024-yil</span>
              <div className="text-xl font-bold text-slate-700 dark:text-slate-300 mt-1">128.0</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-500">2025-yil</span>
              <div className="text-xl font-bold text-slate-700 dark:text-slate-300 mt-1">158.7</div>
            </div>
            <div className="p-4 rounded-xl bg-[#C9A227]/15 border-2 border-[#C9A227] text-center">
              <span className="text-xs font-bold text-[#0B1F3A] dark:text-[#C9A227]">2026-yil (Rekord)</span>
              <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-[#C9A227] mt-1">170.9</div>
            </div>
          </div>
        </div>

        {/* Section: University Placements & Abroad Scholarships */}
        <div className="p-8 sm:p-10 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A227]">
            <GraduationCap size={16} />
            <span>OLIYGOHLAR & GRANTLAR</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] dark:text-white">
            {t.admissionsOutcomesTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.destText}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <span className="font-bold text-[#0B1F3A] dark:text-white">Xorijiy nufuzli universitetlar: </span>
            {t.universitiesList}
          </div>
        </div>

        {/* Section: Olympiad Medals */}
        <div className="p-8 sm:p-10 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A227]">
            <Globe size={16} />
            <span>XALQARO OLIMPIADALAR</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] dark:text-white">
            {t.olympiadTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white mb-1">
                🥈 Xalqaro Kiberxavfsizlik Olimpiadasi (Tunis, 2026)
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                O'zbekiston terma jamoasi tarixidagi ilk medal — Kumush medal.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white mb-1">
                🥈 Al-Xorazmiy Xalqaro Matematika va Informatika Olimpiadasi
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                4-nashr xalqaro olimpiadasida kumush medal sohibi.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white mb-1">
                🥉 Xalqaro O'smirlar Ilmiy Olimpiadasi (IJSO — Biologiya, Ruminiya)
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                21-nashrda milliy terma jamoa tarkibida bronza medali.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white mb-1">
                🥉 Xalqaro Matematika Olimpiadasi (Ashxobod, Turkmaniston)
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                12 davlatdan 180 ishtirokchi orasida bronza medali.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Faculty */}
        <div className="p-8 sm:p-10 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A227]">
            <BookOpen size={16} />
            <span>PEDAGOGIK JAMOASI</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] dark:text-white">
            {t.facultyTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.facultyText}
          </p>
        </div>

        {/* Bottom PDF Download Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0B1F3A] text-white flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Rasmiy Maktab Profilini to'liq yuklab oling
            </h3>
            <p className="text-xs text-slate-300">
              Hujjat fayl nomi: <code className="bg-white/10 px-2 py-0.5 rounded text-[#C9A227]">urganch-1-imi-school-profile.pdf</code>
            </p>
          </div>
          <a
            href="/urganch-1-imi-school-profile.pdf"
            download="urganch-1-imi-school-profile.pdf"
            className="px-6 py-3.5 bg-[#C9A227] hover:bg-[#d8b030] text-[#0B1F3A] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <Download size={16} />
            <span>{t.downloadBtn}</span>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function SchoolProfilePage() {
  return (
    <LanguageProvider>
      <SchoolProfileContent />
    </LanguageProvider>
  )
}
