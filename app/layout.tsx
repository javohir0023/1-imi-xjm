import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.urganchimi.uz"),
  title: {
    default: "Urganch 1-son Ixtisoslashtirilgan Maktab-Internati | Rasmiy Veb-Sayt",
    template: "%s | Urganch 1-IMI",
  },
  description:
    "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tasarrufidagi Urganch shahar 1-son ixtisoslashtirilgan maktab-internati (Urganch 1-IMI). Aniq va tabiiy fanlar, xalqaro olimpiada yutuqlari, 170.9 o'rtacha DTM balli, nufuzli oliygohlar grantlari va rasmiy qabul ma'lumotlari.",
  keywords: [
    "Urganch 1-IMI",
    "Urganch 1-son ixtisoslashtirilgan maktab-internati",
    "Ixtisoslashtirilgan maktab Urganch",
    "Agentlik maktablari Xorazm",
    "Urganch IMI qabul 2026",
    "ariza piima uz",
    "urganchimi uz",
    "Maktab profili",
    "Maktab rejimi",
  ],
  authors: [{ name: "Javoxir Xajiboyev" }, { name: "Urganch 1-IMI" }],
  creator: "Javoxir Xajiboyev",
  publisher: "Ixtisoslashtirilgan ta'lim muassasalari agentligi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://www.urganchimi.uz/",
    title: "Urganch 1-son Ixtisoslashtirilgan Maktab-Internati | Urganch 1-IMI",
    description:
      "Kelajakni bugundan quradigan avlod. Aniq va tabiiy fanlar chuqurlashtirilgan davlat ixtisoslashtirilgan maktab-internati rasmiy portali.",
    siteName: "Urganch 1-IMI",
    images: [
      {
        url: "/images/photo-2025-10-24-21-21-29.jpg",
        width: 1200,
        height: 630,
        alt: "Urganch 1-son ixtisoslashtirilgan maktab-internati binosi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urganch 1-IMI | Rasmiy Veb-Sayt",
    description: "Aniq va tabiiy fanlar chuqurlashtirilgan davlat ixtisoslashtirilgan maktab-internati.",
    images: ["/images/photo-2025-10-24-21-21-29.jpg"],
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati",
    alternateName: "Urganch 1-IMI",
    url: "https://www.urganchimi.uz",
    logo: "https://www.urganchimi.uz/images/logo.jpg",
    description:
      "O'zbekiston Respublikasi Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimidagi aniq va tabiiy fanlar chuqurlashtirilgan davlat maktab-internati.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sheroziy ko'chasi, 2-uy",
      addressLocality: "Urganch shahar",
      addressRegion: "Xorazm viloyati",
      postalCode: "220100",
      addressCountry: "UZ",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+998622232031",
      contactType: "admissions",
      email: "gmail@urganchimi.uz",
      areaServed: "UZ",
      availableLanguage: ["Uzbek", "Russian", "English"],
    },
    sameAs: [
      "https://t.me/Urganch_IMI",
      "https://www.instagram.com/urganch_1imi",
      "https://www.facebook.com/groups/3274842216109794",
      "https://www.youtube.com/@Urganch_IMI",
    ],
  }

  return (
    <html lang="uz" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
