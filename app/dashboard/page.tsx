import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions";
import type { StudyMaterial } from "@/lib/types";

export const metadata: Metadata = { title: "My Study Library" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: purchases } = await supabase.from("purchases").select("item_id, created_at").eq("user_id", user.id).eq("item_type", "material").eq("status", "paid").order("created_at", { ascending: false });
  const ids = Array.from(new Set((purchases ?? []).map((item) => item.item_id)));
  let materials: StudyMaterial[] = [];
  if (ids.length > 0) {
    const { data } = await supabase.from("study_material").select("*").in("id", ids);
    materials = (data as StudyMaterial[] | null) ?? [];
  }

  return (
    <section className="bg-[#f7f3ea] py-12 sm:py-16">
      <Container>
        <div className="flex flex-col justify-between gap-5 border-b border-stone-300 pb-8 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6b42]">Student Account</p><h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d]">My Study Library</h1><p className="mt-2 text-sm text-stone-600">{user.email}</p></div>
          <form action={signOut}><button className="rounded-full border border-[#17352d]/25 px-5 py-2.5 text-sm font-semibold text-[#17352d] hover:border-[#17352d]">Log Out</button></form>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-semibold text-[#17352d]">Purchased PDFs</h2><p className="mt-1 text-sm text-stone-600">Open your paid study material whenever you need it.</p></div><Link href="/study-material" className="text-sm font-semibold text-[#17352d] hover:underline">Browse more study material →</Link></div>

        {materials.length > 0 ? (
          <div className="mt-7 grid gap-px bg-stone-300 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <Link key={material.id} href={`/material-access/${material.id}`} className="group bg-white p-7 hover:bg-[#edf4f0]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8b6b42]">Purchased PDF</p>
                <h3 className="mt-8 text-xl font-semibold text-[#17352d] group-hover:underline">{material.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{[material.subject, material.class, material.year].filter(Boolean).join(" · ")}</p>
                <p className="mt-7 text-sm font-semibold text-[#17352d]">Open PDF access →</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-7 border border-stone-300 bg-white p-10 text-center"><h3 className="font-serif text-3xl font-semibold text-[#17352d]">Your library is ready for your first PDF.</h3><p className="mt-3 text-sm text-stone-600">Paid PDFs will appear here immediately after payment is verified.</p><Link href="/study-material" className="mt-6 inline-flex rounded-full bg-[#17352d] px-6 py-3 text-sm font-semibold text-white">Browse Study Material</Link></div>
        )}
      </Container>
    </section>
  );
}
