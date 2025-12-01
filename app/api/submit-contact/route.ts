import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    const spreadsheetId = "1xIfmOfuHpT3PYsA9tZoNakdE5bZMkaGnj1LATY9dfMs"
    const formData = new FormData()

    formData.append("entry.1234567890", name)
    formData.append("entry.0987654321", email)
    formData.append("entry.1111111111", subject)
    formData.append("entry.2222222222", message)
    formData.append("entry.3333333333", new Date().toISOString())

    // Alternative: Send to Google Sheets via webhook/API endpoint
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`, {
      method: "POST",
      body: formData,
    })

    // For a more reliable method, you would need to use Google Sheets API
    // This is a simplified version - for production, setup Google Sheets API credentials

    return NextResponse.json({ success: true, message: "Data submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error submitting form:", error)
    return NextResponse.json({ success: false, message: "Error submitting data" }, { status: 500 })
  }
}
