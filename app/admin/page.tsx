"use client"

import { useEffect, useState } from "react"
import { Eye, LogOut, Trash2, RefreshCw, Lock } from "lucide-react"

type Application = { id: string; name: string; email: string; phone: string; info: string; status: string; created_at: string }
const labels: Record<string, string> = { new: "Yangi", reviewed: "Ko'rib chiqildi", accepted: "Qabul qilindi", rejected: "Rad etildi" }

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [apps, setApps] = useState<Application[]>([])
  const [selected, setSelected] = useState<Application | null>(null)
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    const r = await fetch("/api/applications", { cache: "no-store" })
    if (r.status === 401) { setLoggedIn(false); setLoading(false); return }
    const d = await r.json(); setApps(d.applications || []); setLoggedIn(true); setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) })
    if (r.ok) { setPassword(""); await load() } else alert("Parol noto'g'ri")
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); setLoggedIn(false); setApps([]) }
  async function update(id: string, status: string) { await fetch("/api/applications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); load() }
  async function remove(id: string) { if (!confirm("Bu arizani o'chirasizmi?")) return; await fetch(`/api/applications?id=${id}`, { method: "DELETE" }); setSelected(null); load() }

  if (loggedIn === null) return <main className="min-h-screen grid place-items-center">Yuklanmoqda...</main>
  if (!loggedIn) return <main className="min-h-screen bg-muted/40 grid place-items-center p-4"><form onSubmit={login} className="w-full max-w-sm bg-card border rounded-2xl p-8 space-y-5 shadow-sm"><div className="text-center"><Lock className="mx-auto mb-3"/><h1 className="text-2xl font-bold">Admin panel</h1><p className="text-muted-foreground mt-1">Arizalarni ko'rish uchun parolni kiriting</p></div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin paroli" required className="w-full px-4 py-3 rounded-lg border bg-background"/><button className="w-full px-4 py-3 rounded-lg bg-accent text-accent-foreground font-semibold">Kirish</button></form></main>

  return <main className="min-h-screen bg-muted/40 p-4 md:p-8"><div className="max-w-6xl mx-auto space-y-6"><header className="flex items-center justify-between"><div><h1 className="text-3xl font-bold">Arizalar</h1><p className="text-muted-foreground">Jami: {apps.length} ta</p></div><div className="flex gap-2"><button onClick={load} className="px-4 py-2 border rounded-lg bg-background"><RefreshCw size={18}/></button><button onClick={logout} className="px-4 py-2 border rounded-lg bg-background flex gap-2 items-center"><LogOut size={18}/> Chiqish</button></div></header><div className="bg-card border rounded-2xl overflow-x-auto"><table className="w-full text-sm"><thead className="bg-muted"><tr><th className="text-left p-4">Ism</th><th className="text-left p-4">Telefon</th><th className="text-left p-4">Email</th><th className="text-left p-4">Holat</th><th className="text-left p-4">Sana</th><th className="p-4">Amal</th></tr></thead><tbody>{apps.map(a => <tr key={a.id} className="border-t"><td className="p-4 font-medium">{a.name}</td><td className="p-4">{a.phone}</td><td className="p-4">{a.email}</td><td className="p-4"><select value={a.status} onChange={e => update(a.id, e.target.value)} className="border rounded px-2 py-1 bg-background">{Object.entries(labels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}</select></td><td className="p-4">{new Date(a.created_at).toLocaleString("uz-UZ")}</td><td className="p-4 flex gap-2 justify-center"><button onClick={() => setSelected(a)} className="p-2 border rounded"><Eye size={18}/></button><button onClick={() => remove(a.id)} className="p-2 border rounded"><Trash2 size={18}/></button></td></tr>)}</tbody></table>{!loading && apps.length === 0 && <p className="p-10 text-center text-muted-foreground">Hozircha arizalar yo'q.</p>}</div></div>{selected && <div className="fixed inset-0 bg-black/50 grid place-items-center p-4" onClick={() => setSelected(null)}><div className="bg-card max-w-lg w-full rounded-2xl p-6 space-y-4" onClick={e => e.stopPropagation()}><div className="flex justify-between"><h2 className="text-xl font-bold">Ariza tafsilotlari</h2><button onClick={() => setSelected(null)}>✕</button></div><div><b>Ism:</b> {selected.name}</div><div><b>Email:</b> {selected.email}</div><div><b>Telefon:</b> {selected.phone}</div><div><b>Qo'shimcha ma'lumot:</b><p className="mt-1 whitespace-pre-wrap">{selected.info || "—"}</p></div></div></div>}</main>
}
