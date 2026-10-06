import type { Metadata } from "next"
import HomeClient from "./home-client"

export const metadata: Metadata = {
  title: "Urganch 1-son Ixtisoslashtirilgan Maktab-Internati | Bosh Sahifa",
  description:
    "Urganch shahar 1-son ixtisoslashtirilgan maktab-internati (Urganch 1-IMI). Kelajakni bugundan quradigan avlod. Aniq va tabiiy fanlar, olimpiada natijalari, 170.9 o'rtacha DTM balli va rasmiy qabul.",
}

export default function Home() {
  return <HomeClient />
}
