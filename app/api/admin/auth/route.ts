import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "urganch1imi2026"
const AUTH_COOKIE = "imi_admin_session"

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json(
        { success: true, message: "Tizimga muvaffaqiyatli kirildi" },
        { headers: NO_CACHE_HEADERS },
      )
      
      const isHttps =
        request.headers.get("x-forwarded-proto") === "https" ||
        request.nextUrl.protocol === "https:"

      // Set cookie - only require secure if protocol is actual https
      response.cookies.set(AUTH_COOKIE, "authenticated_session_token_imi", {
        httpOnly: true,
        secure: isHttps,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
      return response
    }

    return NextResponse.json(
      { success: false, message: "Login yoki parol noto'g'ri" },
      { status: 401, headers: NO_CACHE_HEADERS },
    )
  } catch {
    return NextResponse.json(
      { success: false, message: "Xatolik yuz berdi" },
      { status: 500, headers: NO_CACHE_HEADERS },
    )
  }
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_COOKIE)
  if (cookie?.value === "authenticated_session_token_imi") {
    return NextResponse.json(
      { authenticated: true, username: ADMIN_USERNAME },
      { headers: NO_CACHE_HEADERS },
    )
  }
  return NextResponse.json(
    { authenticated: false },
    { status: 401, headers: NO_CACHE_HEADERS },
  )
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "Tizimdan chiqildi" },
    { headers: NO_CACHE_HEADERS },
  )
  response.cookies.delete(AUTH_COOKIE)
  return response
}
