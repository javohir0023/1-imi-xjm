# Urganch shahar 1-son Ixtisoslashtirilgan Maktab-Internati (Urganch 1-IMI)

O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimidagi Urganch 1-son ixtisoslashtirilgan maktab-internatining rasmiy veb-sayti va admin boshqaruv tizimi.

**Sayt Asoschisi / Dasturchi:** Javoxir Xajiboyev

## 🚀 Texnologiyalar

- **Framework:** Next.js (App Router)
- **UI & Dizayn:** React, Tailwind CSS, Lucide Icons, Radix UI
- **Backend & Ma'lumotlar:** Next.js Route Handlers, JSON DB (`lib/data/db.json`)
- **Integratsiya:** Telegram Bot API (avtomatik arizalar va yangiliklar sinxronizatsiyasi)
- **Tillar:** O'zbekcha (UZ), Ruscha (RU), Inglizcha (EN)

---

## 🛠 O'rnatish va Ishga tushirish

### 1. Bog'liqliklarni o'rnatish:
```bash
npm install
```

### 2. Muhit o'zgaruvchilari (.env.local):
`.env.example` faylidan nusxa oling:
```bash
cp .env.example .env.local
```
Kerakli parametrlarni sozlang:
- `ADMIN_USERNAME`: Admin login (standart: `admin`)
- `ADMIN_PASSWORD`: Admin paroli (standart: `urganch1imi2026`)
- `TELEGRAM_BOT_TOKEN`: Telegram bot tokeni (ixtiyoriy)
- `TELEGRAM_ADMIN_CHAT_ID`: Admin chat/guruh ID (ixtiyoriy)

### 3. Dasturni ishga tushirish (Development):
```bash
npm run dev
```
Brauzerda [http://localhost:3000](http://localhost:3000) manzilini oching.

### 4. Ishchi (Production) rejimda qurish va ishga tushirish:
```bash
npm run build
npm start
```

---

## 🔐 Admin Paneli

- **Manzil:** `/admin` yoki `/admin/login`
- **Standart login:** `admin`
- **Standart parol:** `urganch1imi2026`

Admin panelida mavjud imkoniyatlar:
- **Qabul arizalari:** Saytdan kelgan barcha arizalarni ko'rish, holatini o'zgartirish (Yangi, Ko'rib chiqilmoqda, Qabul qilindi, Rad etildi), o'chirish.
- **Ariza matni va sanasi:** Har bir arizaning batafsil izohini modal oynada to'liq ko'rish.
- **Murojaatlar / Aloqa:** Aloqa formasi orqali yuborilgan xabarlarni boshqarish.
- **CSV eksport:** Arizalar ro'yxatini Excel/CSV formatida bitta tugma bilan yuklab olish.
- **Telegram moderatsiyasi:** Rasmiy kanaldan postlarni yuklab olib, tasdiqlash yoki o'chirish.

---

## 📁 Loyiha Strukturasi

```text
├── app/                  # Next.js App Router sahifalari va API yo'nalishlari
│   ├── admin/            # Admin paneli va login sahifasi
│   ├── admissions/       # Qabul va ariza topshirish sahifasi
│   ├── api/              # Backend API marshrutlari (applications, contact, auth, news)
│   ├── news/             # Yangiliklar sahifasi
│   ├── school-profile/   # Maktab pasporti va profili
│   ├── teachers/         # O'qituvchilar sahifasi
│   └── page.tsx          # Bosh sahifa
├── components/           # UI komponentlari (Hero, Header, Admissions, Contact, va h.k.)
├── lib/                  # Ma'lumotlar bazasi, turlar (TypeScript), kontekst va yordamchi funksiyalar
│   ├── data/             # Boshlang'ich ma'lumotlar va db.json
│   ├── db.ts             # Ma'lumotlar bazasi boshqaruvi
│   └── types.ts          # TypeScript interfeyslari
└── public/               # Rasmlar, hujjatlar va statik resurslar
```
