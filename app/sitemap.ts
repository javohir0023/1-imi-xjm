import { MetadataRoute } from "next"
import { getInitialNews } from "@/lib/data/initial-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.urganchimi.uz"

  const routes = [
    "",
    "/school-profile",
    "/admissions",
    "/teachers",
    "/news",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  const newsItems = getInitialNews("published").map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: item.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...newsItems]
}
