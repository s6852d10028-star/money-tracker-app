"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogIn, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert("ไม่สามารถเข้าสู่ระบบด้วย Google ได้: " + error.message);
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับ Login ด้วย Email/Password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      alert("ไม่สามารถเข้าสู่ระบบได้: " + error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 p-6">
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl">
        
        {/* ปุ่มย้อนกลับ */}
        <Link 
          href="/" 
          className="absolute -left-16 top-0 p-3 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-all border border-slate-200 hidden md:block"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </Link>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-2xl mb-4">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">เข้าสู่ระบบ</h1>
          <p className="text-slate-500 mt-2">ยินดีต้อนรับกลับมาใช้งาน</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="email" 
              placeholder="อีเมล" 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="password" 
              placeholder="รหัสผ่าน" 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading} 
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all active:scale-95 flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "เข้าสู่ระบบ"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-slate-500">หรือ</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="w-full bg-white text-slate-700 py-3.5 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 transition flex justify-center items-center gap-2"
          >
            {/* ตรวจสอบให้แน่ใจว่า Component GoogleIcon ถูกนิยามไว้ถูกต้อง */}
            {/* <GoogleIcon /> */}
            เข้าสู่ระบบด้วย Google
          </button>
        </form>
      </div>
    </div>
  );
}