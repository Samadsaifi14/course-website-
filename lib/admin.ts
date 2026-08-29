import { createClient } from "@/lib/supabase/server";

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();
    return data?.role === "admin";
  } catch {
    return false;
  }
}
