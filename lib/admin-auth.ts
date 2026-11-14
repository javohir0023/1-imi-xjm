import { createHmac, timingSafeEqual } from "crypto"
import type { NextRequest } from "next/server"

export const AUTH_COOKIE = "imi_admin_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 kun

export const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || ""
  const password = process.env.ADMIN_PASSWORD || ""
  return { username, password, configured: Boolean(username && password) }
}

// Sessiya imzosi uchun maxfiy kalit. ADMIN_SESSION_SECRET berilmasa, parol asosida olinadi.
function getSecret(): string {
  const { password } = getAdminCredentials()
  return process.env.ADMIN_SESSION_SECRET || `imi-session::${password}`
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex")
}

export function createSessionToken(username: string): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = `${username}.${exp}`
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token?: string | null): string | null {
  if (!token) return null
  const parts = token.split(".")
  if (parts.length < 3) return null
  const signature = parts.pop() as string
  const exp = Number(parts.pop())
  const username = parts.join(".")
  if (!username || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null

  const expected = sign(`${username}.${exp}`)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  return username
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export function getSessionUser(request: NextRequest): string | null {
  return verifySessionToken(request.cookies.get(AUTH_COOKIE)?.value)
}

export function isAuthorized(request: NextRequest): boolean {
  return getSessionUser(request) !== null
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS
