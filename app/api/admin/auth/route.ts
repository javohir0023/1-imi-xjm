import { type NextRequest, NextResponse } from "next/server"
import {
  AUTH_COOKIE,
  NO_CACHE_HEADERS,
  SESSION_MAX_AGE,
  createSessionToken,
  getAdminCredentials,
  getSessionUser,
  safeEqual,
} from "@/lib/admin-auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const creds = getAdminCredentials()
    if (!creds.configured) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server sozlanmagan: Vercel'da ADMIN_USERNAME va ADMIN_PASSWORD muhit o'zgaruvchilarini kiriting va qayta deploy qiling.",
        },
        { status: 503, headers: NO_CACHE_HEADERS },
      )
    }

    const { username, password } = await request.json()
    const ok =
      typeof username === "string" &&
      typeof password === "string" &&
      safeEqual(username, creds.username) &&
      safeEqual(password, creds.password)

    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Login yoki parol noto'g'ri" },
        { status: 401, headers: NO_CACHE_HEADERS },
      )
    }

    const response = NextResponse.json(
      { success: true, message: "Tizimga muvaffaqiyatli kirildi" },
      { headers: NO_CACHE_HEADERS },
    )
    const isHttps =
      request.headers.get("x-forwarded-proto") === "https" || request.nextUrl.protocol === "https:"

    response.cookies.set(AUTH_COOKIE, createSessionToken(creds.username), {
      httpOnly: true,
      secure: isHttps,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    })
    return response
  } catch {
    return NextResponse.json(
      { success: false, message: "Xatolik yuz berdi" },
      { status: 500, headers: NO_CACHE_HEADERS },
    )
  }
}

export async function GET(request: NextRequest) {
  const user = getSessionUser(request)
  if (user) {
    return NextResponse.json({ authenticated: true, username: user }, { headers: NO_CACHE_HEADERS })
  }
  return NextResponse.json({ authenticated: false }, { status: 401, headers: NO_CACHE_HEADERS })
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "Tizimdan chiqildi" },
    { headers: NO_CACHE_HEADERS },
  )
  response.cookies.delete(AUTH_COOKIE)
  return response
}
