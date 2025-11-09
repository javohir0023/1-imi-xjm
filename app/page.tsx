import type { Metadata } from "next"
import HomeClient from "./home-client"

export const metadata: Metadata = {
  title: "Urganch 1st Specialized School-Boarding School (IMI) - Excellence in Education",
  description:
    "Urganch city 1st specialized school-boarding school under the Specialized Education Institutions Agency system. Providing quality education and professional development.",
  generator: "Xajiboyev Javoxir",
}

export default function Home() {
  return <HomeClient />
}
