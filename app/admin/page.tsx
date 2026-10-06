"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Newspaper,
  Users,
  FileCheck2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Send,
  Plus,
  ShieldCheck,
  Search,
  Filter,
  Check,
  Download,
} from "lucide-react"
import { NewsItem, ApplicationItem, TeacherItem } from "@/lib/types"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"news" | "applications" | "teachers" | "settings">("news")
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState<NewsItem[]>([])
  const [applications, setApplications] = useState<ApplicationItem[]>([])
  const [teachers, setTeachers] = useState<TeacherItem[]>([])
  const [syncingTelegram, setSyncingTelegram] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  // Check auth and load data
  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch("/api/admin/auth")
        if (!authRes.ok) {
          router.push("/admin/login")
          return
        }

        // Fetch news
        const newsRes = await fetch("/api/admin/news")
        if (newsRes.ok) {
          const data = await newsRes.json()
          setNews(data.data || [])
        }

        // Fetch applications
        const appRes = await fetch("/api/admin/applications")
        if (appRes.ok) {
          const data = await appRes.json()
          setApplications(data.data || [])
        }
      } catch (err) {
        console.error("Failed to load admin data:", err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
  }

  // Telegram Sync
  const handleSyncTelegram = async () => {
    setSyncingTelegram(true)
    setStatusMessage("")
    try {
      const res = await fetch("/api/telegram/sync", { method: "POST" })
      const data = await res.json()
      setStatusMessage(data.message)

      // Refresh news list
      const newsRes = await fetch("/api/admin/news")
      if (newsRes.ok) {
        const d = await newsRes.json()
        setNews(d.data || [])
      }
    } catch {
      setStatusMessage("Telegram bilan bog'lanishda xatolik yuz berdi")
    } finally {
      setSyncingTelegram(false)
    }
  }

  // News Actions
  const handleApproveNews = async (item: NewsItem) => {
    const updated: NewsItem = { ...item, status: "published" }
    try {
      const res = await fetch("/api/admin/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      })
      if (res.ok) {
        setNews((prev) => prev.map((n) => (n.id === item.id ? updated : n)))
        setStatusMessage(`"${item.title.uz.slice(0, 30)}..." maqolasi chop etildi!`)
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Haqiqatan ham bu yangilikni o'chirmoqchimisiz?")) return
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setNews((prev) => prev.filter((n) => n.id !== id))
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  // Application Status Update
  const handleUpdateAppStatus = async (id: string, status: ApplicationItem["status"]) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Arizani o'chirishni tasdiqlaysizmi?")) return
    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id))
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071324] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#0B1F3A] border-t-[#C9A227] rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Admin paneli yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  const pendingNewsCount = news.filter((n) => n.status === "pending").length
  const newApplicationsCount = applications.filter((a) => a.status === "yangi").length

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100">
      {/* Top Admin Bar */}
      <header className="bg-[#0B1F3A] text-white border-b border-white/10 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A227] bg-white">
              <Image src="/images/logo.jpg" alt="Logo" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">Urganch 1-IMI — Boshqaruv Paneli</h1>
              <p className="text-[11px] text-slate-300">Sayt va Telegram kontent moderatsiyasi</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium"
            >
              <span>Saytni ko'rish</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors flex items-center gap-1.5 text-red-300 hover:text-red-200"
            >
              <LogOut size={13} />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Barcha Yangiliklar</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{news.length}</div>
            {pendingNewsCount > 0 && (
              <div className="text-[11px] text-amber-600 font-bold mt-1">
                {pendingNewsCount} ta Telegram posti kutilmoqda
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Qabul Arizalari</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{applications.length}</div>
            {newApplicationsCount > 0 && (
              <div className="text-[11px] text-emerald-600 font-bold mt-1">
                {newApplicationsCount} ta yangi ariza
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Telegram Kanali</div>
            <div className="text-sm font-bold text-[#0B1F3A] dark:text-[#C9A227] mt-2 flex items-center gap-1">
              <Send size={14} />
              <span>@Urganch_IMI</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Avtomatik import faol</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Maktab Profili PDF</div>
            <div className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle size={14} />
              <span>Tayyor (10.6 MB)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">urganch-1-imi-school-profile.pdf</div>
          </div>
        </div>

        {/* Global Action Message */}
        {statusMessage && (
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs font-semibold flex items-center justify-between">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage("")} className="text-blue-500 hover:text-blue-700">✕</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab("news")}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "news"
                ? "border-[#0B1F3A] text-[#0B1F3A] dark:border-[#C9A227] dark:text-[#C9A227]"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <Newspaper size={16} />
            <span>Yangiliklar & Telegram Moderatsiyasi</span>
            {pendingNewsCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] bg-amber-500 text-white rounded-full">
                {pendingNewsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "applications"
                ? "border-[#0B1F3A] text-[#0B1F3A] dark:border-[#C9A227] dark:text-[#C9A227]"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <FileCheck2 size={16} />
            <span>Qabul Arizalari</span>
            {newApplicationsCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] bg-emerald-500 text-white rounded-full">
                {newApplicationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-[#0B1F3A] text-[#0B1F3A] dark:border-[#C9A227] dark:text-[#C9A227]"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <ShieldCheck size={16} />
            <span>Tizim & Integratsiya Holati</span>
          </button>
        </div>

        {/* TAB 1: NEWS & TELEGRAM MODERATION */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0B1F3A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-base font-bold text-[#0B1F3A] dark:text-white">
                  Telegram Postlari Moderatsiyasi
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Rasmiy kanaldan kelgan postlar kutilmoqda (pending) holatida saqlanadi. Admin tekshirgach saytga chiqadi.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSyncTelegram}
                  disabled={syncingTelegram}
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
                >
                  <RefreshCw size={14} className={syncingTelegram ? "animate-spin" : ""} />
                  <span>{syncingTelegram ? "Sinxronlanmoqda..." : "Telegramdan Postlarni Yuklash"}</span>
                </button>
              </div>
            </div>

            {/* News Items Table / List */}
            <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {news.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            item.status === "published"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          }`}
                        >
                          {item.status === "published" ? "Chop etilgan" : "Kutilmoqda (Pending)"}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(item.publishedAt).toLocaleDateString("uz-UZ")}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0B1F3A] dark:text-white leading-snug">
                        {item.title.uz}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.excerpt.uz}
                      </p>

                      {item.telegramPostUrl && (
                        <a
                          href={item.telegramPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-sky-600 hover:underline font-medium"
                        >
                          <Send size={10} />
                          <span>Telegram aslini ko'rish</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                      {item.status === "pending" && (
                        <button
                          onClick={() => handleApproveNews(item)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Check size={14} />
                          <span>Tasdiqlash & Chop etish</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0B1F3A] dark:text-white mb-1">
                Qabul Komissiyasiga Tushgan Arizalar
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                O'quvchi va ota-onalar tomonidan rasmiy veb-sayt orqali yuborilgan arizalar ro'yxati.
              </p>
            </div>

            {applications.length === 0 ? (
              <div className="p-16 text-center bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                Hozircha yangi arizalar kelib tushmagan.
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold">
                    <tr>
                      <th className="py-3 px-4">O'quvchi F.I.Sh.</th>
                      <th className="py-3 px-4">Ota-onasi</th>
                      <th className="py-3 px-4">Telefon</th>
                      <th className="py-3 px-4">Sinf</th>
                      <th className="py-3 px-4">Hudud</th>
                      <th className="py-3 px-4">Holat</th>
                      <th className="py-3 px-4 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-bold text-[#0B1F3A] dark:text-white">{app.studentName}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{app.parentName}</td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-slate-100">{app.phone}</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold">{app.grade}</span></td>
                        <td className="py-3 px-4 text-slate-500">{app.region}</td>
                        <td className="py-3 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as any)}
                            className="bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-[11px] font-bold"
                          >
                            <option value="yangi">Yangi</option>
                            <option value="korib_chiqilmoqda">Ko'rib chiqilmoqda</option>
                            <option value="qabul_qilindi">Qabul qilindi</option>
                            <option value="rad_etildi">Rad etildi</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteApplication(app.id)}
                            className="p-1.5 text-red-500 hover:text-red-700"
                            title="O'chirish"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SETTINGS & INTEGRATIONS */}
        {activeTab === "settings" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Send size={18} className="text-sky-500" />
                <span>Telegram Bot Integratsiyasi</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Arizalar kelib tushganda admin Telegram guruhiga darhol xabarnoma yuboriladi. Yangiliklar @Urganch_IMI kanalidan tortib olinadi.
              </p>
              <div className="space-y-2 text-xs font-mono bg-slate-50 dark:bg-[#071324] p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>TELEGRAM_CHANNEL_ID: @Urganch_IMI</div>
                <div>TELEGRAM_BOT_TOKEN: [Server muhitida saqlanadi]</div>
                <div>TELEGRAM_ADMIN_CHAT_ID: [Server muhitida saqlanadi]</div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Download size={18} className="text-[#C9A227]" />
                <span>Maktab Profili PDF Hujjati</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rasmiy 2025–2026 Maktab Profili hujjati serverda mavjud va foydalanuvchilar yuklab olishi uchun tayyor.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300">Fayl: urganch-1-imi-school-profile.pdf</div>
                <div className="text-slate-500 mt-1">Hajmi: 10.6 MB (Asl rasmiy nusxa)</div>
                <div className="mt-3">
                  <a
                    href="/urganch-1-imi-school-profile.pdf"
                    target="_blank"
                    className="text-[#C9A227] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>Faylni ochib ko'rish</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
