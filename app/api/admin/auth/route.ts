import { type NextRequest, NextResponse } from "next/server"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "urganch1imi2026"
const AUTH_COOKIE = "imi_admin_session"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: "Tizimga muvaffaqiyatli kirildi" })
      // Set secure cookie
      response.cookies.set(AUTH_COOKIE, "authenticated_session_token_imi", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
      return response
    }

    return NextResponse.json(
      { success: false, message: "Login yoki parol noto'g'ri" },
      { status: 401 },
    )
  } catch {
    return NextResponse.json({ success: false, message: "Xatolik yuz berdi" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_COOKIE)
  if (cookie?.value === "authenticated_session_token_imi") {
    return NextResponse.json({ authenticated: true, username: ADMIN_USERNAME })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Tizimdan chiqildi" })
  response.cookies.delete(AUTH_COOKIE)
  return response
}
