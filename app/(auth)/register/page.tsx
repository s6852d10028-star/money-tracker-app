"use client";

import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ต้อง Import Link
import { Loader2, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react"; // รวม Import Icons

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) alert(error.message);
    else {
      alert("ตรวจสอบอีเมลเพื่อยืนยันการสมัครสมาชิก");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 p-6">
      {/* เพิ่ม relative ที่นี่เพื่อให้ปุ่มย้อนกลับอ้างอิงตำแหน่งได้ */}
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl">
        
        {/* ปุ่มย้อนกลับ */}
        <Link 
          href="/" 
          className="absolute -left-16 top-0 p-3 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-all border border-slate-200 hidden md:block"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </Link>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-purple-100 p-3 rounded-2xl mb-4">
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">สร้างบัญชีผู้ใช้</h1>
          <p className="text-slate-500 mt-2">เริ่มต้นบันทึกการเงินของคุณได้ทันที</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="email" 
              placeholder="อีเมลของคุณ" 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="password" 
              placeholder="รหัสผ่าน" 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            disabled={loading} 
            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-all active:scale-95 flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "ลงทะเบียนเข้าใช้งาน"}
          </button>
        </form>
      </div>
    </div>
  );
}