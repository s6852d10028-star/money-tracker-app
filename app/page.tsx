import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFD] font-sans">
      {/* Hero Section - เพิ่ม Gradient พื้นหลังจางๆ */}
      <section className="relative flex flex-col items-center justify-center pt-24 pb-20 px-6 text-center">
        <div className="absolute inset-0 bg-linear-to-b from-purple-50 to-transparent -z-10" />
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          จัดการการเงินของคุณ <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-500 to-blue-500">
            ง่าย สวย และปลอดภัย
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          Money Tracker ช่วยให้คุณบันทึกรายรับ-รายจ่ายได้แบบ Real-time 
          พร้อมกราฟสรุปยอดและจัดเก็บข้อมูลการเงินของคุณไว้ในที่เดียวอย่างสวยงาม
        </p>

        <div className="flex gap-4">
          <Link href="/register" className="px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-200 transition-all transform hover:-translate-y-1">
            เริ่มต้นใช้งานฟรี
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-semibold hover:border-purple-200 transition-all">
            เข้าสู่ระบบ
          </Link>
        </div>
      </section>

      {/* Features Section - ปรับ Cards ให้ดูละมุนตา */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          { icon: Zap, title: "ใช้งานรวดเร็ว", desc: "บันทึกข้อมูลได้ทันทีผ่าน Browser ไม่ต้องติดตั้งโปรแกรมให้วุ่นวาย", color: "text-blue-500" },
          { icon: ShieldCheck, title: "ปลอดภัยสูงสุด", desc: "ข้อมูลของคุณถูกจัดเก็บด้วย Supabase มาตรฐานความปลอดภัยระดับโลก", color: "text-purple-500" },
          { icon: CheckCircle2, title: "ติดตามรายจ่าย", desc: "รู้ทันทุกยอดการใช้จ่ายด้วยระบบหมวดหมู่ที่จัดการได้ง่ายๆ", color: "text-pink-500" }
        ].map((feat, i) => (
          <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-50 transition-all duration-300">
            <feat.icon className={`w-12 h-12 ${feat.color} mb-6`} />
            <h3 className="text-xl font-bold text-slate-800 mb-3">{feat.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}