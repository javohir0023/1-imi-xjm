# Urganch shahar 1-son Ixtisoslashtirilgan Maktab-Internati (Urganch 1-IMI)

O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimidagi Urganch 1-son ixtisoslashtirilgan maktab-internatining rasmiy veb-sayti va admin boshqaruv tizimi.

**Sayt Asoschisi / Dasturchi:** Javoxir Xajiboyev

## 🚀 Texnologiyalar

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI & Dizayn:** React, Tailwind CSS, Lucide Icons, Radix UI (Premium Academic Palette)
- **Ma'lumotlar bazasi:** Next.js Route Handlers, JSON DB (`lib/data/db.json`, `certificates.json`, `teachers.json`)
- **Sertifikatlar arxivi:** 674 ta tasdiqlangan milliy va xalqaro sertifikatlar (0 ta dublikat, tozalangan)
- **Telegram integratsiyasi:** Server-side Public Preview (`https://t.me/s/Urganch_IMI`) avtomatik yangiliklar sinxronizatsiyasi
- **Video taqdimot:** Rasmiy video taqdimot (`maktab video.mp4` va YouTube Full HD integratsiyasi)
- **O'qituvchilar:** 79 nafar tasdiqlangan pedagoglar tarkibi (Quryazova Ruxsora - MMIBDO')
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
- `ADMIN_PASSWORD`: Admin paroli (majburiy, standart parol yo'q)
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
- **Login/parol:** `ADMIN_USERNAME` va `ADMIN_PASSWORD` muhit o'zgaruvchilarida belgilanadi.

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


---

## ☁️ Vercel'ga joylash (arizalar admin panelda ko'rinishi uchun)

Vercel'da fayl tizimi faqat o'qish uchun, shuning uchun arizalar **Supabase** bazasida saqlanadi.

1. [supabase.com](https://supabase.com) da bepul loyiha oching.
2. **SQL Editor** ga `supabase/schema.sql` faylidagi kodni qo'yib **Run** bosing.
3. **Project Settings → API** dan `Project URL` va `service_role` kalitini oling.
4. Vercel → **Settings → Environment Variables** ga kiriting:
   `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   (ixtiyoriy: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ADMIN_CHAT_ID`).
5. **Deployments → Redeploy** qiling.
6. `/admin/login` ga kiring; saytdan ariza yuboring — u **Qabul arizalari** bo'limida paydo bo'ladi.

> Yangiliklar, o'qituvchilar va sertifikatlar `lib/data/*.json` fayllaridan o'qiladi. Ularni Vercel'da admin paneldan o'zgartirib bo'lmaydi (xabar chiqadi) — fayllarni GitHub'da yangilang.
