import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { LogOut, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import AddTransactionModal from "@/components/AddTransactionModal";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  const totalIncome = transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
  const totalExpense = transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-widest">ภาพรวมของคุณ</h2>
            <h1 className="text-4xl font-extrabold text-slate-800 mt-1">ยินดีต้อนรับกลับมา</h1>
          </div>
          <form action="/api/auth/signout" method="post">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-purple-100 transition text-slate-600 hover:text-purple-600">
              <LogOut size={16} /> ออกจากระบบ
            </button>
          </form>
        </header>

        {/* Hero Cards - ใช้ธีมชมพู-ฟ้า-ม่วง */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-2 bg-linear-to-r from-pink-300 via-purple-400 to-blue-400 p-8 rounded-3xl text-white shadow-xl shadow-purple-200">
            <div className="flex items-center gap-2 opacity-90 mb-4"><Wallet size={20}/> ยอดเงินคงเหลือ</div>
            <div className="text-5xl font-bold mb-2">{balance.toLocaleString()} <span className="text-2xl opacity-70">บาท</span></div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-purple-50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 text-indigo-500 mb-2"><ArrowUpRight size={24}/> รายรับ</div>
            <div className="text-2xl font-bold text-slate-800">+{totalIncome.toLocaleString()}</div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-purple-50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 text-pink-500 mb-2"><ArrowDownLeft size={24}/> รายจ่าย</div>
            <div className="text-2xl font-bold text-slate-800">-{totalExpense.toLocaleString()}</div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white p-2 rounded-3xl shadow-sm border border-purple-50">
          <div className="flex justify-between items-center p-6">
            <h3 className="text-xl font-bold text-slate-800">รายการ รายรับ-รายจ่าย</h3>
            <AddTransactionModal userId={session.user.id} />
          </div>
          <div className="px-2">
            <table className="w-full">
              <tbody className="divide-y divide-slate-50">
                {transactions?.map((tx) => (
                  <tr key={tx.id} className="group hover:bg-purple-50/50 transition rounded-xl">
                    <td className="px-6 py-5 flex items-center gap-4">
                      {/* ไอคอนปรับตามธีม */}
                      <div className={`p-3 rounded-2xl ${tx.type === 'income' ? 'bg-purple-100 text-purple-600' : 'bg-pink-100 text-pink-600'}`}>
                        {tx.type === 'income' ? <TrendingUp size={20}/> : <TrendingDown size={20}/>}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{tx.title}</div>
                        <div className="text-xs text-slate-400">{new Date(tx.created_at).toLocaleDateString('th-TH')}</div>
                      </div>
                    </td>
                    <td className={`px-6 py-5 text-right font-bold ${tx.type === 'income' ? 'text-purple-600' : 'text-slate-800'}`}>
                      {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()} บาท
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}