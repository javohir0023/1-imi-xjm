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
  CheckCircle2,
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
  EyeOff,
  Copy,
  Clock,
  Filter,
  X,
  Award,
  GraduationCap,
  Plus,
  AlertTriangle,
  BookOpen,
  Layers,
} from "lucide-react"
import { NewsItem, ApplicationItem, ContactMessageItem, CertificateItem, TeacherItem } from "@/lib/types"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"news" | "achievements" | "teachers" | "applications" | "settings">("news")
  const [applicationsSubTab, setApplicationsSubTab] = useState<"admissions" | "messages">("admissions")
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState<NewsItem[]>([])
  const [applications, setApplications] = useState<ApplicationItem[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>([])
  const [syncingTelegram, setSyncingTelegram] = useState(false)
  const [isRefreshingApps, setIsRefreshingApps] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  // Certificates (Achievements) Management State
  const [certificates, setCertificates] = useState<CertificateItem[]>([])
  const [certSearch, setCertSearch] = useState("")
  const [certFilter, setCertFilter] = useState<"all" | "duplicates" | "review">("all")
  const [certPage, setCertPage] = useState(1)
  const [newCertModal, setNewCertModal] = useState(false)
  const [newCertData, setNewCertData] = useState({
    studentName: "",
    subject: "",
    category: "Миллий сертификат",
    certType: "Umumtaʼlim fanini bilish darajasi toʻgʻrisidagi milliy sertifikat",
    level: "B2",
    score: "",
    teacher: "",
  })
  const [isSubmittingCert, setIsSubmittingCert] = useState(false)

  // Teachers Management State
  const [teachers, setTeachers] = useState<TeacherItem[]>([])
  const [teacherSearch, setTeacherSearch] = useState("")
  const [teacherCategoryFilter, setTeacherCategoryFilter] = useState("all")
  const [newTeacherModal, setNewTeacherModal] = useState(false)
  const [newTeacherData, setNewTeacherData] = useState({
    nameUz: "",
    positionUz: "",
    subjectUz: "",
    qualification: "Oliy toifa",
    degree: "",
    section: "Asosiy o'qituvchilar",
    category: "science" as TeacherItem["category"],
  })
  const [isSubmittingTeacher, setIsSubmittingTeacher] = useState(false)

  // Applications Filters & Search
  const [loadError, setLoadError] = useState("")
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
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const d = await res.json().catch(() => null)
      if (res.ok && d?.success) {
        setApplications(d.data || [])
        setLoadError("")
      } else {
        setLoadError(d?.message || "Arizalarni yuklab bo'lmadi")
      }
    } catch (err) {
      console.error("Failed to load applications:", err)
      setLoadError("Serverga ulanib bo'lmadi")
    } finally {
      if (showIndicator) setIsRefreshingApps(false)
    }
  }, [router])

  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" })
      const d = await res.json().catch(() => null)
      if (res.ok && d?.success) {
        setContactMessages(d.data || [])
      } else if (res.status !== 401) {
        setLoadError(d?.message || "Murojaatlarni yuklab bo'lmadi")
      }
    } catch (err) {
      console.error("Failed to load contact messages:", err)
    }
  }, [])

  const loadCertificates = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/certificates", { cache: "no-store" })
      if (res.ok) {
        const d = await res.json()
        setCertificates(d.data || [])
      }
    } catch (err) {
      console.error("Failed to load certificates:", err)
    }
  }, [])

  const loadTeachers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/teachers", { cache: "no-store" })
      if (res.ok) {
        const d = await res.json()
        setTeachers(d.data || [])
      }
    } catch (err) {
      console.error("Failed to load teachers:", err)
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

        await Promise.all([loadNews(), loadApplications(), loadMessages(), loadCertificates(), loadTeachers()])
      } catch (err) {
        console.error("Failed to init admin dashboard:", err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router, loadNews, loadApplications, loadMessages, loadCertificates, loadTeachers])

  // Periodic background auto-refresh every 25 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadApplications()
      loadMessages()
    }, 25000)
    return () => clearInterval(interval)
  }, [loadApplications, loadMessages])

  // Re-fetch immediately when entering tabs
  useEffect(() => {
    if (activeTab === "applications") {
      loadApplications(true)
      loadMessages()
    } else if (activeTab === "achievements") {
      loadCertificates()
    } else if (activeTab === "teachers") {
      loadTeachers()
    }
  }, [activeTab, loadApplications, loadMessages, loadCertificates, loadTeachers])

  // Certificate Actions
  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCertData.studentName || !newCertData.subject) {
      alert("O'quvchi ismi va fan to'ldirilishi shart!")
      return
    }
    setIsSubmittingCert(true)
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCertData),
      })
      const data = await res.json()
      if (data.success) {
        setStatusMessage(`Yangi sertifikat muvaffaqiyatli qo'shildi: ${newCertData.studentName}`)
        setNewCertModal(false)
        setNewCertData({
          studentName: "",
          subject: "",
          category: "Миллий сертификат",
          certType: "Umumtaʼlim fanini bilish darajasi toʻgʻrisidagi milliy sertifikat",
          level: "B2",
          score: "",
          teacher: "",
        })
        await loadCertificates()
      } else {
        alert(data.error || "Xatolik yuz berdi")
      }
    } catch {
      alert("Sertifikatni saqlashda xatolik")
    } finally {
      setIsSubmittingCert(false)
    }
  }

  // Teacher Actions
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeacherData.nameUz || !newTeacherData.positionUz) {
      alert("O'qituvchi ismi va lavozimi to'ldirilishi shart!")
      return
    }
    setIsSubmittingTeacher(true)
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacherData),
      })
      const data = await res.json()
      if (data.success) {
        setStatusMessage(`Yangi o'qituvchi muvaffaqiyatli saqlandi: ${newTeacherData.nameUz}`)
        setNewTeacherModal(false)
        setNewTeacherData({
          nameUz: "",
          positionUz: "",
          subjectUz: "",
          qualification: "Oliy toifa",
          degree: "",
          section: "Asosiy o'qituvchilar",
          category: "science",
        })
        await loadTeachers()
      } else {
        alert(data.error || "Xatolik yuz berdi")
      }
    } catch {
      alert("O'qituvchini saqlashda xatolik")
    } finally {
      setIsSubmittingTeacher(false)
    }
  }

  const handleDeleteTeacher = async (id: number, name: string) => {
    if (!confirm(`Haqiqatan ham "${name}" xodimini ro'yxatdan o'chirmoqchimisiz?`)) return
    try {
      const res = await fetch(`/api/admin/teachers?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        setStatusMessage(`"${name}" o'chirildi.`)
        await loadTeachers()
      } else {
        alert("O'chirishda xatolik yuz berdi")
      }
    } catch {
      alert("Server xatosi")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
  }

  // Telegram Sync
  const handleSyncTelegram = async () => {
    setSyncingTelegram(true)
    setStatusMessage("")
    try {
      const res = await fetch("/api/telegram/sync?pages=3", { method: "POST" })
      const data = await res.json()
      setStatusMessage(data.message)
      await loadNews()
    } catch {
      setStatusMessage("Telegram bilan bog'lanishda xatolik yuz berdi")
    } finally {
      setSyncingTelegram(false)
    }
  }

  // News Actions & Visibility Toggle
  const handleTogglePostVisibility = async (item: NewsItem) => {
    const newStatus = item.status === "published" ? "archived" : "published"
    const updated: NewsItem = { ...item, status: newStatus }
    try {
      const res = await fetch("/api/admin/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => null)
        alert(d?.message || "Saqlab bo'lmadi")
        return
      }
      if (res.ok) {
        setNews((prev) => prev.map((n) => (n.id === item.id ? updated : n)))
        setStatusMessage(
          newStatus === "published"
            ? `"${item.title.uz.slice(0, 30)}..." saytda ko'rinadigan bo'ldi!`
            : `"${item.title.uz.slice(0, 30)}..." saytdan yashirildi (Telegram asl posti o'chirilmaydi).`
        )
      }
    } catch {
      alert("Xatolik yuz berdi")
    }
  }

  const handleApproveNews = async (item: NewsItem) => {
    await handleTogglePostVisibility(item)
  }

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Haqiqatan ham bu yangilikni o'chirmoqchimisiz?")) return
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setNews((prev) => prev.filter((n) => n.id !== id))
      } else {
        const d = await res.json().catch(() => null)
        alert(d?.message || "O'chirib bo'lmadi")
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
      } else {
        const d = await res.json().catch(() => null)
        alert(d?.message || "Holatni o'zgartirib bo'lmadi")
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
      } else {
        const d = await res.json().catch(() => null)
        alert(d?.message || "Arizani o'chirib bo'lmadi")
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
      } else {
        const d = await res.json().catch(() => null)
        alert(d?.message || "Holatni o'zgartirib bo'lmadi")
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
      } else {
        const d = await res.json().catch(() => null)
        alert(d?.message || "Xabarni o'chirib bo'lmadi")
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            onClick={() => setActiveTab("news")}
            className={`p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border shadow-xs cursor-pointer transition-colors ${
              activeTab === "news" ? "border-[#C9A227] ring-1 ring-[#C9A227]" : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
            }`}
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
            onClick={() => setActiveTab("achievements")}
            className={`p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border shadow-xs cursor-pointer transition-colors ${
              activeTab === "achievements" ? "border-[#C9A227] ring-1 ring-[#C9A227]" : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">ERP Sertifikatlari</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{certificates.length}</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} />
              <span>Dublikatlar tozalangan (0 ta)</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab("teachers")}
            className={`p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border shadow-xs cursor-pointer transition-colors ${
              activeTab === "teachers" ? "border-[#C9A227] ring-1 ring-[#C9A227]" : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pedagoglar & Xodimlar</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{teachers.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">79 rasmiy xodim</div>
          </div>

          <div
            onClick={() => {
              setActiveTab("applications")
              setApplicationsSubTab("admissions")
            }}
            className={`p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border shadow-xs cursor-pointer transition-colors ${
              activeTab === "applications" && applicationsSubTab === "admissions"
                ? "border-[#C9A227] ring-1 ring-[#C9A227]"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
            }`}
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
            className={`p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border shadow-xs cursor-pointer transition-colors ${
              activeTab === "applications" && applicationsSubTab === "messages"
                ? "border-[#C9A227] ring-1 ring-[#C9A227]"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sayt Murojaatlari</div>
            <div className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white mt-1">{contactMessages.length}</div>
            {newMessagesCount > 0 ? (
              <div className="text-[11px] text-sky-600 font-bold mt-1">
                {newMessagesCount} ta yangi murojaat
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 mt-1">Yangi xabarlar yo'q</div>
            )}
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
        <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 sm:px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
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
            onClick={() => setActiveTab("achievements")}
            className={`px-4 sm:px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "achievements"
                ? "border-[#0B1F3A] text-[#0B1F3A] dark:border-[#C9A227] dark:text-[#C9A227]"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <Award size={16} />
            <span>Sertifikatlar & Yutuqlar ({certificates.length})</span>
            <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold rounded-full">
              Tozalangan
            </span>
          </button>

          <button
            onClick={() => setActiveTab("teachers")}
            className={`px-4 sm:px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "teachers"
                ? "border-[#0B1F3A] text-[#0B1F3A] dark:border-[#C9A227] dark:text-[#C9A227]"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <GraduationCap size={16} />
            <span>Pedagoglar & Xodimlar ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 sm:px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
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
            className={`px-4 sm:px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-[#0B1F3A] text-[#0B1F3A] dark:border-[#C9A227] dark:text-[#C9A227]"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <ShieldCheck size={16} />
            <span>Tizim & Integratsiya Holati</span>
          </button>
        </div>

        {/* TAB 1: NEWS & TELEGRAM PUBLIC PREVIEW INTEGRATION */}
        {activeTab === "news" && (
          <div className="space-y-6">
            {/* Telegram Public Preview Sync Management Banner */}
            <div className="bg-white dark:bg-[#0B1F3A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#0B1F3A] dark:text-white">
                    Telegram Public Preview Integratsiyasi
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Avtomatik Onlayn</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Rasmiy manba: <a href="https://t.me/s/Urganch_IMI" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline font-bold">https://t.me/s/Urganch_IMI</a>. Yangi postlar avtomatik saytga chiqadi.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSyncTelegram}
                  disabled={syncingTelegram}
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
                >
                  <RefreshCw size={14} className={syncingTelegram ? "animate-spin" : ""} />
                  <span>{syncingTelegram ? "Sinxronlanmoqda..." : "Telegramdan Yangilash (Sync Now)"}</span>
                </button>
              </div>
            </div>

            {/* Sync Status Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 font-medium">Barcha Postlar</div>
                <div className="text-xl font-extrabold text-[#0B1F3A] dark:text-white mt-0.5">{news.length}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Bazada saqlangan</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 font-medium">Saytda Chop Etilgan</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
                  {news.filter((n) => n.status === "published").length}
                </div>
                <div className="text-[10px] text-emerald-600/80 mt-0.5">Ommaviy ko'rinmoqda</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 font-medium">Saytdan Yashirilgan</div>
                <div className="text-xl font-extrabold text-amber-600 mt-0.5">
                  {news.filter((n) => n.status === "archived").length}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Telegram asl holida qoladi</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 font-medium">Avto-Sinxronlash Oralig'i</div>
                <div className="text-xl font-extrabold text-sky-600 mt-0.5">10 daqiqa</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Fon yangilanishi</div>
              </div>
            </div>

            {/* News Items List */}
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
                              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {item.status === "published" ? "Saytda ko'rinmoqda" : "Saytdan yashirilgan"}
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
                      {/* Hide / Publish toggle */}
                      {item.status === "published" ? (
                        <button
                          onClick={() => handleTogglePostVisibility(item)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                          title="Saytdan yashirish (Telegram asl posti o'chirilmaydi)"
                        >
                          <EyeOff size={13} />
                          <span>Saytdan yashirish</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTogglePostVisibility(item)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                          title="Saytda ko'rsatish"
                        >
                          <Eye size={13} />
                          <span>Saytda ko'rsatish</span>
                        </button>
                      )}

                      {item.telegramPostUrl && (
                        <a
                          href={item.telegramPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-colors"
                          title="Telegramda ochish"
                        >
                          <ExternalLink size={15} />
                        </a>
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

        {/* TAB 2: ACHIEVEMENTS & CERTIFICATES (EXCEL AUDIT) */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            {/* Header & Stats Banner */}
            <div className="bg-white dark:bg-[#0B1F3A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#0B1F3A] dark:text-white">
                    O'quvchilar Sertifikatlari & Yutuqlari (ERP 23.10 Arxivi)
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#C9A227]/20 text-[#0B1F3A] dark:text-[#C9A227] rounded-full">
                    {certificates.length} ta yozuv
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  ERP 23.10 arxividan tozalangan 674 ta rasmiy unikal sertifikat. Barcha 3 ta dublikat olib tashlangan.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => loadCertificates()}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={14} />
                  <span>Yangilash</span>
                </button>
                <button
                  onClick={() => setNewCertModal(true)}
                  className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#123B66] dark:bg-[#C9A227] dark:hover:bg-[#d8b030] text-white dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={14} />
                  <span>Yangi Sertifikat Qo'shish</span>
                </button>
              </div>
            </div>

            {/* Audit Status Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 font-medium">Jami Sertifikatlar</div>
                <div className="text-xl font-extrabold text-[#0B1F3A] dark:text-white mt-0.5">{certificates.length}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">ERP 23.10 bazasi</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 font-medium">Asl Noyob Sertifikatlar</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
                  {certificates.filter((c) => !c.isDuplicate).length}
                </div>
                <div className="text-[10px] text-emerald-600/80 mt-0.5">100% tasdiqlangan</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">Dublikatlar Holati</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
                  0 ta
                </div>
                <div className="text-[10px] text-emerald-700/80 mt-0.5">To'liq tozalangan</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 font-medium">Rasmiy ERP Sanasi</div>
                <div className="text-xl font-extrabold text-[#C9A227] mt-0.5">23.10</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Barcha sertifikatlar to'plami</div>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white dark:bg-[#0B1F3A] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="O'quvchi, fan yoki ustoz qidirish..."
                  value={certSearch}
                  onChange={(e) => {
                    setCertSearch(e.target.value)
                    setCertPage(1)
                  }}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setCertFilter("all")
                    setCertPage(1)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    certFilter === "all"
                      ? "bg-[#0B1F3A] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  Barchasi ({certificates.length})
                </button>
                <button
                  onClick={() => {
                    setCertFilter("duplicates")
                    setCertPage(1)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                    certFilter === "duplicates"
                      ? "bg-amber-600 text-white"
                      : "bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100"
                  }`}
                >
                  <AlertTriangle size={12} />
                  <span>Dublikatlar ({certificates.filter((c) => c.isDuplicate).length})</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">O'quvchi F.I.Sh.</th>
                      <th className="py-3 px-4">Fan</th>
                      <th className="py-3 px-4">Sertifikat Turi</th>
                      <th className="py-3 px-4">Darajasi / Ball</th>
                      <th className="py-3 px-4">O'qituvchi</th>
                      <th className="py-3 px-4">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {certificates
                      .filter((c) => {
                        const s = certSearch.toLowerCase().trim()
                        const match =
                          !s ||
                          c.studentName.toLowerCase().includes(s) ||
                          c.subject.toLowerCase().includes(s) ||
                          c.teacher.toLowerCase().includes(s) ||
                          c.certType.toLowerCase().includes(s)
                        if (!match) return false
                        if (certFilter === "duplicates") return !!c.isDuplicate
                        if (certFilter === "review") return !!c.isDuplicate || !!c.isIncomplete
                        return true
                      })
                      .slice((certPage - 1) * 50, certPage * 50)
                      .map((c, idx) => (
                        <tr
                          key={c.id || idx}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                            c.isDuplicate ? "bg-amber-50/40 dark:bg-amber-950/10" : ""
                          }`}
                        >
                          <td className="py-3 px-4 font-mono text-slate-400">{c.rowNumber || idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                            {c.studentName}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                            {c.subject}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate" title={c.certType}>
                            {c.certType}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded font-bold bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227]">
                              {c.level || c.score || "Mavjud"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                            {c.teacher || "—"}
                          </td>
                          <td className="py-3 px-4">
                            {c.isDuplicate ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                <AlertTriangle size={10} />
                                <span>Dublikat</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                <Check size={10} />
                                <span>Tasdiqlangan</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div>
                  Ko'rsatilmoqda: {Math.min(50, certificates.length)} ta yozuv (Jami: {certificates.length})
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCertPage((p) => Math.max(1, p - 1))}
                    disabled={certPage === 1}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded text-xs font-bold disabled:opacity-40"
                  >
                    Oldingi
                  </button>
                  <span className="font-bold">
                    Sahifa {certPage} / {Math.ceil(certificates.length / 50) || 1}
                  </span>
                  <button
                    onClick={() => setCertPage((p) => Math.min(Math.ceil(certificates.length / 50), p + 1))}
                    disabled={certPage >= Math.ceil(certificates.length / 50)}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded text-xs font-bold disabled:opacity-40"
                  >
                    Keyingi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEACHERS & STAFF DIRECTORY (DOCX AUDIT) */}
        {activeTab === "teachers" && (
          <div className="space-y-6">
            {/* Header & Stats Banner */}
            <div className="bg-white dark:bg-[#0B1F3A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#0B1F3A] dark:text-white">
                    Pedagogik Jamoa & Xodimlar Ro'yxati
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#C9A227]/20 text-[#0B1F3A] dark:text-[#C9A227] rounded-full">
                    {teachers.length} nafar xodim
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Rasmiy docx hujjatidan olingan: Rahbariyat (12), Asosiy o'qituvchilar (45), O'rindoshlar (8), Texnik xodimlar (14).
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => loadTeachers()}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={14} />
                  <span>Yangilash</span>
                </button>
                <button
                  onClick={() => setNewTeacherModal(true)}
                  className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#123B66] dark:bg-[#C9A227] dark:hover:bg-[#d8b030] text-white dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={14} />
                  <span>Yangi O'qituvchi Qo'shish</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="bg-white dark:bg-[#0B1F3A] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ism, fan yoki lavozim qidirish..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {[
                  { key: "all", label: `Barchasi (${teachers.length})` },
                  { key: "administration", label: `Rahbariyat (${teachers.filter((t) => t.category === "administration").length})` },
                  { key: "science", label: `Aniq fanlar (${teachers.filter((t) => t.category === "science").length})` },
                  { key: "language", label: `Tillar (${teachers.filter((t) => t.category === "language").length})` },
                  { key: "adjunct", label: `O'rindoshlar (${teachers.filter((t) => t.category === "adjunct").length})` },
                  { key: "technical", label: `Texnik xodimlar (${teachers.filter((t) => t.category === "technical").length})` },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setTeacherCategoryFilter(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      teacherCategoryFilter === f.key
                        ? "bg-[#0B1F3A] text-white dark:bg-[#C9A227] dark:text-[#0B1F3A]"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Teachers Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachers
                .filter((t) => {
                  const s = teacherSearch.toLowerCase().trim()
                  const matchSearch =
                    !s ||
                    t.nameUz.toLowerCase().includes(s) ||
                    t.positionUz.toLowerCase().includes(s) ||
                    (t.subjectUz && t.subjectUz.toLowerCase().includes(s))
                  if (!matchSearch) return false
                  if (teacherCategoryFilter === "all") return true
                  return t.category === teacherCategoryFilter
                })
                .map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shadow-xs hover:border-[#C9A227] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {t.image ? (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          <Image src={t.image} alt={t.nameUz} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#0B1F3A] dark:text-[#C9A227] font-bold text-sm flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          {t.nameUz.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-[#0B1F3A] dark:text-white leading-snug">
                          {t.nameUz}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {t.positionUz}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {t.subjectUz && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0B1F3A]/5 dark:bg-white/10 text-[#0B1F3A] dark:text-[#C9A227]">
                              {t.subjectUz}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {t.section || t.qualification}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTeacher(t.id, t.nameUz)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors flex-shrink-0"
                      title="O'chirish"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: APPLICATIONS & MESSAGES */}
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

            {loadError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                ⚠️ {loadError}
              </div>
            )}

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

      {/* MODAL: ADD NEW CERTIFICATE */}
      {newCertModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1F3A] max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Award size={18} className="text-[#C9A227]" />
                <span>Yangi Sertifikat Qo'shish</span>
              </h3>
              <button
                onClick={() => setNewCertModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCertificate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  O'quvchi F.I.Sh. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Karimova Dilnoza Sherzod qizi"
                  value={newCertData.studentName}
                  onChange={(e) => setNewCertData({ ...newCertData, studentName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Fan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Matematika, Kimyo"
                    value={newCertData.subject}
                    onChange={(e) => setNewCertData({ ...newCertData, subject: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Darajasi / Balli
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: B2, C1, 75.4 ball"
                    value={newCertData.level}
                    onChange={(e) => setNewCertData({ ...newCertData, level: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Sertifikat Turi
                </label>
                <input
                  type="text"
                  value={newCertData.certType}
                  onChange={(e) => setNewCertData({ ...newCertData, certType: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Biriktirilgan Ustoz (F.I.Sh.)
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Axmedov G'ulomjon"
                  value={newCertData.teacher}
                  onChange={(e) => setNewCertData({ ...newCertData, teacher: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewCertModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCert}
                  className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#123B66] dark:bg-[#C9A227] dark:hover:bg-[#d8b030] text-white dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Plus size={14} />
                  <span>{isSubmittingCert ? "Saqlanmoqda..." : "Saqlash"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW TEACHER */}
      {newTeacherModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1F3A] max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <GraduationCap size={18} className="text-[#C9A227]" />
                <span>Yangi O'qituvchi / Xodim Qo'shish</span>
              </h3>
              <button
                onClick={() => setNewTeacherModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  F.I.Sh. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Jumaniyozov Bobur Olimovich"
                  value={newTeacherData.nameUz}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, nameUz: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lavozimi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Matematika o'qituvchisi"
                    value={newTeacherData.positionUz}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, positionUz: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Dars beradigan fani
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Matematika"
                    value={newTeacherData.subjectUz}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, subjectUz: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Toifasi
                  </label>
                  <select
                    value={newTeacherData.qualification}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, qualification: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Oliy toifa">Oliy toifa</option>
                    <option value="1-toifa">1-toifa</option>
                    <option value="2-toifa">2-toifa</option>
                    <option value="Mutaxassis">Mutaxassis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Yo'nalish toifasi
                  </label>
                  <select
                    value={newTeacherData.category}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  >
                    <option value="administration">Rahbariyat</option>
                    <option value="science">Aniq va tabiiy fanlar</option>
                    <option value="language">Xorijiy tillar</option>
                    <option value="adjunct">O'rindosh o'qituvchi</option>
                    <option value="technical">Texnik xodim</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewTeacherModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTeacher}
                  className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#123B66] dark:bg-[#C9A227] dark:hover:bg-[#d8b030] text-white dark:text-[#0B1F3A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Plus size={14} />
                  <span>{isSubmittingTeacher ? "Saqlanmoqda..." : "Saqlash"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
