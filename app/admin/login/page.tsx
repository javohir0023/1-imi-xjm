"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.message || "Login yoki parol noto'g'ri")
        return
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setError("Aloqa xatoligi yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#071324] rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A227] mx-auto mb-3">
            <Image
              src="/images/logo.jpg"
              alt="Urganch 1-IMI Logo"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
            Urganch 1-IMI Admin Tizimi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Rasmiy veb-sayt boshqaruv va moderatsiya paneli
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Admin Logini
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Admin Paroli
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0B1F3A] hover:bg-[#123B66] text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Tekshirilmoqda..." : "Tizimga Kirish"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <a href="/" className="text-xs text-slate-500 hover:text-[#C9A227] transition-colors">
            ← Bosh sahifaga qaytish
          </a>
        </div>
      </div>
    </div>
  )
}
