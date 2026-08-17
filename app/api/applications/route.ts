import { type NextRequest, NextResponse } from "next/server"

// Web3Forms endpoint: accepts a JSON POST and emails the submission to the
// address tied to the access key. Free tier: 250 submissions/month, no
// account/dashboard setup beyond generating the access key at web3forms.com.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

export async function POST(request: NextRequest) {
  let data: Record<string, unknown>

  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: "Noto'g'ri so'rov formati" }, { status: 400 })
  }

  const { name, email, phone, info } = data as {
    name?: string
    email?: string
    phone?: string
    info?: string
  }

  if (!name || !email || !phone) {
    return NextResponse.json(
      { success: false, message: "Majburiy maydonlar to'ldirilmagan" },
      { status: 400 },
    )
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    // Never leak *why* to the client — just log server-side for the admin.
    console.error("[applications] WEB3FORMS_ACCESS_KEY environment variable sozlanmagan")
    return NextResponse.json(
      { success: false, message: "Ariza yuborishda xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring." },
      { status: 500 },
    )
  }

  try {
    const web3formsResponse = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "🔔 Yangi ariza — Admissions",
        from_name: "Maktab sayti — Arizalar",
        name,
        email,
        phone,
        info: info || "—",
        // Forward any extra fields the form might send in the future.
        ...Object.fromEntries(Object.entries(data).filter(([key]) => !["name", "email", "phone", "info"].includes(key))),
      }),
    })

    const result = await web3formsResponse.json().catch(() => null)

    if (!web3formsResponse.ok || !result?.success) {
      console.error("[applications] Web3Forms API xatoligi:", web3formsResponse.status, result)
      return NextResponse.json(
        { success: false, message: "Ariza yuborishda xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring." },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true, message: "Arizangiz muvaffaqiyatli yuborildi." })
  } catch (error) {
    console.error("[applications] Web3Forms'ga ulanishda kutilmagan xatolik:", error)
    return NextResponse.json(
      { success: false, message: "Ariza yuborishda xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring." },
      { status: 500 },
    )
  }
}
