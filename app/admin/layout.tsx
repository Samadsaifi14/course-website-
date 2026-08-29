import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/AdminNav";
import { isAdmin } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = await isAdmin(user.id);
  if (!admin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminNav />
      <div className="flex-1 px-4 py-8 sm:px-8">{children}</div>
    </div>
  );
}
