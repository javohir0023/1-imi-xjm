import { type NextRequest, NextResponse } from "next/server"

/**
 * Server-side Telegram Image Proxy
 * Solves cross-origin and Referrer-Policy blocking from Telegram CDN (telesco.pe).
 * Caches image responses for fast subsequent loads.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get("url")

  if (!imageUrl) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  // Security check: only allow telegram CDN domains
  const allowed =
    imageUrl.startsWith("https://cdn") ||
    imageUrl.startsWith("https://telesco.pe") ||
    imageUrl.startsWith("https://telegram.org")

  if (!allowed) {
    return new NextResponse("Forbidden domain", { status: 403 })
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    })

    if (!response.ok) {
      // If telegram CDN fails, redirect to fallback local placeholder
      return NextResponse.redirect(new URL("/images/photo-2025-10-24-21-21-29.jpg", request.url))
    }

    const contentType = response.headers.get("content-type") || "image/jpeg"
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
      },
    })
  } catch (err: any) {
    console.error("[Telegram Image Proxy Error]:", err.message)
    return NextResponse.redirect(new URL("/images/photo-2025-10-24-21-21-29.jpg", request.url))
  }
}
