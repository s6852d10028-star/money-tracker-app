"use client";
import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { PlusCircle, X, Loader2 } from "lucide-react";

export default function AddTransactionModal({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    await supabase.from("transactions").insert({
      title: formData.get("title"),
      amount: formData.get("amount"),
      type: formData.get("type"),
      user_id: userId,
    });

    setLoading(false);
    setIsOpen(false);
    router.refresh(); // อัปเดตหน้าจอ Dashboard อัตโนมัติ
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-800 transition"
      >
        <PlusCircle size={18} /> เพิ่มรายการใหม่
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl w-full max-w-sm space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">เพิ่มรายการใหม่</h2>
              <button type="button" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <input
              name="title"
              placeholder="ชื่อรายการ"
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              name="amount"
              type="number"
              placeholder="จำนวนเงิน"
              className="w-full p-3 border rounded-xl"
              required
            />
            <select name="type" className="w-full p-3 border rounded-xl">
              <option value="income">รายรับ</option>
              <option value="expense">รายจ่าย</option>
            </select>
            <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "บันทึกข้อมูล"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
