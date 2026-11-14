import { createClient } from "@supabase/supabase-js"

// Faqat serverda ishlatiladi (API route'lar). Service role kaliti brauzerga chiqmaydi.
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && supabaseUrl.startsWith("http"))

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null
