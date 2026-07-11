import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // ถ้าระบบหา next ไม่เจอ ให้เด้งไปที่ /dashboard โดยตรง
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // ส่งกลับไปที่ origin (คือ URL ของ Vercel) + path (dashboard)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // หากมีปัญหา ให้กลับไปหน้า login
  return NextResponse.redirect(`${origin}/login`);
}