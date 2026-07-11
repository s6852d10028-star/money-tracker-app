"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Interface สำหรับ Transaction เพื่อหลีกเลี่ยงการใช้ 'any'
interface TransactionInput {
  title: string;
  amount: number;
  type: "income" | "expense";
  imageFile?: File | null;
}

export async function addTransaction(data: TransactionInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  let imageUrl = null;

  // จัดการอัปโหลดไฟล์ (Storage)
  if (data.imageFile && data.imageFile.size > 0) {
    const fileExt = data.imageFile.name.split(".").pop();
    const fileName = `${user.id}/${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(fileName, data.imageFile);

    if (uploadError) throw new Error("Upload failed: " + uploadError.message);
    imageUrl = fileName;
  }

  // บันทึกข้อมูลลง Database
  const { error: dbError } = await supabase.from("transactions").insert({
    user_id: user.id,
    title: data.title,
    amount: data.amount,
    type: data.type,
    image_url: imageUrl,
  });

  if (dbError) throw new Error("Database error: " + dbError.message);

  revalidatePath("/dashboard");
  return { success: true };
}