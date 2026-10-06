"use client"

import { useState, useEffect, useCallback } from "react"
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
  ExternalLink,
  LogOut,
  Send,
  ShieldCheck,
  Search,
  Check,
  Download,
  MessageSquare,
  Phone,
  Mail,
  Eye,
  Copy,
  Clock,
  Filter,
  X,
} from "lucide-react"
import { NewsItem, ApplicationItem, ContactMessageItem } from "@/lib/types"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"news" | "applications" | "settings">("news")
  const [applicationsSubTab, setApplicationsSubTab] = useState<"admissions" | "messages">("admissions")
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState<NewsItem[]>([])
  const [applications, setApplications] = useState<ApplicationItem[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>([])
  const [syncingTelegram, setSyncingTelegram] = useState(false)
  const [isRefreshingApps, setIsRefreshingApps] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  // Applications Filters & Search
  const [appSearch, setAppSearch] = useState("")
  const [appStatusFilter, setAppStatusFilter] = useState<string>("all")
  const [appGradeFilter, setAppGradeFilter] = useState<string>("all")

  // Modals for full details
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null)
  const [selectedMsg, setSelectedMsg] = useState<ContactMessageItem | null>(null)
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Fetch functions with cache busting
  const loadNews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/news", { cache: "no-store" })
      if (res.ok) {
        const d = await res.json()
        setNews(d.data || [])
      }
    } catch (err) {
      console.error("Failed to load news:", err)
    }
  }, [])

  const loadApplications = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsRefreshingApps(true)
    try {
      const res = await fetch("/api/admin/applications", { cache: "no-store" })
      if (res.ok) {
        const d = await res.json()
        setApplications(d.data || [])
      }
    } catch (err) {
      console.error("Failed to load applications:", err)
    } finally {
      if (showIndicator) setIsRefreshingApps(false)
    }
  }, [])

  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" })
      if (res.ok) {
        const d = await res.json()
        setContactMessages(d.data || [])
      }
    } catch (err) {
      console.error("Failed to load contact messages:", err)
    }
  }, [])

  // Check auth and initial load
  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch("/api/admin/auth", { cache: "no-store" })
        if (!authRes.ok) {
          router.push("/admin/login")
          return
        }

        await Promise.all([loadNews(), loadApplications(), loadMessages()])
      } catch (err) {
        console.error("Failed to init admin dashboard:", err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router, loadNews, loadApplications, loadMessages])

  // Periodic background auto-refresh every 25 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadApplications()
      loadMessages()
    }, 25000)
    return () => clearInterval(interval)
  }, [loadApplications, loadMessages])

  // Re-fetch immediately when entering applications tab
  useEffect(() => {
    if (activeTab === "applications") {
      loadApplications(true)
      loadMessages()
    }
  }, [activeTab, loadApplications, loadMessages])

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
      await loadNews()
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

  // Application Actions
  const handleUpdateAppStatus = async (id: string, status: ApplicationItem["status"]) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status })
        }
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
        if (selectedApp?.id === id) setSelectedApp(null)
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  // Contact Messages Actions
  const handleUpdateMsgStatus = async (id: string, status: ContactMessageItem["status"]) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
        if (selectedMsg && selectedMsg.id === id) {
          setSelectedMsg({ ...selectedMsg, status })
        }
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Ushbu xabarni o'chirishni tasdiqlaysizmi?")) return
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setContactMessages((prev) => prev.filter((m) => m.id !== id))
        if (selectedMsg?.id === id) setSelectedMsg(null)
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  // Export Applications to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert("Eksport qilish uchun arizalar mavjud emas.")
      return
    }

    const headers = ["O'quvchi F.I.Sh.", "Ota-onasi", "Telefon", "Sinf", "Hudud", "Holat", "Sana", "Izoh / Xabar"]
    const rows = applications.map((a) => [
      `"${a.studentName.replace(/"/g, '""')}"`,
      `"${(a.parentName || "").replace(/"/g, '""')}"`,
      `"${a.phone}"`,
      `"${a.grade}"`,
      `"${a.region}"`,
      `"${a.status}"`,
      `"${new Date(a.createdAt).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}"`,
      `"${(a.message || "").replace(/"/g, '""')}"`,
    ])

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `urganch-1-imi-qabul-arizalari-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyPhoneNumber = (phone: string) => {
    navigator.clipboard.writeText(phone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
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
  const newMessagesCount = contactMessages.filter((m) => m.status === "yangi").length
  const totalSubmissionsCount = newApplicationsCount + newMessagesCount

  // Filtered applications list
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      !appSearch ||
      app.studentName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.parentName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.phone.includes(appSearch) ||
      app.region.toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.message && app.message.toLowerCase().includes(appSearch.toLowerCase()))

    const matchesStatus = appStatusFilter === "all" || app.status === appStatusFilter
    const matchesGrade = appGradeFilter === "all" || app.grade === appGradeFilter

    return matchesSearch && matchesStatus && matchesGrade
  })

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071324] text-[#111827] dark:text-slate-100">
      {/* Top Admin Bar */}
      <header className="bg-[#0B1F3A] text-white border-b border-white/10 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A227] bg-white flex-shrink-0">
              <Image src="/images/logo.jpg" alt="Logo" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">Urganch 1-IMI — Boshqaruv Paneli</h1>
              <p className="text-[11px] text-slate-300">Sayt arizalari, xabarlari va Telegram moderatsiyasi</p>
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
          <div
            onClick={() => setActiveTab("news")}
            className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:border-[#C9A227] transition-colors"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Barcha Yangiliklar</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{news.length}</div>
            {pendingNewsCount > 0 ? (
              <div className="text-[11px] text-amber-600 font-bold mt-1">
                {pendingNewsCount} ta Telegram posti kutilmoqda
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 mt-1">Barchasi chop etilgan</div>
            )}
          </div>

          <div
            onClick={() => {
              setActiveTab("applications")
              setApplicationsSubTab("admissions")
            }}
            className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:border-[#C9A227] transition-colors"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Qabul Arizalari</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{applications.length}</div>
            {newApplicationsCount > 0 ? (
              <div className="text-[11px] text-emerald-600 font-bold mt-1">
                {newApplicationsCount} ta yangi ariza kelgan
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 mt-1">Barchasi ko'rib chiqilgan</div>
            )}
          </div>

          <div
            onClick={() => {
              setActiveTab("applications")
              setApplicationsSubTab("messages")
            }}
            className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:border-[#C9A227] transition-colors"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sayt Murojaatlari / Aloqa</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{contactMessages.length}</div>
            {newMessagesCount > 0 ? (
              <div className="text-[11px] text-sky-600 font-bold mt-1">
                {newMessagesCount} ta yangi murojaat
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 mt-1">Yangi xabarlar yo'q</div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avtomatik Yangilanish</div>
            <div className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Faol (har 25 soniyada)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Yangi arizalar darhol chiqadi</div>
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
            <span>Yangiliklar & Telegram</span>
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
            <span>Arizalar & Murojaatlar</span>
            {totalSubmissionsCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] bg-emerald-500 text-white rounded-full">
                {totalSubmissionsCount}
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

        {/* TAB 2: APPLICATIONS & MESSAGES */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            {/* Sub-tab selection and actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0B1F3A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-[#0B1F3A] dark:text-white mb-1">
                  Saytdan Kelib Tushgan Arizalar va Murojaatlar
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Foydalanuvchilar tomonidan veb-sayt orqali jo'natilgan barcha qabul arizalari va murojaat xabarlari.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Refresh button */}
                <button
                  onClick={() => {
                    loadApplications(true)
                    loadMessages()
                  }}
                  disabled={isRefreshingApps}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                  title="Arizalarni yangilash"
                >
                  <RefreshCw size={14} className={isRefreshingApps ? "animate-spin text-[#C9A227]" : ""} />
                  <span>{isRefreshingApps ? "Yangilanmoqda..." : "Yangilash"}</span>
                </button>

                {/* CSV Export button */}
                {applicationsSubTab === "admissions" && (
                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    title="Excel (CSV) formatda yuklab olish"
                  >
                    <Download size={14} />
                    <span>CSV ga yuklash</span>
                  </button>
                )}
              </div>
            </div>

            {/* Sub-tab toggle pills */}
            <div className="flex gap-2">
              <button
                onClick={() => setApplicationsSubTab("admissions")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  applicationsSubTab === "admissions"
                    ? "bg-[#0B1F3A] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] shadow-xs"
                    : "bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                }`}
              >
                <FileCheck2 size={14} />
                <span>Qabul Arizalari ({applications.length})</span>
                {newApplicationsCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[10px] rounded-full">
                    {newApplicationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setApplicationsSubTab("messages")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  applicationsSubTab === "messages"
                    ? "bg-[#0B1F3A] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A] shadow-xs"
                    : "bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                }`}
              >
                <MessageSquare size={14} />
                <span>Sayt Murojaatlari / Aloqa ({contactMessages.length})</span>
                {newMessagesCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-sky-500 text-white text-[10px] rounded-full">
                    {newMessagesCount}
                  </span>
                )}
              </button>
            </div>

            {/* SUB-TAB 1: ADMISSIONS APPLICATIONS */}
            {applicationsSubTab === "admissions" && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="bg-white dark:bg-[#0B1F3A] p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 items-center justify-between">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="O'quvchi, ota-ona, telefon yoki hudud bo'yicha qidirish..."
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={appStatusFilter}
                      onChange={(e) => setAppStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      <option value="all">Barcha holatlar</option>
                      <option value="yangi">Yangi</option>
                      <option value="korib_chiqilmoqda">Ko'rib chiqilmoqda</option>
                      <option value="qabul_qilindi">Qabul qilindi</option>
                      <option value="rad_etildi">Rad etildi</option>
                    </select>

                    <select
                      value={appGradeFilter}
                      onChange={(e) => setAppGradeFilter(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      <option value="all">Barcha sinflar</option>
                      <option value="5-sinf">5-sinf</option>
                      <option value="6-sinf">6-sinf</option>
                      <option value="7-sinf">7-sinf</option>
                      <option value="8-sinf">8-sinf</option>
                      <option value="9-sinf">9-sinf</option>
                      <option value="10-sinf">10-sinf</option>
                      <option value="11-sinf">11-sinf</option>
                    </select>
                  </div>
                </div>

                {filteredApplications.length === 0 ? (
                  <div className="p-16 text-center bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs space-y-2">
                    <p className="font-bold text-sm text-slate-500">Arizalar topilmadi</p>
                    <p>Hozircha qidiruv shartlariga mos qabul arizalari mavjud emas.</p>
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
                          <th className="py-3 px-4">Sana</th>
                          <th className="py-3 px-4">Holat</th>
                          <th className="py-3 px-4 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredApplications.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-bold text-[#0B1F3A] dark:text-white">{app.studentName}</div>
                              {app.message && (
                                <div className="text-[11px] text-slate-400 line-clamp-1 italic max-w-[200px]">
                                  "{app.message}"
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                              {app.parentName || "—"}
                            </td>
                            <td className="py-3 px-4">
                              <a
                                href={`tel:${app.phone.replace(/\s+/g, "")}`}
                                className="font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                              >
                                <Phone size={11} />
                                <span>{app.phone}</span>
                              </a>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold">
                                {app.grade}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{app.region}</td>
                            <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                              {new Date(app.createdAt).toLocaleString("uz-UZ", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as any)}
                                className={`rounded px-2 py-1 text-[11px] font-bold border ${
                                  app.status === "yangi"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300"
                                    : app.status === "korib_chiqilmoqda"
                                    ? "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300"
                                    : app.status === "qabul_qilindi"
                                    ? "bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300"
                                    : "bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300"
                                }`}
                              >
                                <option value="yangi">Yangi</option>
                                <option value="korib_chiqilmoqda">Ko'rib chiqilmoqda</option>
                                <option value="qabul_qilindi">Qabul qilindi</option>
                                <option value="rad_etildi">Rad etildi</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setSelectedApp(app)}
                                  className="p-1.5 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950 rounded"
                                  title="Batafsil ko'rish"
                                >
                                  <Eye size={15} />
                                </button>
                                <button
                                  onClick={() => handleDeleteApplication(app.id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded"
                                  title="O'chirish"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SUB-TAB 2: CONTACT MESSAGES */}
            {applicationsSubTab === "messages" && (
              <div className="space-y-4">
                {contactMessages.length === 0 ? (
                  <div className="p-16 text-center bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs space-y-2">
                    <p className="font-bold text-sm text-slate-500">Murojaatlar mavjud emas</p>
                    <p>Hozircha saytdagi "Aloqa / Xabar Yuborish" bo'limi orqali xabarlar kelib tushmagan.</p>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold">
                        <tr>
                          <th className="py-3 px-4">Yuboruvchi F.I.Sh.</th>
                          <th className="py-3 px-4">Aloqa</th>
                          <th className="py-3 px-4">Mavzu</th>
                          <th className="py-3 px-4">Xabar matni</th>
                          <th className="py-3 px-4">Sana</th>
                          <th className="py-3 px-4">Holat</th>
                          <th className="py-3 px-4 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {contactMessages.map((msg) => (
                          <tr key={msg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-4 font-bold text-[#0B1F3A] dark:text-white">
                              {msg.name}
                            </td>
                            <td className="py-3 px-4 space-y-0.5">
                              {msg.email && (
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                                >
                                  <Mail size={11} />
                                  <span>{msg.email}</span>
                                </a>
                              )}
                              {msg.phone && (
                                <a
                                  href={`tel:${msg.phone}`}
                                  className="text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-1 font-mono text-[11px]"
                                >
                                  <Phone size={11} />
                                  <span>{msg.phone}</span>
                                </a>
                              )}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">
                              {msg.subject || "Mavzusi yo'q"}
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                              {msg.message}
                            </td>
                            <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                              {new Date(msg.createdAt).toLocaleString("uz-UZ", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={msg.status}
                                onChange={(e) => handleUpdateMsgStatus(msg.id, e.target.value as any)}
                                className={`rounded px-2 py-1 text-[11px] font-bold border ${
                                  msg.status === "yangi"
                                    ? "bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950 dark:text-sky-300"
                                    : msg.status === "oqildi"
                                    ? "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300"
                                    : "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300"
                                }`}
                              >
                                <option value="yangi">Yangi</option>
                                <option value="oqildi">O'qildi</option>
                                <option value="javob_berildi">Javob berildi</option>
                                <option value="arxiv">Arxiv</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setSelectedMsg(msg)}
                                  className="p-1.5 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950 rounded"
                                  title="Xabarni to'liq o'qish"
                                >
                                  <Eye size={15} />
                                </button>
                                <button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded"
                                  title="O'chirish"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                Arizalar va saytdan xabarlar kelib tushganda admin Telegram guruhiga darhol xabarnoma yuboriladi. Yangiliklar esa @Urganch_IMI kanalidan tortib olinadi.
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

      {/* DETAIL MODAL: ADMISSION APPLICATION */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1F3A] max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                  Qabul Arizasi Tafsilotlari
                </span>
                <h3 className="text-base font-extrabold text-[#0B1F3A] dark:text-white mt-0.5">
                  {selectedApp.studentName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Ota-onasi:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedApp.parentName || "Ko'rsatilmagan"}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Telefon raqami:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedApp.phone.replace(/\s+/g, "")}`}
                    className="font-mono font-bold text-blue-600 hover:underline"
                  >
                    {selectedApp.phone}
                  </a>
                  <button
                    onClick={() => copyPhoneNumber(selectedApp.phone)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Nusxalash"
                  >
                    {copiedPhone ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Topshirayotgan sinf:</span>
                <span className="font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  {selectedApp.grade}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Yashash hududi:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedApp.region}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block mb-0.5">Yuborilgan sana va vaqt:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {new Date(selectedApp.createdAt).toLocaleString("uz-UZ", {
                    timeZone: "Asia/Tashkent",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Ariza matni / Izoh */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Qo'shimcha izoh / Ariza matni:
              </span>
              <div className="p-3.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap min-h-[70px]">
                {selectedApp.message ? selectedApp.message : <i className="text-slate-400">Izoh qoldirilmagan.</i>}
              </div>
            </div>

            {/* Status change in modal */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Holatni o'zgartirish:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleUpdateAppStatus(selectedApp.id, e.target.value as any)}
                  className="bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold"
                >
                  <option value="yangi">Yangi</option>
                  <option value="korib_chiqilmoqda">Ko'rib chiqilmoqda</option>
                  <option value="qabul_qilindi">Qabul qilindi</option>
                  <option value="rad_etildi">Rad etildi</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-lg"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL: CONTACT MESSAGE */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1F3A] max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                  Saytdan Kelgan Murojaat
                </span>
                <h3 className="text-base font-extrabold text-[#0B1F3A] dark:text-white mt-0.5">
                  {selectedMsg.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Elektron pochta:</span>
                {selectedMsg.email ? (
                  <a href={`mailto:${selectedMsg.email}`} className="font-bold text-blue-600 hover:underline">
                    {selectedMsg.email}
                  </a>
                ) : (
                  <span>—</span>
                )}
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Mavzu:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedMsg.subject || "Ko'rsatilmagan"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block mb-0.5">Yuborilgan sana:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {new Date(selectedMsg.createdAt).toLocaleString("uz-UZ", {
                    timeZone: "Asia/Tashkent",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Xabar matni */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Murojaat / Xabar matni:
              </span>
              <div className="p-3.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap min-h-[90px]">
                {selectedMsg.message}
              </div>
            </div>

            {/* Status change in modal */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Holat:</span>
                <select
                  value={selectedMsg.status}
                  onChange={(e) => handleUpdateMsgStatus(selectedMsg.id, e.target.value as any)}
                  className="bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold"
                >
                  <option value="yangi">Yangi</option>
                  <option value="oqildi">O'qildi</option>
                  <option value="javob_berildi">Javob berildi</option>
                  <option value="arxiv">Arxiv</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedMsg(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-lg"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
